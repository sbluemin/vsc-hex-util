// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(searchCommandDisposable);
    context.subscriptions.push(hoverDisposable);
}

function hex2ascii(hex: string) {
    return Buffer.from(hex, 'hex').toString();
}

function ascii2hex(str: string)
 {
    return Buffer.from(str).toString('hex');
 }

function changeEndianness(hex: string) {
    const result = [];
    let len = hex.length - 2;
    while (len >= 0) {
        result.push(hex.substr(len, 2));
        len -= 2;
    }
    return result.join('');
}

let searchCommandDisposable = vscode.commands.registerCommand('extension.search-ascii', async () => {
    const searchAscii = await vscode.window.showInputBox({
        placeHolder: "Enter the ascii string",
        prompt: "Search Ascii"
    });

    if (searchAscii === '') {
        vscode.window.showErrorMessage('A search ascii is mandatory to execute this action');
    }

    if (searchAscii !== undefined) {
        const toHex = ascii2hex(searchAscii);

        vscode.commands.executeCommand('workbench.action.findInFiles', {
            query: toHex
        });

        vscode.commands.executeCommand('search.action.openNewEditorToSide', {
            query: changeEndianness(toHex)
        });
    }
});

let hoverDisposable = vscode.languages.registerHoverProvider({ scheme: 'file' }, {
    provideHover: async (document, position, token) => {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        if (editor.selection.isEmpty === true) {
            return;
        }

        let selectionText = document.getText(editor.selection);
        let content = new vscode.MarkdownString();
        content.appendMarkdown(`**Plain ASCII**: ${hex2ascii(selectionText)}`);
        content.appendText('\n');
        content.appendMarkdown(`**TransEndian ASCII**: ${hex2ascii(changeEndianness(selectionText))}`);

        return {
            contents: [content]
        };
   } 
});