export default function ResetGame({onYes, onNo}){
    return (
        <div className="menu">
                <h2>Are you sure you want to reset the game?</h2>
                <button onClick={onYes} className='menuBtn'>Yes</button>
                <button onClick={onNo} className='menuBtn'>No</button>
        </div>
    );
}