import './Fifa.css';

function FifaCard({ jogos }) {

    const exibeID = () => {
        console.log(jogos.playerid, "\n", jogos);
    }


    return (
        <div className='card-fifa'>
            <imgon Click={exibeID} />
            <p>ID: {jogos.playerid}</p>
            <p>Nome do Jogador: {jogos.playername}</p>
            <p>Pé dominante:{jogos.foot}</p>
            <p>Posição: {jogos.playerposition}</p>
            <p>OVR: {jogos.ovr}</p>
        </div >
    );
}

export default FifaCard;