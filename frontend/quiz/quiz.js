document.addEventListener('DOMContentLoaded', () => {
    async function fetchQuestions() {
        try {
            console.log("Tentando acessar /backend/get/quiz");
            const response = await fetch(`http://localhost:3006/backend/get/quiz`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
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

    async function fetchHighScore() {
        try {
            console.log("Buscando pontuação máxima");
            const response = await fetch('http://localhost:3006/backend/getHighScore', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_usuario: 1 }) // Substituir por lógica dinâmica para pegar o ID do usuário logado
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

        if (!container) {
            console.error('Elemento com id="opcao-section" não encontrado!');
            return;
        }

        let html = '';

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

        html += `<button class="submit-button" onclick="submitQuiz()">Enviar</button>`;
        container.innerHTML = html;
        console.log("Perguntas renderizadas no DOM.");
    }

    // Torne a função submitQuiz acessível globalmente
    window.submitQuiz = async function submitQuiz() {
        const answeredQuestions = Array.from(document.querySelectorAll('.questoes-box'))
            .map(box => {
                const selectedInput = box.querySelector('input[type="radio"]:checked');
                if (!selectedInput) return null;
                return {
                    id_pergunta: parseInt(selectedInput.name.replace('question', '')),
                    id_resposta: parseInt(selectedInput.value)
                };
            })
            .filter(Boolean);
    
        if (answeredQuestions.length === 0) {
            alert("Por favor, responda pelo menos uma pergunta!");
            return;
        }
    
        try {
            console.log("Dados enviados para calculateScore:", {
                id_usuario: 1, // Ajuste dinâmico conforme necessário
                respostas: answeredQuestions
            });
    
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
    // Inicializar o quiz
    console.log("Iniciando fetchQuestions");
    fetchQuestions();
});
