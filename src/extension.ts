// モジュール「vscode」には、VS Code 拡張 API が含まれています
// モジュールをインポートし、以下のコード内でエイリアス vscode を使用して参照します。
import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';


// このメソッドは、拡張機能がアクティブ化されたときに呼び出されます
// 拡張機能は、コマンドが初めて実行されたときにアクティブ化されます。
export function activate(context: vscode.ExtensionContext) {

	const is_windows = process.platform==='win32'

	// 「TrainingJavaTool.RunCode」で実行される処理
	let disposable = vscode.commands.registerCommand('JavaSelectedCodeExecutor.RunCode', function () {
		
		// テキストエディタが開かれているかどうかの判定
		if(typeof vscode.window.activeTextEditor == 'undefined' ){
			vscode.window.showErrorMessage('ファイルが開かれていません。');
			return;
		}
		
		// 開かれているテキストがJava言語のファイルになっているかどうかの反対
		if (vscode.window.activeTextEditor.document.languageId !== 'java') {
			vscode.window.showErrorMessage('これは Java ファイルではありません。');
			return;
		}
		
		// 選択範囲を取得する
		let cur_selection = vscode.window.activeTextEditor.selection; 
		
		//選択範囲のテキストを取得する（ない場合は全て）
		let text = ''; 
		text = text + 'void print(Object param) { ' + os.EOL;
		text = text + '    System.out.print(param); ' + os.EOL;
		text = text + '} ' + os.EOL;
		text = text + '' + os.EOL;
		text = text + 'void println(Object param) { ' + os.EOL;
		text = text + '    System.out.println(param); ' + os.EOL;
		text = text + '} ' + os.EOL;
		text = text + '' + os.EOL;
		text = text + 'String input() { ' + os.EOL;
		text = text + '    Scanner in = new Scanner(System.in, "MS932"); ' + os.EOL;
		text = text + '    return in.nextLine(); ' + os.EOL;
		text = text + '} ' + os.EOL;
		text = text + 'char inputToChar() { ' + os.EOL;
		text = text + '    return input().charAt(0); ' + os.EOL;
		text = text + '} ' + os.EOL;
		text = text + '' + os.EOL;
		text = text + 'int inputToInt() { ' + os.EOL;
		text = text + '    return Integer.parseInt(input()); ' + os.EOL;
		text = text + '} ' + os.EOL;
		text = text + '' + os.EOL;
		text = text + 'double inputToDouble() { ' + os.EOL;
		text = text + '    return Double.parseDouble(input()); ' + os.EOL;
		text = text + '} ' + os.EOL;
		text = text + '' + os.EOL;
		text = text + 'long inputToLong() { ' + os.EOL;
		text = text + '    return Long.parseLong(input()); ' + os.EOL;
		text = text + '} ' + os.EOL;
		text = text + '' + os.EOL;
		text = text + 'float inputToFloat() { ' + os.EOL;
		text = text + '    return Float.parseFloat(input()); ' + os.EOL;
		text = text + '} ' + os.EOL;
		text = text + '' + os.EOL;
		text = text + 'short inputToShort() { ' + os.EOL;
		text = text + '    return Short.parseShort(input()); ' + os.EOL;
		text = text + '} ' + os.EOL;
		
		text = text + 'println("[Java Selected Code Executor]コードの実行を開始します。");' + os.EOL;
				text = text + 'println("[Java Selected Code Executor]------------------コードの実行結果------------------");' + os.EOL;
		if(cur_selection.isEmpty){
			text = text + vscode.window.activeTextEditor.document.getText() + os.EOL;
		}else{
			text = text + vscode.window.activeTextEditor.document.getText(cur_selection) + os.EOL;
		}
		text = text + 'println("[Java Selected Code Executor]----------------------------------------------------");' + os.EOL;
		text = text + 'println("[Java Selected Code Executor]コードの実行が完了しました。");' + os.EOL;
		text = text + 'println("[Java Selected Code Executor]Enterキーを押して終了します。");' + os.EOL;
		text = text + 'input();' + os.EOL;
		text = text + '/ex' + os.EOL;
		
		
		// 一時ファイルのパスを生成
		let temp_jshell_file = path.join(os.tmpdir(), 'vscode-extension-temp' + Math.random().toString(36).slice(-8) + '.jsh');
		
		// 一時ファイルに出力（出力後にJshellで実行）
		fs.writeFile(temp_jshell_file, text, (err) =>{
		
			let terminalType = '';
			let jdkType = '';
			let jshell = '';
			if(is_windows){
				terminalType = 'cmd.exe';
				jdkType = 'jdk-11_win';
				jshell = 'jshell.exe';
			} else {
				terminalType = 'bash';
				jdkType = 'jdk-11_linux';
				jshell = 'jshell';
			}
		
			// JavaHomeのパス
			let javaHomePath = vscode.workspace.getConfiguration('JavaSelectedCodeExecutor').get('java_home', '');
			if(javaHomePath == '' ){
				vscode.window.showInformationMessage('内部的に保持しているJavaで動作します。');
				javaHomePath = path.join(os.tmpdir(), jdkType);
				if (!fs.existsSync(javaHomePath)){
					let fsex = require('fs-extra');
					fsex.copySync(path.join(__dirname, jdkType), javaHomePath );
					chmodFolder(javaHomePath, '755');
				}
			}
			
			// Jshellのパス
			let jshellCommand = path.join(javaHomePath, 'bin', jshell);
			
			// ターミナル上で実行
			let terminal = vscode.window.createTerminal('jshell実行', terminalType);
			terminal.sendText(jshellCommand + ' ' + '-J-Dfile.encoding=utf8 --execution local' + ' ' + temp_jshell_file + ' && exit' );
			terminal.show();
			
		});
	});
	
	context.subscriptions.push(disposable);
}

// このメソッドは、拡張機能が非アクティブ化されたときに呼び出されます。
export function deactivate() {}

// フォルダのパーミッションを変更します。
function chmodFolder(dirPath: string, mode: string) {
	let fsex = require('fs-extra');
	const items = fs.readdirSync(dirPath);
	for (const item of items) {
		const target = path.join(dirPath, item);
		if (fs.lstatSync(target).isDirectory()) {
			chmodFolder(target, mode)
		} else {
			fsex.chmod(target, mode);
		}
	}
	fsex.chmod(dirPath, mode);
}



