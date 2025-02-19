export default function StartingMenu({onStart}) {
    return (
        <div className="starting-menu">
            <div className="menu">
                <h1>Welcome to the Nodebreaker game!</h1>
                <button onClick={onStart} className='menuBtn'>Start</button>
                <button onClick={onStart} className='menuBtn'>Info</button>
                <button onClick={onStart} className='menuBtn'>Credientials</button>
            </div>
        </div>
    );
}