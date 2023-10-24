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
		
		if(cur_selection.isEmpty){
			text = text + vscode.window.activeTextEditor.document.getText() + os.EOL;
		}else{
			text = text + vscode.window.activeTextEditor.document.getText(cur_selection) + os.EOL;
		}
		text = text + '/ex' + os.EOL;
		
		
		// 一時ファイルのパスを生成
		let temp_jshell_file = path.join(os.tmpdir(), 'vscode-extension-temp' + Math.random().toString(36).slice(-8) + '.jsh');
		
		// 一時ファイルに出力（出力後にJshellで実行）
		fs.writeFile(temp_jshell_file, text, (err) =>{
		
			// JavaHomeのパス
			let javaHomePath = vscode.workspace.getConfiguration('JavaSelectedCodeExecutor').get('java_home', '');
			if(javaHomePath == '' ){
				vscode.window.showInformationMessage('内部的に保持しているJavaで動作します。');
				javaHomePath = path.join(__dirname, 'jdk-11');
			}
			
			// Jshellのパス
			let jshellCommand = path.join(javaHomePath, 'bin', 'jshell.exe');
			
			// ターミナル上で実行
			let temp_bat_file = path.join(os.tmpdir(), 'vscode-extension-temp' + Math.random().toString(36).slice(-8) + '.bat');
			let bat_text = ''; 
			bat_text = bat_text + '@echo off' + os.EOL;
			bat_text = bat_text + '"' + jshellCommand + '"' + ' ' + '-J-Dfile.encoding=utf8 --execution local' +' ' + '"' + temp_jshell_file + '"' + os.EOL;
			bat_text = bat_text + 'echo.' + os.EOL;
			bat_text = bat_text + 'echo.' + os.EOL;
			bat_text = bat_text + 'echo 実行が完了しました。' + os.EOL;
			bat_text = bat_text + 'echo 終了するには何かキーを押してください . . . ' + os.EOL;
			bat_text = bat_text + 'pause > NUL' + os.EOL;
			bat_text = bat_text + 'exit' + os.EOL;
			
			fs.writeFileSync(temp_bat_file , '');
			let fd = fs.openSync(temp_bat_file, 'w');
			let iconv = require('iconv-lite');
			let buf = iconv.encode(bat_text, 'Shift_JIS');
			fs.write(fd, buf, 0, buf.length , function(err, written, buffer){
				if(err) throw err;
				let executCommand = '"' + temp_bat_file + '"';
				let terminal = vscode.window.createTerminal('jshell実行', 'cmd.exe', '/c ' + '"' + executCommand + '"');
				terminal.show();
			});
		});
	});
	
	context.subscriptions.push(disposable);
}

// このメソッドは、拡張機能が非アクティブ化されたときに呼び出されます。
export function deactivate() {}

