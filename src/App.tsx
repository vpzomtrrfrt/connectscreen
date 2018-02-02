import * as preact from 'preact';
import * as net from 'net';
import * as readline from 'readline';

class AppState {
	counts: number[] | null = null;
	values: any[] = null;
}

export default class App extends preact.Component<any, AppState> {
	constructor() {
		super();
		this.state = new AppState();
	}
	render(props, state) {
		return <div>
			{state.counts && <div>
				{state.counts.map((count, index) => <div class="mainDisplay">
					{Array.apply(null, new Array(count)).map((e,i) => {
						const value = state.values[index][i];
						return <div class={value ? '' : 'empty'}>
							<div>{value}</div>
							</div>;
					})}
					</div>)}
				</div>
			}
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
					const counts = data.split("?").map(x => parseInt(x));
					this.setState({counts, values: counts.map(_ => ({}))});
				}
				else if(cmd == "!") {
					const i1 = parseInt(data[0]);
					const i2 = parseInt(data[1]);
					const msg = data.substring(2);
					this.state.values[i1][i2] = msg;
					this.forceUpdate();
				}
				else {
					console.log("something else");
					this.state.values[0][cmd] = data;
					this.forceUpdate();
				}
			});
		});
		server.listen(6659, '0.0.0.0');
	}
}
