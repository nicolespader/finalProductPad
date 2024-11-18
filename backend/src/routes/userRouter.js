const router = require('express').Router();
const { storeUser, loginUser, getUserData } = require('../controller/userController');

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Usuário]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 example: "joao@example.com"
 *               senha:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *       400:
 *         description: Erro nos dados fornecidos
 */


router.post('/register', storeUser);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login de um usuário
 *     tags: [Usuário]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "joao@example.com"
 *               senha:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */


router.post('/login', loginUser); 

/**
 * @swagger
 * /getUserData:
 *   post:
 *     summary: Busca dados do usuário
 *     tags: [Usuário]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Dados do usuário retornados com sucesso
 *       404:
 *         description: Usuário não encontrado
 */


router.post('/getUserData', getUserData);

const { saveHighScore, getQuizData, calculateScore, updateHighScore} = require('../controller/quizController');

/**
 * @swagger
 * /api/save_highscore:
 *   post:
 *     summary: Salva o highscore do usuário
 *     description: Salva a pontuação máxima do usuário em um jogo.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *               pontuacao:
 *                 type: integer
 *                 example: 9999
 *     responses:
 *       200:
 *         description: Highscore salvo com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

router.post('/save_highscore', saveHighScore); 

/**
 * @swagger
 * /get/quiz:
 *   post:
 *     summary: Retorna perguntas do quiz
 *     tags: [Quiz]
 *     responses:
 *       200:
 *         description: Perguntas retornadas com sucesso
 *       500:
 *         description: Erro ao buscar perguntas
 */


router.post('/get/quiz', getQuizData);

/**
 * @swagger
 * /calculateScore:
 *   post:
 *     summary: Calcula a pontuação do usuário
 *     tags: [Quiz]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *               perguntas:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   example: 101
 *     responses:
 *       200:
 *         description: Pontuação calculada com sucesso
 *       500:
 *         description: Erro ao calcular pontuação
 */


router.post('/calculateScore', calculateScore);

/**
 * @swagger
 * /updateHighScore:
 *   post:
 *     summary: Atualiza o highscore do usuário
 *     tags: [Quiz]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *               pontuacao:
 *                 type: integer
 *                 example: 1500
 *     responses:
 *       200:
 *         description: Highscore atualizado com sucesso
 *       500:
 *         description: Erro ao atualizar highscore
 */

router.post('/updateHighScore', updateHighScore);
module.exports = router;
