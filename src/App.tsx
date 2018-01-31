import * as preact from 'preact';
import * as net from 'net';
import * as readline from 'readline';

class AppState {
	count: number | null = null;
}

export default class App extends preact.Component<any, AppState> {
	constructor() {
		super();
		this.state = new AppState();
	}
	render(props, state) {
		return <div>
			<h1>hi</h1>
			<h3>{state.count}</h3>
		</div>;
	}
	componentWillMount() {
		const server = net.createServer(socket => {
			const br = readline.createInterface(socket, socket);
			br.on('line', line => {
				const cmd = line[0];
				const data = line.substring(1);
				if(cmd == "?") {
					console.log("preparing for", data);
					this.setState({count: parseInt(data)});
				}
				else {
					console.log("something else");
				}
			});
		});
		server.listen(6659, '0.0.0.0');
	}
}
