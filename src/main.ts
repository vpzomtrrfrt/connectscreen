import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

app.on('ready', function() {
	const win = new BrowserWindow();
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));
});

app.on('window-all-closed', () => app.quit());
