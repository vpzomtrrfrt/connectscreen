import * as preact from 'preact';
import * as net from 'net';
import * as readline from 'readline';

class AppState {
	count: number | null = null;
	values: any = null;
}

export default class App extends preact.Component<any, AppState> {
	constructor() {
		super();
		this.state = new AppState();
	}
	render(props, state) {
		return <div>
			{state.count && <div class="mainDisplay">
				{Array.apply(null, new Array(state.count)).map((e,i) => {
					const value = state.values[i];
					return <div class={value ? '' : 'empty'}>
						<div>{value}</div>
					</div>;
				})}
				</div>}
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
					this.setState({count: parseInt(data), values: {}});
				}
				else {
					console.log("something else");
					this.state.values[cmd] = data;
					this.forceUpdate();
				}
			});
		});
		server.listen(6659, '0.0.0.0');
	}
}
