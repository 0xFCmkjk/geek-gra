import { useState, useRef, useEffect } from 'react';
import { EventBus } from '../game/EventBus';

const taskInfoState = {
    info: "",
    setInfo: null,
};

// Global event listener (runs once and without component having to be open)
if (!taskInfoState.setInfo) {
    // Listen for a event that comes from every scene with taskInfo
    EventBus.on('task-info-updated', (info) => {
        taskInfoState.info = info;
        if (taskInfoState.setInfo) {
            taskInfoState.setInfo(info);
        }
    });
}

function TaskInfo({ onClose }) {
    const [position, setPosition] = useState({ x: 600, y: 600 });
    const [isDragging, setIsDragging] = useState(false);
    const dragRef = useRef(null);
    const [taskInfo, setTaskInfo] = useState(taskInfoState.info);

    useEffect(() => {
        taskInfoState.setInfo = setTaskInfo;
        return () => {
            taskInfoState.setInfo = null;
        };
    }, []);

    useEffect(() => {
        const savedPosition = localStorage.getItem('infoPosition');
        if (savedPosition) {
            setPosition(JSON.parse(savedPosition)); // Restore saved position
        }
    }, []);

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
            localStorage.setItem('infoPosition', JSON.stringify(newPosition)); // Save position
            }
        }
    

    const stopDrag = () => setIsDragging(false);
    
    //TODO: CSS @mikolajjkrol <3
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
                {taskInfo && <p>{taskInfo}</p>}
        </div>
    );
}

export default TaskInfo;