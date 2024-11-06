const connection = require('../config/db');

async function storeUser(request, response) {
    const params = [
        request.body.nome,
        request.body.email,
        request.body.senha
    ];

    const query = "INSERT INTO usuario(nome,email,senha) VALUES(?,?,?);";

    connection.query(query, params, (err, results) => {
        console.log(err)
        if (results) {
            response.status(200).json({
                success: true,
                message: "Sucesso",
                data: results
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Sem Sucesso",
                data: results
            });
        }
    });
}

async function loginUser(request, response) {
    const { email, senha } = request.body;

    const query = "SELECT * FROM usuario WHERE email = ?";

    connection.query(query, [email], (err, results) => {
        if (err) {
            response.status(500).json({
                success: false,
                message: "Erro no servidor",
                error: err
            });
        } else if (results.length > 0) {
            const user = results[0];

            if (senha === user.senha) {
                response.status(200).json({
                    success: true,
                    message: "Login bem-sucedido",
                    user: {
                        id: user.id,
                        nome: user.nome,
                        email: user.email
                    }
                });
            } else {
                response.status(401).json({
                    success: false,
                    message: "Senha incorreta"
                });
            }
        } else {
            response.status(404).json({
                success: false,
                message: "Usuário não encontrado"
            });
        }
    });
}

// Função para salvar o score do usuário
async function saveHighScore(request, response) {
    const { id_jogo, id_usuario, pontuacao } = request.body;
    console.log(request.body)
    // Valida se todos os parâmetros necessários foram enviados
    if (!id_jogo || !id_usuario || pontuacao === undefined) {
        return response.status(400).json({
            success: false,
            message: "Parâmetros faltando (id_jogo, id_usuario, pontuacao)"
        });
    }

    // Query para inserir o histórico de pontuação
    const query = "INSERT INTO historico(id_jogo, id_usuario, pontuacao) VALUES(?, ?, ?);";

    // Executa a query com os parâmetros fornecidos
    connection.query(query, [id_jogo, id_usuario, pontuacao], (err, results) => {
        if (err) {
            return response.status(500).json({
                success: false,
                message: "Erro ao salvar o score no banco de dados",
                error: err
            });
        }

        // Resposta de sucesso
        response.status(200).json({
            success: true,
            message: "Score salvo com sucesso",
            data: results
        });
    });
}


async function quiz(request, response) {
    const { id_usuario } = request.body;
    console.log(id_usuario);

    const query = `
    SELECT * FROM perguntas`;

    connection.query(query, [id_usuario], (err, results) => {
        if (err) {
            return response.status(500).json({
                success: false,
                message: "Erro no servidor",
                error: err
            });
        }

        // Supondo que 'results' contenha as perguntas e respostas do banco de dados
        if (results.length > 0) {
            // Inicia a construção da string HTML para o quiz
            let html = '<div id="quiz">';

            // Itera sobre cada linha de resultado obtida na consulta (array 'results')
            results.forEach(row => {
                // Para cada pergunta, cria uma seção de pergunta com opções de resposta
                html += `<div class="question">`;
                html += `<p>${row.pergunta}</p>`; // Exibe a pergunta

                // Adiciona as opções de resposta como botões ou rádio inputs
                html += `<label><input type="radio" name="question${row.id}" value="1"> ${row.opcao1}</label><br>`;
                html += `<label><input type="radio" name="question${row.id}" value="2"> ${row.opcao2}</label><br>`;
                html += `<label><input type="radio" name="question${row.id}" value="3"> ${row.opcao3}</label><br>`;
                html += `<label><input type="radio" name="question${row.id}" value="4"> ${row.opcao4}</label><br>`;

                html += `</div>`;
            });

            // Finaliza o HTML com um botão de envio para checar as respostas
            html += `<button onclick="submitQuiz()">Enviar</button>`;
            html += `</div>`;

            // Envia a string HTML do quiz como resposta
            return response.send(html);
        } else {
            // Retorna uma mensagem de erro caso não encontre perguntas
            return response.status(404).json({
                success: false,
                message: "Nenhuma pergunta encontrada no banco de dados"
            });
        }

    });
}


// fazer uma função que faça um select pegando o nome do jogo a partir do id_jogo
// fazer um return para a variavel 

module.exports = {
    storeUser,
    loginUser,
    saveHighScore,
    quiz
}
