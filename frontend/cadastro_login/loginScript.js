let loginButton = document.getElementById("login");

loginButton.onclick = async function () {
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    let dados = { email, senha };
    console.log(dados);

    try {
        const response = await fetch("http://localhost:3006/backend/login", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(dados)
        });

        const results = await response.json();
        console.log(results);

        if (results.success) {
            alert("Login bem-sucedido");
            // Armazena os dados do usuário no LocalStorage
            localStorage.setItem('id', results.user.id);
            localStorage.setItem('name', results.user.nome);

            // Redireciona para a página principal
            window.location.href = "../tela_principal/principal.html";
        } else {
            alert("Falha no login: " + results.message);
        }
    } catch (error) {
        console.error("Erro no servidor:", error);
        alert("Erro ao fazer login. Tente novamente mais tarde.");
    }
};
