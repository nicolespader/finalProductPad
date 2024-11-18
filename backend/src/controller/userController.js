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

async function getUserData(request, response) {
    const { id_usuario } = request.body;

    console.log("Rota /getUserData chamada com ID:", id_usuario);

    if (!id_usuario) {
        console.error("ID do usuário ausente");
        return response.status(400).json({
            success: false,
            message: "ID do usuário é obrigatório"
        });
    }

    const query = "SELECT nome, email, highScore FROM usuario WHERE id = ?";

    connection.query(query, [id_usuario], (err, results) => {
        if (err) {
            console.error("Erro ao buscar dados do usuário:", err);
            return response.status(500).json({
                success: false,
                message: "Erro ao buscar dados do usuário",
                error: err
            });
        }

        console.log("Resultados da consulta ao banco de dados:", results);

        if (results.length > 0) {
            const user = results[0];
            console.log("Usuário encontrado:", user);

            response.status(200).json({
                success: true,
                user: {
                    nome: user.nome,
                    email: user.email,
                    highScore: user.highScore || 0
                }
            });
        } else {
            console.warn("Usuário não encontrado para o ID:", id_usuario);
            response.status(404).json({
                success: false,
                message: "Usuário não encontrado"
            });
        }
    });
}

module.exports = {
    storeUser,
    loginUser,
    getUserData
};