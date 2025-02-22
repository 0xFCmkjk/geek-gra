export default function StartingMenu({onStart}) {
    return (
        // @mikolajjkrol reset progress button zrobic tak aby bylo potwierzenie cyz napewno
        <div className="starting-menu">
            <div className="menu">
                <h1>Welcome to the Nodebreaker game!</h1>
                <button onClick={onStart} className='menuBtn'>{localStorage.getItem('Task1Completed') ? 'Continue' : 'Start'} Game</button>
                <button onClick={onStart} className='menuBtn'>Information</button>
                <button onClick={onStart} className='menuBtn'>Credientials</button>
            </div>
        </div>
    );
}