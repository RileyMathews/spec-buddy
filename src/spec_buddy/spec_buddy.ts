import * as vscode from 'vscode';

export default class SpecBuddy {
  public openSpec() {
    const workspace = vscode.window.activeTextEditor;
    if (workspace === undefined) {
      return;
    }

    this.openSpecFile(workspace.document);
  }

  private openSpecFile(document: vscode.TextDocument) {
    const document_path = document.fileName;
    const root = vscode.workspace.workspaceFolders || [];
    const root_path = root[0].uri.path;
    const root_relative_path = document_path.replace(root_path, "");
    const spec_file_path = `${root_path}/spec${root_relative_path.replace('.rb', '_spec.rb')}`;
    vscode.workspace.openTextDocument(vscode.Uri.file(spec_file_path)).then(doc => {
      vscode.window.showTextDocument(doc, vscode.ViewColumn.Beside, true);
    });
  }
}
