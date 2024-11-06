document.addEventListener('DOMContentLoaded', () => {
    const id_usuario = localStorage.getItem('id');
    const nome = localStorage.getItem('name');
    console.log(nome, id_usuario);

    // Exibe o nome do usuário no elemento com ID "title"

    // Função para buscar as pontuações do backend
    async function fetchScores() {
        try {
            const response = await fetch(`http://localhost:3006/api/quiz`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_usuario }) // Inclui o corpo da requisição com o ID do usuário
            });

            // Verifica se a resposta foi bem-sucedida
            if (response.ok) {
                const htmlContent = await response.text(); // Recebe o HTML gerado pelo controller
                document.getElementById('opcao-section').innerHTML = htmlContent; // Insere o conteúdo dinâmico
            } else {
                document.getElementById('opcao-section').innerHTML = '<p>Erro ao carregar pontuações.</p>';
            }
        } catch (error) {
            console.error('Erro:', error);
            document.getElementById('opcao-section').innerHTML = '<p>Erro no servidor.</p>';
        }
    }

    // Chama as funções para buscar as pontuações ao carregar a página
    if (id_usuario) {
        fetchScores();
    }
});
