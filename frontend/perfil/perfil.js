document.addEventListener('DOMContentLoaded', async () => {
    const apiUrl = 'http://localhost:3006/backend/getUserData';

    async function getUserData() {
        const userId = localStorage.getItem('id'); // pegando o id que foi armazenado no localstorage
        console.log("Verificando localStorage. ID:", userId);

        //se nao tiver logado:
        if (!userId) {
            console.error("Usuário não está logado. Redirecionando para login.");
            window.location.href = "../cadastro_login/login.html";
            return;
        }

        console.log("Buscando dados para o ID do usuário:", userId);

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_usuario: parseInt(userId) })
            });

            console.log("Resposta do servidor:", response);

            if (response.ok) {
                const result = await response.json();
                console.log("Dados recebidos do servidor:", result);

                if (result.success) {
                    updateProfile(result.user.nome, result.user.email, result.user.highScore);
                } else {
                    console.warn("Erro ao buscar dados do usuário:", result.message);
                }
            } else {
                console.error("Erro na resposta do servidor. Status:", response.status);
            }
        } catch (error) {
            console.error("Erro na requisição ao servidor:", error);
        }
    }

    //atualiza o perfil com os novos dados
    function updateProfile(nome, email, highScore) {
        console.log("Atualizando perfil com dados:", { nome, email, highScore });
        document.querySelector('.profile-name').innerText = nome || "Usuário";
        document.querySelector('.profile-email').innerText = email || "Email não encontrado";
        document.querySelector('#high-score').innerText = highScore || 0;
    }

    getUserData();
});
