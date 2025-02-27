import { useState } from "react";
export default function Map({onSelect}) {
    const [selected, setSelected] = useState(false);

    return (
        <div style={{width: '100%', height: '110vh', backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute'}}>
            <div className='map' onClick={onSelect}></div>
        </div>
    );
}