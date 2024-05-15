import './Amazon.css';

function AmazonCard({ livro }) {

    const exibeID = () => {
        console.log(livro.id_livro, "\n", livro);
    };

    const formatarData = (data) => {
        const dataObj = new Date(data);
        const dia = String(dataObj.getDate()).padStart(2, '0');
        const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // Corrigido aqui
        const ano = dataObj.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };
    

    return (
        <div className='card-amazon' onClick={exibeID}>
            <img src={livro.imagem} alt={livro.nome_produto} className='amazon-image'/>
            <p>ID: {livro.id_livro}</p>
            <p>Data de Venda: {formatarData(livro.data_venda)}</p>
            <p>Nome do Livro: {livro.nome_produto}</p>
            <p>Edição: {livro.edicao}</p>
        </div>
    );
}

export default AmazonCard;
