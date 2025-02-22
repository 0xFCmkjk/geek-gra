export default function StartingMenu({onStart}) {
    return (
        // @mikolajjkrol reset progress button zrobic tak aby bylo potwierzenie cyz napewno
        <div className="starting-menu">
            <div className="menu">
                <h1>Welcome to the Nodebreaker game!</h1>
                <button onClick={onStart} className='menuBtn'>Start</button>
                <button onClick={onStart} className='menuBtn'>Info</button>
                <button onClick={onStart} className='menuBtn'>Credientials</button>
                <button onClick={(localStorage.clear())} className='menuBtn'>Reset Progress</button>
            </div>
        </div>
    );
}