import * as vscode from 'vscode';
import SpecBuddy from './spec_buddy/spec_buddy';
import FileUtil from './lib/file_util';
import { appendFile } from 'fs';

export function activate(context: vscode.ExtensionContext) {
	const app = new SpecBuddy(new FileUtil);

	const openSpec = vscode.commands.registerCommand('specBuddy.openSpec', () => {
		app.openSpec();
	});
}

// this method is called when your extension is deactivated
export function deactivate() {}
