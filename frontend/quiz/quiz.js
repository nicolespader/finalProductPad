document.addEventListener('DOMContentLoaded', () => {

    //busca as perguntas no servidor    
    async function fetchQuestions() {
        try {
            console.log("Tentando acessar /backend/get/quiz");

            // Envia uma requisição ao servidor para obter as perguntas
            const response = await fetch(`http://localhost:3006/backend/get/quiz`, {
                method: 'POST', // Método HTTP utilizado para enviar os dados
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                // Caso a resposta do servidor seja bem-sucedida, processa os dados
                const result = await response.json();
                if (result.success) {
                    
                    // Renderiza as perguntas na interface
                    renderQuiz(result.data);
                } else {
                    console.warn("Nenhuma pergunta encontrada:", result.message);
                    document.getElementById('opcao-section').innerHTML = '<p>Nenhuma pergunta encontrada.</p>';
                }
            } else {
                console.error("Erro na requisição:", response.status);
                document.getElementById('opcao-section').innerHTML = '<p>Erro ao carregar perguntas.</p>';
            }
        } catch (error) {
            console.error('Erro no fetch:', error);
            document.getElementById('opcao-section').innerHTML = '<p>Erro no servidor.</p>';
        }
    }

    //busca a maior score do usuario
    async function fetchHighScore() {
        try {
            console.log("Buscando pontuação máxima");
            
            // Envia uma requisição para obter a pontuação máxima
            const response = await fetch('http://localhost:3006/backend/getHighScore', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_usuario: 1 }) // Substituir para pegar o ID do usuário logado
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    console.log("Pontuação máxima recebida:", result.highScore);

                    document.getElementById('pontos').innerText = result.highScore; // Atualiza o elemento de pontuação máxima
                } else {
                    console.warn("Erro ao buscar pontuação máxima:", result.message);
                }
            } else {
                console.error("Erro ao buscar pontuação máxima:", response.status);
            }
        } catch (error) {
            console.error("Erro ao buscar pontuação máxima:", error);
        }
    }

    // Inicializar o quiz e buscar pontuação máxima
    console.log("Inicializando...");
    fetchHighScore();
    fetchQuestions();

    function renderQuiz(questions) {
        console.log("Renderizando perguntas:", questions);
        const container = document.getElementById('opcao-section');

        // Verifica se o elemento de destino existe
        if (!container) {
            console.error('Elemento com id="opcao-section" não encontrado!');
            return;
        }

        let html = '';

        //p cada questao ele vai criar uma div que contem a pergunta, assim aparecendo na tela
        questions.forEach(question => {
            html += `
                <div class="questoes-box">
                    <p class="question-text">${question.pergunta}</p>
            `;
            question.respostas.forEach(resposta => {
                html += `
                    <label class="opcao-box">
                        <input type="radio" name="question${question.id_pergunta}" value="${resposta.id_resposta}">
                        ${resposta.resposta}
                    </label><br>
                `;
            });
            html += `</div>`;
        });
    
        //colocando para aparecer na tela e adiciona o botão de envio no final
        html += `<button class="submit-button" onclick="submitQuiz()">Enviar</button>`;
        container.innerHTML = html;
        console.log("Perguntas renderizadas no DOM.");
    }

    // Torna a função `submitQuiz` acessível globalmente para poder usar no botão
    window.submitQuiz = async function submitQuiz() {

        // Coleta as respostas selecionadas pelo usuário
        const answeredQuestions = Array.from(document.querySelectorAll('.questoes-box'))
            .map(box => {
                const selectedInput = box.querySelector('input[type="radio"]:checked');
                if (!selectedInput) return null;
                return {
                    id_pergunta: parseInt(selectedInput.name.replace('question', '')), // Extrai o ID da pergunta
                    id_resposta: parseInt(selectedInput.value) // Obtém o ID da resposta selecionada
                };
            })
            .filter(Boolean); // Remove respostas nulas
    
        // Valida se pelo menos uma pergunta foi respondida
        if (answeredQuestions.length === 0) {
            alert("Por favor, responda pelo menos uma pergunta!");
            return;
        }
    
        try {
            console.log("Dados enviados para calculateScore:", {
                id_usuario: 1, // Ajuste dinâmico conforme necessário
                respostas: answeredQuestions
            });
    
            // Envia as respostas do usuário para o servidor calcular a pontuação
            const response = await fetch('http://localhost:3006/backend/calculateScore', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id_usuario: 1, // Ajuste dinâmico conforme necessário
                    respostas: answeredQuestions
                })
            });
    
            const result = await response.json();
            console.log("Resposta do servidor após calcular pontuação:", result);
    
            if (result.success) {
                alert(result.message);
                document.getElementById('pontos').innerText = result.pontosGanhos;
    
                // Recarregar novas perguntas
                await fetchQuestions();
            } else {
                console.warn("Erro ao calcular pontuação:", result.message);
            }
        } catch (error) {
            console.error("Erro ao calcular pontuação:", error);
        }
    };

    // Inicializa o quiz
    console.log("Iniciando fetchQuestions");
    fetchQuestions();
});
