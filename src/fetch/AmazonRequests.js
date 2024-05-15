class AmazonRequests {
    constructor() {
        this.serverUrl = 'http://10.90.2.119:3333';
        this.routeListarLivros = '/vendas';
    }
    async ListarLivros() {
        try {
            const response = await fetch(`${this.serverUrl}${this.routeListarLivros}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar servidor');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro: ', error);
            return null;
        }
    }

}
export default new AmazonRequests