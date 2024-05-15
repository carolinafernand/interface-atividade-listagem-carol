import './Netflix.css'
function NetflixCard({ filmes }) {

    const exibeID = () => {
        console.log(filmes.show_id, "\n", filmes);
    }


    return (
        <div className='card-amazon'>
            <imgon Click={exibeID} />
            <p>ID: {filmes.show_id}</p>
            <p>Tipo de filme: {filmes.tipo}</p>
            <p>Titulo do filme: {filmes.titulo}</p>
            <p>Ano de lançamento: {filmes.ano_lancamento}</p>
        </div >


    );
}

export default NetflixCard;