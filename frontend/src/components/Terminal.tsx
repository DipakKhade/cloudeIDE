import React, { useState } from 'react';
import { Xterm } from 'xterm-react';
import { Socket } from 'socket.io-client'



const PseudoTerminal = ({ socket }: {
	socket: Socket
}) => {
	const [Terminal, setTerminal] = useState(null);
	const [input, setInput] = useState('');

	// socket.emit("initTerminal")

	const onTermInit = (term: any) => {
		setTerminal(term);
		term.reset();
		term.write('$ ');
	};

	const onTermDispose = (term: any) => {
		setTerminal(null);
	};

	const handleData = (data: any) => {
		if (Terminal) {
			const code = data.charCodeAt(0);
			if (code === 13 && input.length > 0) {
				Terminal?.write("\r\n " + input + "'\r\n");
				setInput('@Dipaks-MacBook-Pro dir %');
			} else if (code < 32 || code === 127) {
				console.log('Control Key', code);
				return;
			} else {
				Terminal.write(data);
				setInput(input + data);
			}
		}
	};


	const onKeyChange = ({ domEvent }: {
		domEvent: any
	}) => {
		console.log(domEvent)
		console.log('hello')
	}

	return (
		<div className="App">
			<header className=''>
				<Xterm
					onInit={onTermInit}
					onDispose={onTermDispose}
					onData={handleData}
					onKey={onKeyChange}
				/>
			</header>
		</div>
	);
}


export default PseudoTerminal;
