import { useState } from "react";
import ResetGame from "./ResetGame";
import Credits from "./Credits";

export default function StartingMenu({onStart}) {
    const [ onReset , setOnReset ] = useState(false);
    const [ onCredits , setOnCredits ] = useState(false);
    
    function restart(){
        setOnReset(false);
        localStorage.clear();
    }
    return (
        <div className="starting-menu">
            {onReset ? <ResetGame onYes={restart} onNo={()=>setOnReset(false)}/> : null}
            {onCredits ? <Credits onClose={()=>setOnCredits(false)}/> : null}
            {(onReset || onCredits) ? null : (
            <div className="menu">
                <h1>Welcome to the Nodebreaker game!</h1>
                <button onClick={onStart} className='menuBtn'>{localStorage.getItem('first-run') ? 'Continue' : 'Start'} Game</button>
                <button className='menuBtn'>Instruction</button>
                <a href="https://github.com/0xFCmkjk/geek-gra" target="_blank"><button className='menuBtn'>GitHub Repo</button></a>
                <button onClick={()=>setOnCredits(true)} className='menuBtn'>Credientials</button>
                <button onClick={()=>setOnReset(true)} className='menuBtn'>Reset Game</button>
            </div>)}
        </div>
    );
}