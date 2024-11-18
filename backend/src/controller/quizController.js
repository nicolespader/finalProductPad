const connection = require('../config/db');
const dotenv = require('dotenv').config();

async function saveHighScore(request, response) {
    const { id_usuario, pontuacao } = request.body;

    console.log("Entrando em saveHighScore");
    console.log("Dados recebidos:", { id_usuario, pontuacao });

    if (!id_usuario || pontuacao === undefined) {
        console.warn("Parâmetros inválidos ou ausentes:", { id_usuario, pontuacao });
        return response.status(400).json({
            success: false,
            message: "Parâmetros faltando (id_usuario, pontuacao)"
        });
    }

    const query = "UPDATE usuario SET highScore = GREATEST(highScore, ?) WHERE id = ?";
    console.log("Executando query:", query);

    connection.query(query, [pontuacao, id_usuario], (err, results) => {
        if (err) {
            console.error("Erro ao atualizar highScore:", err);
            return response.status(500).json({
                success: false,
                message: "Erro ao atualizar o highScore no banco de dados",
                error: err.message
            });
        }

        console.log("HighScore atualizado com sucesso:", results);
        response.status(200).json({
            success: true,
            message: "HighScore atualizado com sucesso",
            data: results
        });
    });
}


// Função para buscar perguntas e retornar como JSON
async function getQuizData(request, response) {
    console.log("Entrando em getQuizData");

    // Query para selecionar 5 perguntas aleatórias
    const queryPerguntas = `
        SELECT 
            p.id_perguntas AS id_pergunta,
            p.ds_descricao AS pergunta
        FROM 
            pergunta p
        ORDER BY RAND()
        LIMIT 5
    `;

    console.log("Executando query de perguntas:", queryPerguntas);

    connection.query(queryPerguntas, (err, perguntasResults) => {
        if (err) {
            console.error("Erro ao buscar perguntas:", err);
            return response.status(500).json({
                success: false,
                message: "Erro ao buscar perguntas aleatórias",
                error: err.message
            });
        }

        console.log("Resultados de perguntas:", perguntasResults);

        const idsPerguntas = perguntasResults.map(pergunta => pergunta.id_pergunta);
        console.log("IDs das perguntas selecionadas:", idsPerguntas);

        if (idsPerguntas.length === 0) {
            console.warn("Nenhuma pergunta encontrada no banco.");
            return response.status(200).json({
                success: false,
                message: "Nenhuma pergunta encontrada.",
                data: []
            });
        }

        // Query para buscar as respostas relacionadas às perguntas selecionadas
        const queryRespostas = `
            SELECT 
                r.id_pergunta,
                r.id_respostas AS id_resposta,
                r.ds_resposta AS resposta,
                r.ds_certo AS correta
            FROM 
                resposta r
            WHERE 
                r.id_pergunta IN (?)
        `;

        console.log("Executando query de respostas:", queryRespostas);

        connection.query(queryRespostas, [idsPerguntas], (err, respostasResults) => {
            if (err) {
                console.error("Erro ao buscar respostas:", err);
                return response.status(500).json({
                    success: false,
                    message: "Erro ao buscar respostas para perguntas",
                    error: err.message
                });
            }

            console.log("Resultados de respostas:", respostasResults);

            // Formatar as perguntas e suas respostas
            const perguntas = perguntasResults.map(pergunta => ({
                id_pergunta: pergunta.id_pergunta,
                pergunta: pergunta.pergunta,
                respostas: respostasResults
                    .filter(resposta => resposta.id_pergunta === pergunta.id_pergunta)
                    .map(resposta => ({
                        id_resposta: resposta.id_resposta,
                        resposta: resposta.resposta,
                        correta: resposta.correta.trim().toUpperCase() === 'V' // Verifica se a resposta correta é 'V'
                    }))
            }));

            console.log("Perguntas formatadas para resposta:", perguntas);

            response.status(200).json({
                success: true,
                data: perguntas
            });
        });
    });
}

async function calculateScore(request, response) {
    const { id_usuario, respostas } = request.body;

    console.log("Dados recebidos no backend:", { id_usuario, respostas });

    if (!id_usuario || !Array.isArray(respostas) || respostas.length === 0) {
        console.warn("Parâmetros inválidos ou ausentes:", { id_usuario, respostas });
        return response.status(400).json({
            success: false,
            message: "Parâmetros faltando ou inválidos (id_usuario, respostas)"
        });
    }

    const respostasIds = respostas.map(resposta => resposta.id_resposta);

    const query = `
        SELECT r.id_respostas, r.ds_certo
        FROM resposta r
        WHERE r.id_respostas IN (?)
    `;

    console.log("Query para verificar respostas:", query);

    connection.query(query, [respostasIds], (err, results) => {
        if (err) {
            console.error("Erro ao verificar respostas corretas:", err);
            return response.status(500).json({
                success: false,
                message: "Erro ao verificar respostas corretas",
                error: err.message
            });
        }

        console.log("Resultados das respostas verificadas:", results);

        const corretas = results.filter(resposta => resposta.ds_certo.trim().toUpperCase() === 'V');
        const pontosGanhos = corretas.length * 50;

        console.log("Respostas corretas:", corretas, "Pontos ganhos:", pontosGanhos);

        const updateScoreQuery = `
            UPDATE usuario 
            SET highScore = GREATEST(highScore, ?) 
            WHERE id = ?
        `;

        console.log("Query para atualizar pontuação:", updateScoreQuery, [pontosGanhos, id_usuario]);

        connection.query(updateScoreQuery, [pontosGanhos, id_usuario], (updateErr) => {
            if (updateErr) {
                console.error("Erro ao atualizar highScore:", updateErr);
                return response.status(500).json({
                    success: false,
                    message: "Erro ao atualizar highScore no banco de dados",
                    error: updateErr.message
                });
            }

            console.log("HighScore atualizado com sucesso:", pontosGanhos);
            response.status(200).json({
                success: true,
                message: `Você acertou ${corretas.length} perguntas. Sua pontuação máxima é ${pontosGanhos}!`,
                corretas: corretas.length,
                pontosGanhos
            });
        });
    });
}


async function updateHighScore(request, response) {
    const { id_usuario, pontuacao } = request.body;

    console.log("Entrando em updateHighScore");
    console.log("Dados recebidos:", { id_usuario, pontuacao });

    if (!id_usuario || pontuacao === undefined) {
        console.warn("Parâmetros inválidos ou ausentes:", { id_usuario, pontuacao });
        return response.status(400).json({
            success: false,
            message: "Parâmetros faltando ou inválidos (id_usuario, pontuacao)"
        });
    }

    const updateScoreQuery = `
        UPDATE usuario 
        SET highScore = GREATEST(highScore, ?) 
        WHERE id = ?
    `;

    console.log("Executando query de atualização de highScore:", updateScoreQuery);

    connection.query(updateScoreQuery, [pontuacao, id_usuario], (err, results) => {
        if (err) {
            console.error("Erro ao atualizar highScore:", err);
            return response.status(500).json({
                success: false,
                message: "Erro ao atualizar highScore no banco de dados",
                error: err.message
            });
        }

        console.log("HighScore atualizado com sucesso:", results);
        response.status(200).json({
            success: true,
            message: "HighScore atualizado com sucesso!",
            data: results
        });
    });
}

module.exports = {
    saveHighScore,
    getQuizData,
    calculateScore,
    updateHighScore
};
