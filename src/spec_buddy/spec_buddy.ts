import * as vscode from 'vscode';

export default class SpecBuddy {
  public constructor(context: vscode.ExtensionContext) {
    this.register_commands(context);
    this.add_listener();
  }

  private add_listener() {
    vscode.workspace.onDidOpenTextDocument(this.file_open_callback);
  }

  private file_open_callback(document: vscode.TextDocument) {
    if (vscode.workspace.getConfiguration('specBuddy').get('active') === false) {
      return;
    }

    const document_path = document.fileName;
    if (document_path.substring(document_path.length - 3) !== ".rb" || document_path.includes("spec")) {
      return;
    }

    const root = vscode.workspace.workspaceFolders || [];
    const root_path = root[0].uri.path;
    const root_relative_path = document_path.replace(root_path, "");
    const spec_file_path = `${root_path}/spec${root_relative_path.replace('.rb', '_spec.rb')}`;
    vscode.workspace.openTextDocument(vscode.Uri.file(spec_file_path)).then(doc => {
      vscode.window.showTextDocument(doc, vscode.ViewColumn.Beside, true);
    });
  }

  private register_commands(context: vscode.ExtensionContext) {
    const turnOn = vscode.commands.registerCommand('specBuddy.on', () => {
      const config = vscode.workspace.getConfiguration('specBuddy');
      config.update('active', true, true);
    });
  
    const turnOff = vscode.commands.registerCommand('specBuddy.off', () => {
      const config = vscode.workspace.getConfiguration('specBuddy');
      config.update('active', false, true);
    });
  
    context.subscriptions.push(turnOn);
    context.subscriptions.push(turnOff);
  }
}