import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import FifaRequests from '../../fetch/FifaRequests'
import FifaCard from '../../components/Fifa/FifaCard'
import styles from './FIFA.module.css'; // Importe o arquivo CSS Module

function CardFifa() {
    const [jogos, setJogos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15); // Número de itens por página

    useEffect(() => {
        const fetchData = async () => {
            const jogadoresData = await FifaRequests.ListarJogadores();
            setJogos(jogadoresData);
        };
        fetchData();
    }, []);

    // Calcular índices dos itens a serem exibidos na página atual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const JogosPaginados = jogos.slice(indexOfFirstItem, indexOfLastItem);

    // Total de páginas com base no número de itens e itens por página
    const totalPages = Math.ceil(jogos.length / itemsPerPage);

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
                {JogosPaginados.length > 0 ? (
                    JogosPaginados.map(jogos => (
                        <div key={jogos.playerid} className={styles.amazonCard}>
                            <FifaCard jogos = {jogos} />
                        </div>
                    ))
                ) : (
                    <p>Nenhum jogadores encontrado.</p>
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

export default CardFifa;
