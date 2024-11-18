document.addEventListener('DOMContentLoaded', () => {
    const redirectTo = (url) => {
        window.location.href = url;
    };

    // Recuperar o nome do usuário do localStorage
    const perfilButton = document.querySelector('.perfil-button');
    const userName = localStorage.getItem('name'); // Buscar o nome do usuário no localStorage

    if (userName && userName.trim() !== "") {
        // Define o nome no botão de perfil
        perfilButton.textContent = userName;

        // Redirecionar para o perfil ao clicar
        perfilButton.addEventListener('click', () => {
            redirectTo('../perfil/perfil.html');
        });
    } else {
        // Caso não tenha um usuário logado, exibir "Login"
        perfilButton.textContent = "Login";

        // Redirecionar para o login ao clicar
        perfilButton.addEventListener('click', () => {
            redirectTo('../cadastro_login/login.html');
        });
    }

    // Botão de ajuda
    document.querySelector('.ajuda-button').addEventListener('click', () => {
        redirectTo('../perfil_ajuda/ajuda.html');
    });

    // Botões principais
    document.querySelector('.quiz-button').addEventListener('click', () => {
        redirectTo('../quiz/index.html');
    });

    document.querySelector('.info-button').addEventListener('click', () => {
        redirectTo('../informacao/info.html');
    });

    document.querySelector('.cores-button').addEventListener('click', () => {
        redirectTo('../paletas_cor/padleta.html');
    });
});

