import { Terminal } from 'xterm';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { useEffect, useRef } from 'react';

export default function PseudoTerminal() {
    const terminalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (terminalRef.current) {
            const terminal = new Terminal({
                cursorBlink: true,
                rows: 20,
            });

            terminal.loadAddon(new WebLinksAddon());
            terminal.open(terminalRef.current);
            terminal.focus();

            terminal.writeln('Welcome to the PseudoTerminal!');

            terminal.onKey(({ key, domEvent }) => {
                const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;
                if (domEvent.key === 'Enter') {
                    terminal.write('\r\n');
                } else if (domEvent.key === 'Backspace') {
                    if (terminal._core.buffer.x > 2) {
                        terminal.write('\b \b');
                    }
                } else if (printable) {
                    terminal.write(key); 
                }
            });
        }
    }, []);

    return (
        <div
            ref={terminalRef}
            style={{
                height: '400px',
                width: '600px',
                backgroundColor: '#1e1e1e',
            }}
        ></div>
    );
}
