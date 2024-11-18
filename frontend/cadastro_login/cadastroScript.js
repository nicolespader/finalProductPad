let button = document.getElementById("submit");

button.onclick = async function () {
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let confirmaSenha = document.getElementById("confirma_senha").value; // Captura o valor do campo de confirmação

    // Verificar se as senhas coincidem
    if (senha !== confirmaSenha) {
        alert("As senhas não coincidem. Por favor, tente novamente.");
        return; // Interrompe o processo de cadastro
    }

    let dados = { nome, email, senha };
    console.log(dados);

    try {
        const response = await fetch("http://localhost:3006/backend/register", { // Caminho ajustado
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(dados)
        });
        
        const results = await response.json();
        console.log(results);

        if (results.success) {
            alert("Cadastro bem-sucedido");
            window.location.href = "login.html";
        } else {
            alert("Erro no cadastro: " + results.message);
        }
    } catch (error) {
        console.error("Erro no servidor:", error);
        alert("Erro ao cadastrar. Tente novamente mais tarde.");
    }
};
