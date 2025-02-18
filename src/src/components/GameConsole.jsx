import { useState, useRef, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

function GameConsole({ gameRef, onClose }) {
    const [command, setCommand] = useState('Your code goes here!');
    const [output, setOutput] = useState('');
    const [position, setPosition] = useState({ x: 400, y: 450 });
    const [isDragging, setIsDragging] = useState(false);
    const dragRef = useRef(null);
    const textAreaRef = useRef(null);

    useEffect(() => {
        const savedPosition = localStorage.getItem('consolePosition');
        if (savedPosition) {
            setPosition(JSON.parse(savedPosition)); // Restore saved position
        }
    }, []);

    useEffect(() => {
        window.isConsoleOpen = true;
        return () => {
            window.isConsoleOpen = false;
        };
    }, []);
    
    // useEffect(() => {
    //     if (textAreaRef.current) {
    //         textAreaRef.current.focus(); // Auto-focus when the console opens
    //     }
    // }, []);

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
            const newPosition = {
                x: e.clientX - dragRef.current.startX,
                y: e.clientY - dragRef.current.startY
            };
            setPosition(newPosition);
            localStorage.setItem('consolePosition', JSON.stringify(newPosition)); // Save position
            }
        }
    

    const stopDrag = () => setIsDragging(false);

    return (
        <div 
            className='console'
            style = {{top: `${position.y}px`, left: `${position.x}px`, cursor: isDragging ? 'grabbing' : 'default', userSelect: 'none'}}
            onMouseMove={onDrag}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            onMouseDown={startDrag}
        >
                <button onClick={onClose} className='consoleBtn'></button>
                
                <div className='terminal'>
                    <h3>Runtime editor</h3>
                    <Editor
                        ref={textAreaRef}
                        value={command}
                        padding={10}
                        onValueChange={command => setCommand(command)}
                        highlight={command => highlight(command, languages.js)}
                        style={{resize: 'none', 
                            backgroundColor: '#303030',
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            width: '100%',
                            minHeight: '100px',
                            borderRadius: '5px',
                            fontSize: '14px',}}
                    />
                    <button className='terminalBtn' onClick={runCommand}>Run</button>
                
                </div>

                <div className='output'>
                    <strong>Output:</strong>
                    <pre>{output}</pre>
                </div>
        
        </div>
    );
}

export default GameConsole;