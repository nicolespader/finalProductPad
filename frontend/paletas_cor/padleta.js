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
        colors = ['#FF69B4', '#00BFFF', '#FFFF00'];
    } else if (audience === 'adolescentes' && product === 'roupas' && market === 'serviços') {
        colors = ['#8A2BE2', '#FF7F00', '#D3D3D3'];
    } else if (audience === 'adolescentes' && product === 'roupas' && market === 'educação') {
        colors = ['#FFD700', '#1E90FF', '#FF6347'];
    } else if (audience === 'adolescentes' && product === 'roupas' && market === 'saúde') {
        colors = ['#32CD32', '#87CEFA', '#D8BFD8'];

    } else if (audience === 'adolescentes' && product === 'tecnologia' && market === 'varejo') {
        colors = ['#1E90FF', '#32CD32', '#FFD700'];  // Azul vibrante (tecnologia e confiança), verde limão (energia e inovação), amarelo (energia e atratividade)
    } else if (audience === 'adolescentes' && product === 'tecnologia' && market === 'serviços') {
        colors = ['#8A2BE2', '#FF4500', '#FF6347'];  // Roxo (criatividade e modernidade), laranja vibrante (energia e entusiasmo), vermelho alaranjado (excitante)
    } else if (audience === 'adolescentes' && product === 'tecnologia' && market === 'educação') {
        colors = ['#4682B4', '#FFD700', '#00CED1'];  // Azul (confiança e segurança), dourado (valorização e foco), ciano (frescor e modernidade)
    } else if (audience === 'adolescentes' && product === 'tecnologia' && market === 'saúde') {
        colors = ['#32CD32', '#00CED1', '#20B2AA'];  // Verde (saúde e bem-estar), ciano (tranquilidade e tecnologia), azul claro (serenidade e confiança)
    
    } else if (audience === 'adolescentes' && product === 'alimentos' && market === 'varejo') {
        colors = ['#FF6347', '#FF4500', '#CD5C5C'];  // Vermelho (estímulo ao apetite), laranja (energia e excitação), vermelho mais suave (atração)
    } else if (audience === 'adolescentes' && product === 'alimentos' && market === 'serviços') {
        colors = ['#FF69B4', '#32CD32', '#006400'];  // Rosa vibrante (atração e jovialidade), verde (frescura e saúde), verde escuro (naturalidade)
    } else if (audience === 'adolescentes' && product === 'alimentos' && market === 'educação') {
        colors = ['#FFD700', '#FFA500', '#FF8C00'];  // Dourado (valorização e energia), laranja (entusiasmo), laranja escuro (motivação)
    } else if (audience === 'adolescentes' && product === 'alimentos' && market === 'saúde') {
        colors = ['#FF69B4', '#9370DB', '#4B0082'];  // Rosa (atraente e juvenil), roxo claro (tranquilidade), roxo escuro (saúde e bem-estar)
    
    } else if (audience === 'adolescentes' && product === 'cosmeticos' && market === 'varejo') {
        colors = ['#FF69B4', '#FFC0CB', '#FF1493'];  // Rosa vibrante (atração jovem), rosa claro (doçura e delicadeza), rosa intenso (energia)
    } else if (audience === 'adolescentes' && product === 'cosmeticos' && market === 'serviços') {
        colors = ['#FF69B4', '#FF00FF', '#C71585'];  // Rosa vibrante (chamativo e atraente), roxo (estilo e criatividade), fúcsia (luxo e intensidade)
    } else if (audience === 'adolescentes' && product === 'cosmeticos' && market === 'educação') {
        colors = ['#FF69B4', '#4682B4', '#1E90FF'];  // Rosa (atraente e juvenil), azul médio (calmante e confiável), azul brilhante (motivação e entusiasmo)
    } else if (audience === 'adolescentes' && product === 'cosmeticos' && market === 'saúde') {
        colors = ['#FF69B4', '#FF69B4', '#FF1493'];  // Rosa vibrante e suave (associado à beleza e saúde jovem), criando uma conexão emocional

    // Adultos
    } else if (audience === 'adultos' && product === 'roupas' && market === 'varejo') {
        colors = ['#003366', '#D2691E', '#8B4513'];  // Azul escuro (profissionalismo e confiança), marrom avermelhado (elegância e sofisticação), marrom (estabilidade e acolhimento)
    } else if (audience === 'adultos' && product === 'roupas' && market === 'serviços') {
        colors = ['#003366', '#5F9EA0', '#1E90FF'];  // Azul escuro (confiança), azul acinzentado (modernidade e tranquilidade), azul brilhante (energia e confiança)
    } else if (audience === 'adultos' && product === 'roupas' && market === 'educação') {
        colors = ['#003366', '#B22222', '#FF6347'];  // Azul escuro (autoridade e confiança), vermelho tijolo (seriedade), vermelho tomate (dinamicidade e energia)
    } else if (audience === 'adultos' && product === 'roupas' && market === 'saúde') {
        colors = ['#003366', '#228B22', '#006400'];  // Azul escuro (calma e confiança), verde floresta (equilíbrio e natureza), verde escuro (saúde e estabilidade)

    } else if (audience === 'adultos' && product === 'tecnologia' && market === 'varejo') {
        colors = ['#003366', '#20B2AA', '#48D1CC'];  // Azul escuro (confiança e seriedade), verde claro (inovação e frescor), azul médio (tecnologia e frescor)
    } else if (audience === 'adultos' && product === 'tecnologia' && market === 'serviços') {
        colors = ['#003366', '#FFA500', '#FF8C00'];  // Azul escuro (confiança e segurança), laranja (energia e entusiasmo), laranja queimado (atenção e inovação)
    } else if (audience === 'adultos' && product === 'tecnologia' && market === 'educação') {
        colors = ['#003366', '#FF6347', '#CD5C5C'];  // Azul escuro (autoridade e profissionalismo), vermelho tomate (dinamismo e ação), vermelho suave (energia e atenção)
    } else if (audience === 'adultos' && product === 'tecnologia' && market === 'saúde') {
        colors = ['#003366', '#5F9EA0', '#6495ED'];  // Azul escuro (confiança), azul acinzentado (tranquilidade e modernidade), azul claro (saúde e clareza)
    

    } else if (audience === 'adultos' && product === 'alimentos' && market === 'varejo') {
        colors = ['#FF6347', '#FF4500', '#CD5C5C'];  // Vermelho tomate (associado ao apetite), laranja (energia e entusiasmo), vermelho intenso (urgência e apelo)
    } else if (audience === 'adultos' && product === 'alimentos' && market === 'serviços') {
        colors = ['#32CD32', '#228B22', '#006400'];  // Verde claro (frescura e naturalidade), verde escuro (saúde e equilíbrio), verde profundo (segurança e saúde)
    } else if (audience === 'adultos' && product === 'alimentos' && market === 'educação') {
        colors = ['#FFD700', '#FFA500', '#FF8C00'];  // Amarelo dourado (otimismo e felicidade), laranja (energia e entusiasmo), laranja queimado (atenção e criatividade)
    } else if (audience === 'adultos' && product === 'alimentos' && market === 'saúde') {
        colors = ['#8A2BE2', '#9370DB', '#4B0082'];  // Roxo (associado à saúde mental e bem-estar), lavanda (calma e equilíbrio), roxo escuro (sofisticação e confiança)
    

    } else if (audience === 'adultos' && product === 'cosmeticos' && market === 'varejo') {
        colors = ['#FF69B4', '#FFC0CB', '#FF1493'];  // Rosa quente (energia e paixão), rosa claro (suavidade e elegância), vermelho intenso (atuação marcante e sedução)
    } else if (audience === 'adultos' && product === 'cosmeticos' && market === 'serviços') {
        colors = ['#8B008B', '#FF00FF', '#C71585'];  // Roxo escuro (sofisticação e mistério), fúcsia (criatividade e energia), magenta (expressão e ousadia)
    } else if (audience === 'adultos' && product === 'cosmeticos' && market === 'educação') {
        colors = ['#4169E1', '#4682B4', '#1E90FF'];  // Azul royal (confiança e seriedade), azul aço (profissionalismo e tranquilidade), azul dodger (energia e jovialidade)
    } else if (audience === 'adultos' && product === 'cosmeticos' && market === 'saúde') {
        colors = ['#FFB6C1', '#FF69B4', '#FF1493'];  // Rosa claro (suavidade e cuidados), rosa quente (atração e paixão), vermelho intenso (conexão emocional e cuidados pessoais)
    

    // Crianças
    } else if (audience === 'crianças' && product === 'roupas' && market === 'varejo') {
        colors = ['#FFD700', '#FFA500', '#FF8C00'];  // Amarelo dourado (alegria e energia), laranja (diversão e vivacidade), laranja queimado (empolgação e calor)
    } else if (audience === 'crianças' && product === 'roupas' && market === 'serviços') {
        colors = ['#32CD32', '#228B22', '#006400'];  // Verde claro (frescura e tranquilidade), verde floresta (segurança e naturalidade), verde escuro (calma e harmonia)
    } else if (audience === 'crianças' && product === 'roupas' && market === 'educação') {
        colors = ['#FF6347', '#FF4500', '#CD5C5C'];  // Vermelho tomate (entusiasmo e estímulo), vermelho laranja (energia e calor), rosa (delicadeza e suavidade)
    } else if (audience === 'crianças' && product === 'roupas' && market === 'saúde') {
        colors = ['#FF69B4', '#FFC0CB', '#FF1493'];  // Rosa quente (energia e acolhimento), rosa claro (suavidade e cuidado), vermelho intenso (emotividade e afeto)


    } else if (audience === 'crianças' && product === 'tecnologia' && market === 'varejo') {
        colors = ['#00CED1', '#20B2AA', '#48D1CC'];  // Cores refrescantes e vivas (turquesa, verde-água), que transmitem frescor, diversão e modernidade, ideais para atrair a atenção das crianças no varejo.
    } else if (audience === 'crianças' && product === 'tecnologia' && market === 'serviços') {
        colors = ['#6A5ACD', '#483D8B', '#7B68EE'];  // Roxo e lilás são cores criativas e cativantes, que remetem a um ambiente de imaginação e inovação, adequadas para serviços relacionados a tecnologia para crianças.
    } else if (audience === 'crianças' && product === 'tecnologia' && market === 'educação') {
        colors = ['#B22222', '#FF6347', '#CD5C5C'];  // Vermelho tomate (energia e estímulo), laranja (criação de interesse) e rosa (acolhimento), criando um ambiente educacional envolvente e dinâmico para as crianças.
    } else if (audience === 'crianças' && product === 'tecnologia' && market === 'saúde') {
        colors = ['#7FFF00', '#32CD32', '#ADFF2F'];  // Verde limão (frescura), verde claro (saúde e bem-estar), e amarelo verde (energia positiva), cores que passam confiança e bem-estar no contexto de saúde infantil.
    

    // Idosos
    } else if (audience === 'idosos' && product === 'roupas' && market === 'varejo') {
        colors = ['#808080', '#A9A9A9', '#696969']; // Tons neutros de cinza, que são mais sóbrios e elegantes, transmitindo serenidade e conforto, adequados para o público idoso no varejo.
    } else if (audience === 'idosos' && product === 'roupas' && market === 'serviços') {
        colors = ['#B0C4DE', '#87CEEB', '#4682B4']; // Azul claro e azul bebê, cores suaves e tranquilas que trazem uma sensação de confiança e segurança, ideais para serviços voltados para idosos.
    } else if (audience === 'idosos' && product === 'roupas' && market === 'educação') {
        colors = ['#B8860B', '#DAA520', '#FFD700']; // Tons de dourado e âmbar, cores que transmitem sabedoria, experiência e conforto, perfeitas para o mercado de educação para idosos.
    } else if (audience === 'idosos' && product === 'roupas' && market === 'saúde') {
        colors = ['#FF69B4', '#FFC0CB', '#FF1493']; // Rosa suave, cores acolhedoras e reconfortantes que transmitem cuidado, calma e empatia, características essenciais para saúde de idosos.

    } else if (audience === 'idosos' && product === 'tecnologia' && market === 'varejo') {
        colors = ['#4682B4', '#5F9EA0', '#1E90FF']; // Azul e tons de azul suaves, cores que transmitem confiabilidade e modernidade, ideais para tecnologia voltada para idosos no varejo.
    } else if (audience === 'idosos' && product === 'tecnologia' && market === 'serviços') {
        colors = ['#FF4500', '#FF6347', '#CD5C5C']; // Cores mais vibrantes, como laranja e vermelho, que atraem atenção, trazendo um toque de energia e vitalidade aos serviços tecnológicos.
    } else if (audience === 'idosos' && product === 'tecnologia' && market === 'educação') {
        colors = ['#6A5ACD', '#483D8B', '#7B68EE']; // Roxo e lilás, cores que passam uma sensação de tranquilidade e sabedoria, perfeitas para educação em tecnologia para idosos.
    } else if (audience === 'idosos' && product === 'tecnologia' && market === 'saúde') {
        colors = ['#B0C4DE', '#87CEEB', '#4682B4']; // Tons de azul claro, cores associadas à calma, confiança e clareza, perfeitas para o uso de tecnologia voltada para a saúde dos idosos.

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
