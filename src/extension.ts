// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	vscode.workspace.onDidOpenTextDocument((document) => {
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
	});

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "spec-buddy" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
