export default function StartingMenu({onStart}) {
    return (
        <div className="starting-menu">
            <div className="menu">
                <h1>Phaser 3 Runtime Editor</h1>
                <p>Game Menu hasdbasjd.</p>
                <button onClick={onStart} className="button">Start</button>
            </div>
        </div>
    );
}