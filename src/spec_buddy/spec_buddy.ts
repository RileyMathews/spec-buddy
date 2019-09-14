import * as vscode from 'vscode';
import path = require('path');

export default class SpecBuddy {
  public openSpec() {
    const workspace = vscode.window.activeTextEditor;
    if (workspace === undefined) {
      return;
    }

    this.openSpecFile(workspace.document);
  }

  private openSpecFile(document: vscode.TextDocument) {
    const file_name = path.basename(document.fileName, path.extname(document.fileName));
    vscode.workspace.findFiles(`{spec,specs,test,tests}/**/*${file_name}*`).then(result => {
      vscode.workspace.openTextDocument(vscode.Uri.file(result[0].path)).then(doc => {
        vscode.window.showTextDocument(doc, vscode.ViewColumn.Beside, true);
      });
    });
  }
}
