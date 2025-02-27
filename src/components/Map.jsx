export default function Map({onSelect}) {
    return (
        <div style={{width: '100%', height: '110vh', backgroundColor: 'rgba(0, 0, 0, 0.74)', position: 'absolute'}}>
            <div className='map' onClick={onSelect}></div>
        </div>
    );
}