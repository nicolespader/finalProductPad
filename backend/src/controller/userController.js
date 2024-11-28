//importa a configuração do banco de dados
const connection = require('../config/db');

//funçao para cadastrar um novo usuário no banco de dados
async function storeUser(request, response) {

    //Extrai os itens do corpo da requisição (nome, email e senha)
    const params = [
        request.body.nome,  //nome do usuario
        request.body.email, //email do usuario
        request.body.senha  //senha do usuario
    ];

    //comando para inserir o novo usuário na tabela 'usuario'
    const query = "INSERT INTO usuario(nome,email,senha) VALUES(?,?,?);";

    // Executa o comando no banco de dados
    connection.query(query, params, (err, results) => {
        // Se houver um erro, exibe no console e retorna erro
        console.log(err)
        if (results) {
            response.status(200).json({
                success: true,
                message: "Sucesso",
                data: results
            });
        } else {
            // Caso bem-sucedido, retorna a confirmação do cadastro
            response.status(400).json({
                success: false,
                message: "Sem Sucesso",
                data: results
            });
        }
    });
}

// Função para realizar o login do usuário
async function loginUser(request, response) {
    
    // Extrai email e senha da requisiçao 
    const { email, senha } = request.body;

    // comando para buscar o usuário pelo email
    const query = "SELECT * FROM usuario WHERE email = ?";

    // Executa a consulta no banco de dados
    connection.query(query, [email], (err, results) => {
        if (err) {
            response.status(500).json({
                success: false,
                message: "Erro no servidor",
                error: err
            });
            // Verifica se algum usuário foi encontrado
        } else if (results.length > 0) {
            const user = results[0]; // Obtém o primeiro usuário encontrado

            // ve se a senha q foi colocada é a mesma que tinha sido cadastrada
            if (senha === user.senha) {
                
                //retorna sucesso se conseguir logar
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
                // Retorna erro se a senha estiver incorreta
                response.status(401).json({
                    success: false,
                    message: "Senha incorreta"
                });
            }
        } else {
            // Retorna erro se nenhum usuário for encontrado com o email fornecido
            response.status(404).json({
                success: false,
                message: "Usuário não encontrado"
            });
        }
    });
}

// Função para buscar dados de um usuário específico
async function getUserData(request, response) {
    // Extrai o ID do usuário da requisição que foi feita antes
    const { id_usuario } = request.body;

    console.log("Rota /getUserData chamada com ID:", id_usuario);

    // Verifica se o ID foi fornecido
    if (!id_usuario) {
        console.error("ID do usuário ausente");
        return response.status(400).json({
            success: false,
            message: "ID do usuário é obrigatório"
        });
    }

    // comando para buscar nome, email e maior pontuação (highScore) do usuário
    const query = "SELECT nome, email, highScore FROM usuario WHERE id = ?";
    
    // Executa a consulta no banco de dados
    connection.query(query, [id_usuario], (err, results) => {
        if (err) {
            // Retorna erro ao cliente se houver falha na consulta
            console.error("Erro ao buscar dados do usuário:", err);
            return response.status(500).json({
                success: false,
                message: "Erro ao buscar dados do usuário",
                error: err
            });
        }

        console.log("Resultados da consulta ao banco de dados:", results);

        // Verifica se algum resultado foi encontrado        
        if (results.length > 0) {
            const user = results[0]; // Obtém os dados do usuário encontrado
            console.log("Usuário encontrado:", user);

            // Retorna sucesso com os dados do usuário
            response.status(200).json({
                success: true,
                user: {
                    nome: user.nome,
                    email: user.email,
                    highScore: user.highScore || 0 //quando nao tiver highScore, retorna 0, como padrao 
                }
            });
        } else {
            // Retorna erro se o usuário não foi encontrado            
            console.warn("Usuário não encontrado para o ID:", id_usuario);
            response.status(404).json({
                success: false,
                message: "Usuário não encontrado"
            });
        }
    });
}

// Exporta as funções para serem utilizadas em outros arquivos
module.exports = {
    storeUser, //função para cadastrar um usuario
    loginUser, //funçao para fazer login
    getUserData // funçao para obter dados de um usuario especifico 
};