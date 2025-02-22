export default function Credits({onClose}){
    return (
        <div className="menu">
                <h2>Credientials</h2>
                <p>Michał Bartoszcze</p>
                <i>JavaScript, Game backend, Phaser integration</i>
                <p>Mikołaj Król</p>
                <i>React components, graphics, game frontend</i>
                <br /><br />
                <button onClick={onClose} className='menuBtn'>Go Back</button>
        </div>
    )
}