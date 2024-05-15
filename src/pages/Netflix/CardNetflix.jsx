import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import NetflixRequests from '../../fetch/NetflixRequests';
import NetflixCard from '../../components/Netflix/NetflixCard';
import styles from './Netflix.module.css'; 

function CardNetflix() {
    const [filmes, setFilmes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15); // Número de itens por página

    useEffect(() => {
        const fetchData = async () => {
            const filmesData = await NetflixRequests.ListarFilmes();
            setFilmes(filmesData);
        };
        fetchData();
    }, []);

    // Calcular índices dos itens a serem exibidos na página atual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const FilmesPaginados = filmes.slice(indexOfFirstItem, indexOfLastItem);

    // Total de páginas com base no número de itens e itens por página
    const totalPages = Math.ceil(filmes.length / itemsPerPage);

    // Função para mudar a página atual
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Função para ir para a próxima página
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Função para ir para a página anterior
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <NavBar />
            <div className={styles.ctnLivros}>
                {FilmesPaginados.length > 0 ? (
                    FilmesPaginados.map(filmes => (
                        <div key={filmes.show_id} className={styles.amazonCard}>
                            <NetflixCard filmes={filmes} />
                        </div>
                    ))
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

export default CardNetflix;
