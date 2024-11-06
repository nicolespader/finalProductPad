import { checkUser } from '../DB/src/script.js'

// chama a função que somente retorna se o usuario esta logado ou não e ENTÃO, 
// se o retorno(result) for "log", ou seja, logado, salva as informações que pegamos dentro da função userCheck, 
// se não estiver logado, vai direcionar para a pagina de login 

await checkUser().then((result) => {
    // Verifica se o usuário está logado através da propriedade 'status' retornada pela função
    if (result.status === 'log') {
        // Se o usuário estiver logado, salva os dados de autenticação no objeto 'userData'
        const userData = result.userAuthData;
        
        // Exibe no console os dados de autenticação do usuário
        console.log('Usuário logado com dados de autenticação:', result.userAuthData);

        // Exibe no console os dados adicionais do usuário vindos do banco de dados
        console.log('Dados do usuário do banco de dados:', result.userData);
    } else {
        // Se o usuário não estiver logado, exibe mensagem no console e redireciona para a página de login
        console.log('Usuário não está logado, redirecionando para login');
        window.location.href = "../cadastro_login/login.html";
    }
}).catch((error) => {
    // Exibe no console uma mensagem de erro caso a verificação de login falhe
    console.error('Erro ao verificar usuário:', error);
});

