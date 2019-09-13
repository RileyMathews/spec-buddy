import * as vscode from 'vscode';
import SpecBuddy from './spec_buddy/spec_buddy';

export function activate(context: vscode.ExtensionContext) {
	const _app = new SpecBuddy(context);
}

// this method is called when your extension is deactivated
export function deactivate() {}
