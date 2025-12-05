import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('A22 Extension Activated');

    // Register a semantic tokens provider or other features here
    // For now, syntax highlighting is handled by TextMate grammar

    // Simple diagnostic example
    const collection = vscode.languages.createDiagnosticCollection('a22');
    if (vscode.window.activeTextEditor) {
        updateDiagnostics(vscode.window.activeTextEditor.document, collection);
    }
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(editor => {
        if (editor) {
            updateDiagnostics(editor.document, collection);
        }
    }));
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(e => updateDiagnostics(e.document, collection)));
}

function updateDiagnostics(document: vscode.TextDocument, collection: vscode.DiagnosticCollection): void {
    if (document.languageId !== 'a22') return;

    // Placeholder for calling Core Validator
    // const errors = core.validate(document.getText());

    const diagnostics: vscode.Diagnostic[] = [];

    // Example rule: Check for "TODO"
    const text = document.getText();
    const todoRegex = /TODO/g;
    let match;
    while (match = todoRegex.exec(text)) {
        const startPos = document.positionAt(match.index);
        const endPos = document.positionAt(match.index + match[0].length);
        const diagnostic = new vscode.Diagnostic(
            new vscode.Range(startPos, endPos),
            "Detailed implementation needed",
            vscode.DiagnosticSeverity.Information
        );
        diagnostics.push(diagnostic);
    }

    collection.set(document.uri, diagnostics);
}

export function deactivate() { }
