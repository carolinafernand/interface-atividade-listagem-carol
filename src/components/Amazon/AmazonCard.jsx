import './Amazon.css'
function AmazonCard({ livro }) {

    const exibeID = () => {
        console.log(livro.id_livro, "\n", livro);
    }


    return (
        <div className='card-amazon'>
            <imgon Click={exibeID} />
            <p>ID: {livro.id_livro}</p>
            <p>Data de Venda: {livro.data_venda}</p>
            <p>Nome do Livro: {livro.nome_produto}</p>
            <p>Edição: {livro.edicao}</p>
        </div >
    );
}

export default AmazonCard;