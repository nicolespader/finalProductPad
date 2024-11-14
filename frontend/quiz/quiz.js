document.addEventListener('DOMContentLoaded', () => {
    async function fetchQuestions() {
        try {
            const response = await fetch(`http://localhost:3006/api/getPerguntras`);
            if (response.ok) {
                const htmlContent = await response.text();
                document.getElementById('opcao-section').innerHTML = htmlContent;

                // Add click event listeners to options after they load
                document.querySelectorAll('.opcao-box').forEach(option => {
                    option.addEventListener('click', function () {
                        const parentDiv = this.closest('.questoes-box');
                        // Remove 'selected' class from all options in the same question
                        parentDiv.querySelectorAll('.opcao-box').forEach(opt => opt.classList.remove('selected'));
                        // Add 'selected' class to clicked option
                        this.classList.add('selected');
                    });
                });
            } else {
                document.getElementById('opcao-section').innerHTML = '<p>Erro ao carregar perguntas.</p>';
            }
        } catch (error) {
            console.error('Erro:', error);
            document.getElementById('opcao-section').innerHTML = '<p>Erro no servidor.</p>';
        }
    }

    fetchQuestions();
});