import * as vscode from 'vscode';

export default class FileUtil {
  public file_is_spec(file: vscode.TextDocument) {
    const directories = file.uri.path.split("/");
    const found = ["spec", "specs", "test", "tests"].some(string => directories.includes(string));
    return found;
  }

  public get_most_likely_spec_file(original_document: String, files: Array<vscode.Uri>): vscode.Uri {
    return this.find_shortest_filename_match(original_document, files);
  }

  private find_shortest_filename_match(original: String, files: Array<vscode.Uri>): vscode.Uri {
    const spec_file_names = files.map(file => file.path.split("/")[file.path.split("/").length - 1]).map(string => string.replace(original.split("/")[original.split("/").length - 1], ""));
    const shortest_result = spec_file_names.reduce((a, b) => a.length <= b.length ? a : b);
    return files[spec_file_names.indexOf(shortest_result)];
  }
}