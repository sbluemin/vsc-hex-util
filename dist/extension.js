/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __webpack_require__(1);
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    context.subscriptions.push(hoverDisposable);
}
exports.activate = activate;
function hex2ascii(hex) {
    return Buffer.from(hex, 'hex').toString();
}
function changeEndianness(hex) {
    const result = [];
    let len = hex.length - 2;
    while (len >= 0) {
        result.push(hex.substr(len, 2));
        len -= 2;
    }
    return result.join('');
}
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

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map