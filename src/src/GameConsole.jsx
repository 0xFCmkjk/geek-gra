import { useState, useRef } from 'react';

function GameConsole({ gameRef, onClose }) {
    const [command, setCommand] = useState('');
    const [output, setOutput] = useState('');
    const [position, setPosition] = useState({ x: 400, y: 450 });
    const [isDragging, setIsDragging] = useState(false);
    const dragRef = useRef(null);

    const runCommand = () => {
        try {
            const scene = gameRef.current?.scene;
            if (scene) {
                // Evaluate the command with access to `scene`
                const result = eval(command);
                setOutput(result !== undefined ? String(result) : "Command executed successfully");
            } else {
                setOutput("Error: Scene not found");
            }
        } catch (error) {
            setOutput(`Error: ${error.message}`);
        }
    };

    const startDrag = (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        setIsDragging(true);
        dragRef.current = { startX: e.clientX - position.x, startY: e.clientY - position.y };
    };

    const onDrag = (e) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragRef.current.startX,
                y: e.clientY - dragRef.current.startY
            });
        }
    };

    const stopDrag = () => setIsDragging(false);

    return (
        <div 
            className='console'
            style = {{top: `${position.y}px`, left: `${position.x}px`, cursor: isDragging ? 'grabbing' : 'default'}}
            onMouseMove={onDrag}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            onMouseDown={startDrag}
        >
                <button onMouseDown={startDrag}  onClick={onClose} className='consoleBtn'></button>
                
                <div className='terminal'>
                    <h3>Runtime editor</h3>
                    <textarea 
                        value={command} 
                        onChange={(e) => setCommand(e.target.value)}
                    />
                    <button className='button terminalBtn' onClick={runCommand}>Run</button>
                
                </div>

                <div className='output'>
                    <strong>Output:</strong>
                    <pre>{output}</pre>
                </div>
        
        </div>
    );
}

export default GameConsole;