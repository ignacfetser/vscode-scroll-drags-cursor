// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

  let command = vscode.commands.registerCommand('scroll-drags-cursor.scrollScreenUp', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const currentPosition = editor.selection.active;
      let visibleRange = editor.visibleRanges[0];
      //console.log("0 - UP: " + currentPosition.line + ' => ' + visibleRange.start.line + " - " + visibleRange.end.line);
      const newPositionTop = new vscode.Position(visibleRange.start.line - 1, visibleRange.start.character);
      const newPositionBottom = new vscode.Position(visibleRange.end.line - 1, visibleRange.start.character);
      editor.revealRange(new vscode.Range(newPositionTop, newPositionBottom), vscode.TextEditorRevealType.Down);
      visibleRange = editor.visibleRanges[0];
      //if cursor is outside of visible range, move it to the bottom of the visible range
      if (currentPosition.line >= visibleRange.end.line) {
        editor.selection = new vscode.Selection(newPositionBottom, newPositionBottom);
      }
    }
  });
  context.subscriptions.push(command);

  command = vscode.commands.registerCommand('scroll-drags-cursor.scrollScreenDown', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const currentPosition = editor.selection.active;
      let visibleRange = editor.visibleRanges[0];
      console.log("0 - DOWN: " + currentPosition.line + ' => ' + visibleRange.start.line + " - " + visibleRange.end.line);
      const newPositionTop = new vscode.Position(visibleRange.start.line + 1, visibleRange.start.character);
      const newPositionBottom = new vscode.Position(visibleRange.end.line + 1, visibleRange.start.character);
      editor.revealRange(new vscode.Range(newPositionTop, newPositionBottom), vscode.TextEditorRevealType.Down);
      visibleRange = editor.visibleRanges[0];
      //if cursor is outside of visible range, move it to the top of the visible range
      if (currentPosition.line <= visibleRange.start.line) {
        editor.selection = new vscode.Selection(newPositionTop, newPositionTop);
        console.log("1 - DOWN: " + currentPosition.line + ' => ' + visibleRange.start.line + " - " + visibleRange.end.line);
      }
    }
  });
  context.subscriptions.push(command);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
  activate,
  deactivate
}
