import * as vscode from 'vscode';
import path = require('path');
import FileUtil from '../lib/file_util';

export default class SpecBuddy {
  fileUtil: FileUtil;

  public constructor(fileUtil: FileUtil) {
    this.fileUtil = fileUtil;
  }

  public openSpec() {
    const workspace = vscode.window.activeTextEditor;
    if (workspace === undefined) {
      return;
    }

    this.openSpecFile(workspace.document);
  }

  private openSpecFile(document: vscode.TextDocument) {
    if (this.fileUtil.file_is_spec(document)) { return; }

    const file_name = path.basename(document.fileName, path.extname(document.fileName));
    vscode.workspace.findFiles(`{spec,specs,test,tests}/**/*${file_name}*`).then(result => {
      const file_to_open: vscode.Uri = this.fileUtil.get_most_likely_spec_file(file_name, result);
      vscode.workspace.openTextDocument(vscode.Uri.file(file_to_open.path)).then(doc => {
        vscode.window.showTextDocument(doc, vscode.ViewColumn.Beside, true);
      });
    });
  }
}
