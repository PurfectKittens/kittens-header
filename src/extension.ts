import * as vscode from 'vscode';
import { generateComment } from './commentUtils';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('kittens-header.initKitten', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const username = await vscode.window.showInputBox({ prompt: 'Entre ton nom ' });
    if (!username) {
      return;
    }

    const document = editor.document;
    const language = document.languageId;

    let commentLine: string;
    try {
      commentLine = generateComment(username, language);
    } catch (error) {
      vscode.window.showErrorMessage((error as Error).message);
      return;
    }

    const selection = editor.selection;
    const position = selection.active;

    editor.edit(editBuilder => {
      editBuilder.insert(position, commentLine);
    });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}