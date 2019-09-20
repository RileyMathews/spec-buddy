import * as vscode from 'vscode';

export default class FileUtil {
  public file_is_spec(file: vscode.TextDocument) {
    const directories = file.uri.path.split("/");
    const found = ["spec", "specs", "test", "tests"].some(string => directories.includes(string));
    return found;
  }
}