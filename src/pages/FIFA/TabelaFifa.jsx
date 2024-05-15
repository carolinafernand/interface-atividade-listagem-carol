import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import FifaRequests from '../../fetch/FifaRequests'
import styles from './FIFA.module.css';

function TableFifa() {
    const [jogos, setJogos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15); // Número de itens por página

    useEffect(() => {
        const fetchData = async () => {
            const JogosData = await FifaRequests.ListarJogadores();
            setJogos(JogosData);
        };
        fetchData();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const jogosPaginados = jogos.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(jogos.length / itemsPerPage);

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
                {jogosPaginados.length > 0 ? (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome do jogador</th>
                                <th>Pé dominante</th>
                                <th>Posição</th>
                                <th>OVR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jogosPaginados.map((jogos) => (
                                <tr key={jogos.playerid}>
                                    <td>{jogos.playerid}</td>
                                    <td>{jogos.playername}</td>
                                    <td>{jogos.foot}</td>
                                    <td>{jogos.playerposition}</td>
                                    <td>{jogos.ovr}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Nenhum jogador encontrado.</p>
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

export default TableFifa;
