import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import NetflixRequests from '../../fetch/NetflixRequests';
import styles from './Netflix.module.css';

function TableNetflix() {
    const [filmes, setFilmes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15); // Número de itens por página

    useEffect(() => {
        const fetchData = async () => {
            const FilmesData = await NetflixRequests.ListarFilmes();
            setFilmes(FilmesData);
        };
        fetchData();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const filmesPaginados = filmes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filmes.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <NavBar />
            <div className={styles.ctnLivros}>
                {filmesPaginados.length > 0 ? (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tipo de filme</th>
                                <th>Título do filme</th>
                                <th>Ano de lançamento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filmesPaginados.map((filme) => (
                                <tr key={filme.show_id}>
                                    <td>{filme.show_id}</td>
                                    <td>{filme.tipo}</td>
                                    <td>{filme.titulo}</td>
                                    <td>{filme.ano_lancamento}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Nenhum filme encontrado.</p>
                )}
            </div>

            {/* Controles de navegação entre páginas */}
            <div className={styles.pagination}>
                <button className={styles.paginationButton} onClick={prevPage} disabled={currentPage === 1}>
                    Anterior
                </button>
                <button className={styles.paginationButton} onClick={nextPage} disabled={currentPage === totalPages}>
                    Próxima
                </button>
            </div>
        </div>
    );
}

export default TableNetflix;
