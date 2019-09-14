import * as vscode from 'vscode';
import SpecBuddy from './spec_buddy/spec_buddy';
import { appendFile } from 'fs';

export function activate(context: vscode.ExtensionContext) {
	const app = new SpecBuddy();

	const openSpec = vscode.commands.registerCommand('specBuddy.openSpec', () => {
		app.openSpec();
	});
}

// this method is called when your extension is deactivated
export function deactivate() {}
