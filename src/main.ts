import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as net from 'net';
import * as readline from 'readline';

app.on('ready', function() {
	const win = new BrowserWindow();
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));

});

app.on('window-all-closed', () => app.quit());
