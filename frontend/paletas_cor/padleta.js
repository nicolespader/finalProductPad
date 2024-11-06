// Adiciona um evento de clique ao botão com ID 'drawButton'
document.getElementById('drawButton').addEventListener('click', function() {

    // Obtém o valor selecionado do campo "público-alvo" com o ID 'targetAudience'
    const targetAudience = document.getElementById('targetAudience').value;

    // Obtém o valor selecionado do campo "produto" com o ID 'product'
    const product = document.getElementById('product').value;

    // Obtém o valor selecionado do campo "área de mercado" com o ID 'marketArea'
    const marketArea = document.getElementById('marketArea').value;

    // Chama a função generateColorPalette passando os valores obtidos dos campos
    // A função retorna uma paleta de cores baseada nas seleções
    let colors = generateColorPalette(targetAudience, product, marketArea);

    // Exibe a paleta de cores gerada na tela chamando a função displayPalette
    displayPalette(colors);
});

// Função que gera uma paleta de cores com base no público-alvo, produto e área de mercado selecionados
function generateColorPalette(audience, product, market) {
    // Inicializa um array vazio para armazenar as cores correspondentes
    let colors = [];


    // Adolescentes
    if (audience === 'adolescentes' && product === 'roupas' && market === 'varejo') {
        colors = ['#FF69B4', '#FFC0CB', '#FF1493'];
    } else if (audience === 'adolescentes' && product === 'roupas' && market === 'serviços') {
        colors = ['#8A2BE2', '#9370DB', '#4B0082'];
    } else if (audience === 'adolescentes' && product === 'roupas' && market === 'educação') {
        colors = ['#FFD700', '#FFA500', '#FF8C00'];
    } else if (audience === 'adolescentes' && product === 'roupas' && market === 'saúde') {
        colors = ['#32CD32', '#228B22', '#006400'];

    } else if (audience === 'adolescentes' && product === 'tecnologia' && market === 'varejo') {
        colors = ['#4682B4', '#5F9EA0', '#6495ED'];
    } else if (audience === 'adolescentes' && product === 'tecnologia' && market === 'serviços') {
        colors = ['#FFD700', '#FFA500', '#FF8C00'];
    } else if (audience === 'adolescentes' && product === 'tecnologia' && market === 'educação') {
        colors = ['#FF4500', '#FF6347', '#CD5C5C'];
    } else if (audience === 'adolescentes' && product === 'tecnologia' && market === 'saúde') {
        colors = ['#00CED1', '#20B2AA', '#48D1CC'];

    } else if (audience === 'adolescentes' && product === 'alimentos' && market === 'varejo') {
        colors = ['#FF6347', '#FF4500', '#CD5C5C'];
    } else if (audience === 'adolescentes' && product === 'alimentos' && market === 'serviços') {
        colors = ['#32CD32', '#228B22', '#006400'];
    } else if (audience === 'adolescentes' && product === 'alimentos' && market === 'educação') {
        colors = ['#FFD700', '#FFA500', '#FF8C00'];
    } else if (audience === 'adolescentes' && product === 'alimentos' && market === 'saúde') {
        colors = ['#8A2BE2', '#9370DB', '#4B0082'];

    } else if (audience === 'adolescentes' && product === 'cosmeticos' && market === 'varejo') {
        colors = ['#FF69B4', '#FFC0CB', '#FF1493'];
    } else if (audience === 'adolescentes' && product === 'cosmeticos' && market === 'serviços') {
        colors = ['#8B008B', '#FF00FF', '#C71585'];
    } else if (audience === 'adolescentes' && product === 'cosmeticos' && market === 'educação') {
        colors = ['#4169E1', '#4682B4', '#1E90FF'];
    } else if (audience === 'adolescentes' && product === 'cosmeticos' && market === 'saúde') {
        colors = ['#FFB6C1', '#FF69B4', '#FF1493'];

    // Adultos
    } else if (audience === 'adultos' && product === 'roupas' && market === 'varejo') {
        colors = ['#A52A2A', '#D2691E', '#8B4513'];
    } else if (audience === 'adultos' && product === 'roupas' && market === 'serviços') {
        colors = ['#4682B4', '#5F9EA0', '#1E90FF'];
    } else if (audience === 'adultos' && product === 'roupas' && market === 'educação') {
        colors = ['#8B0000', '#B22222', '#FF6347'];
    } else if (audience === 'adultos' && product === 'roupas' && market === 'saúde') {
        colors = ['#32CD32', '#228B22', '#006400'];

    } else if (audience === 'adultos' && product === 'tecnologia' && market === 'varejo') {
        colors = ['#00CED1', '#20B2AA', '#48D1CC'];
    } else if (audience === 'adultos' && product === 'tecnologia' && market === 'serviços') {
        colors = ['#FFD700', '#FFA500', '#FF8C00'];
    } else if (audience === 'adultos' && product === 'tecnologia' && market === 'educação') {
        colors = ['#FF4500', '#FF6347', '#CD5C5C'];
    } else if (audience === 'adultos' && product === 'tecnologia' && market === 'saúde') {
        colors = ['#4682B4', '#5F9EA0', '#6495ED'];

    } else if (audience === 'adultos' && product === 'alimentos' && market === 'varejo') {
        colors = ['#FF6347', '#FF4500', '#CD5C5C'];
    } else if (audience === 'adultos' && product === 'alimentos' && market === 'serviços') {
        colors = ['#32CD32', '#228B22', '#006400'];
    } else if (audience === 'adultos' && product === 'alimentos' && market === 'educação') {
        colors = ['#FFD700', '#FFA500', '#FF8C00'];
    } else if (audience === 'adultos' && product === 'alimentos' && market === 'saúde') {
        colors = ['#8A2BE2', '#9370DB', '#4B0082'];

    } else if (audience === 'adultos' && product === 'cosmeticos' && market === 'varejo') {
        colors = ['#FF69B4', '#FFC0CB', '#FF1493'];
    } else if (audience === 'adultos' && product === 'cosmeticos' && market === 'serviços') {
        colors = ['#8B008B', '#FF00FF', '#C71585'];
    } else if (audience === 'adultos' && product === 'cosmeticos' && market === 'educação') {
        colors = ['#4169E1', '#4682B4', '#1E90FF'];
    } else if (audience === 'adultos' && product === 'cosmeticos' && market === 'saúde') {
        colors = ['#FFB6C1', '#FF69B4', '#FF1493'];

    // Crianças
    } else if (audience === 'crianças' && product === 'roupas' && market === 'varejo') {
        colors = ['#FFD700', '#FFA500', '#FF8C00'];
    } else if (audience === 'crianças' && product === 'roupas' && market === 'serviços') {
        colors = ['#32CD32', '#228B22', '#006400'];
    } else if (audience === 'crianças' && product === 'roupas' && market === 'educação') {
        colors = ['#FF6347', '#FF4500', '#CD5C5C'];
    } else if (audience === 'crianças' && product === 'roupas' && market === 'saúde') {
        colors = ['#FF69B4', '#FFC0CB', '#FF1493'];

    } else if (audience === 'crianças' && product === 'tecnologia' && market === 'varejo') {
        colors = ['#00CED1', '#20B2AA', '#48D1CC'];
    } else if (audience === 'crianças' && product === 'tecnologia' && market === 'serviços') {
        colors = ['#6A5ACD', '#483D8B', '#7B68EE'];
    } else if (audience === 'crianças' && product === 'tecnologia' && market === 'educação') {
        colors = ['#B22222', '#FF6347', '#CD5C5C'];
    } else if (audience === 'crianças' && product === 'tecnologia' && market === 'saúde') {
        colors = ['#7FFF00', '#32CD32', '#ADFF2F'];

    // Idosos
    } else if (audience === 'idosos' && product === 'roupas' && market === 'varejo') {
        colors = ['#808080', '#A9A9A9', '#696969'];
    } else if (audience === 'idosos' && product === 'roupas' && market === 'serviços') {
        colors = ['#B0C4DE', '#87CEEB', '#4682B4'];
    } else if (audience === 'idosos' && product === 'roupas' && market === 'educação') {
        colors = ['#B8860B', '#DAA520', '#FFD700'];
    } else if (audience === 'idosos' && product === 'roupas' && market === 'saúde') {
        colors = ['#FF69B4', '#FFC0CB', '#FF1493'];

    } else if (audience === 'idosos' && product === 'tecnologia' && market === 'varejo') {
        colors = ['#4682B4', '#5F9EA0', '#1E90FF'];
    } else if (audience === 'idosos' && product === 'tecnologia' && market === 'serviços') {
        colors = ['#FF4500', '#FF6347', '#CD5C5C'];
    } else if (audience === 'idosos' && product === 'tecnologia' && market === 'educação') {
        colors = ['#6A5ACD', '#483D8B', '#7B68EE'];
    } else if (audience === 'idosos' && product === 'tecnologia' && market === 'saúde') {
        colors = ['#B0C4DE', '#87CEEB', '#4682B4'];

    }

    return colors;
}

// Função que exibe a paleta de cores na tela
function displayPalette(colors) {
    // Obtém o elemento com ID 'paletteDisplay' onde a paleta será exibida
    const paletteDisplay = document.getElementById('paletteDisplay');

    // Limpa o conteúdo existente dentro do 'paletteDisplay' para exibir uma nova paleta
    paletteDisplay.innerHTML = '';

    // Para cada cor no array 'colors', cria um bloco de cor e o exibe
    colors.forEach(color => {
        // Cria um elemento 'div' para representar uma cor na paleta
        const colorBox = document.createElement('div');

        // Define a cor de fundo do 'colorBox' para a cor atual do array
        colorBox.style.backgroundColor = color;

        // Define a largura e altura do 'colorBox' para que tenha um tamanho de 100x100 pixels
        colorBox.style.width = '100px';
        colorBox.style.height = '100px';

        // Define o 'display' como 'inline-block' para que os blocos fiquem lado a lado
        colorBox.style.display = 'inline-block';

        // Define uma margem de 5px entre cada bloco de cor
        colorBox.style.margin = '5px';

        // Adiciona o 'colorBox' ao elemento 'paletteDisplay' para exibi-lo na tela
        paletteDisplay.appendChild(colorBox);
    });
}
