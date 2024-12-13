//Criando animação da página inicial quando a página for carregada
window.addEventListener('load', function(){
    //Criando a váriavel e adicionando o elemento 
    const anima_pagina_incial = document.getElementById('pagina_incial');
    //Adicionando a classe 'visible' após a página carregar
    setTimeout(() => {
        anima_pagina_incial.classList.add('visible'); 
    }, 500); //Pequeno delay para dar um efeito suave

    //Criando animação dos quadrados
    const numSquares = 40; //Número de quadrados
    const body = document.body;

    for (let i = 0;i < numSquares; i++){
    const square = document.createElement('div');
    square.className = 'square';
    
    //Criando posições aleatórias do quadrados
    const top = Math.random() * 100;
    const left = Math.random() * 100;

    square.style.top = `${top}%`;
    square.style.left = `${left}%`;

    //Adicionando um delay aleatório a animação
    const delay = Math.random() * 2; //Até 2 segundos
    square.style.animationDelay = `${delay}s`;

    //Define "X" ou "O" aleatoriamente
    square.textContent = Math.random() > 0.5 ? 'X' : 'O';

    //Adicionando ao body
    body.appendChild(square);

    }

});

//Variaveis para armazenar os nomes dos jogadores
let nomeJogador1 = '';
let nomeJogador2 = '';

$(document).ready(function(){
    $('#button_iniciar_jogo').click(function(){
        //Criando um efeito de slide após clicar no botão iniciar
        $('#pagina_incial').animate({marginTop: '-10px'}, 1000);
        $('#game').animate({marginTop: '5em'}, 800);

        //Validando o Apelido dos jogadores
        if($('#entrada_nome_jogador_1').val() == ''){
            alert('O apelido do jogador 1 não foi preenchido');
            return false
        }
        
        if($('#entrada_nome_jogador_2').val() == ''){
            alert('O apelido do jogador 2 não foi preenchido');
            return false
        }

        //Controlando a visualização das div's
        $('#pagina_incial').hide();
        $('#game').show();

        //Controlando a visualização das imagens dos jogadores
        $('.container_jogador1').show();
        $('.container_jogador2').show();

        //Exibindo o apelido dos jogadores
        $('#nome_jogador_1').html($('#entrada_nome_jogador_1').val());
        $('#nome_jogador_2').html($('#entrada_nome_jogador_2').val());

        //Definindo o array do tabuleiro e o jogador inicial
        let nomeJogador1 = $('#entrada_nome_jogador_1').val();
        let nomeJogador2 = $('#entrada_nome_jogador_2').val();
        let tabuleiro = Array(9).fill(null); // Um array com 9 posições vazias
        let jogadorAtual = "X"; // Jogador começa como "X"
        

        //Definindo as combinações vencedoras
        const combinacoesVencedoras = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
            [0, 4, 8], [2, 4, 6]             // Diagonais
        ];

        //Função para alternar entre os jogadores
        function alternarJogador() {
            jogadorAtual = jogadorAtual === "X" ? "O" : "X"; //Operador Tenário if...else
        }

        // Função para exibir o nome do vencedor
        function exibirVencedor() {
        const vencedor = jogadorAtual === "X" ? nomeJogador1 : nomeJogador2;
        $('#winner-message').text(`Parabéns, ${vencedor}! Você venceu!`);
        }

        //Função para verificar vitória
        function verificarVitoria() {
            for (let combinacao of combinacoesVencedoras) {
                const [a, b, c] = combinacao;
                if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
                    exibirVencedor();
                    return true; // Há um vencedor
                }
            }
            return false; //Nenhum vencedor
        }
        
        //Função para lidar com as jogadas
        $(".cell").click(function() {
            const index = $(this).index(); //Identifique o índice do botão clicado

            if (!tabuleiro[index]) { //Se a célula estiver vazia
                tabuleiro[index] = jogadorAtual;
                $(this).text(jogadorAtual); //Atualize o tabuleiro visualmente
                
                if (verificarVitoria()) {
                    $('#winner-screen').show(); //Mostra a mensagem de vitoria e botão de reinício 
                    $('#botao_voltar').show(); //Mostra o botão de voltar
                    return;
                }

                alternarJogador(); // Muda para o próximo jogador
            }
        });

        //Evento de clique para o botão voltar
        $('#voltar_inicio').click(function(){
            //Função para voltar a página principal
            $('#game').hide();
            $('#pagina_incial').show();

            //Função para limpar o contéudo visual do tabuleiro
            $(".cell").text(""); //Limpa todos os textos das células    

            //Função para resetar o jogo e limpar o tabuleiro
            tabuleiro.fill(null); //Zera o array do tabuleiro
            jogadorAtual = "X"; //Define o jogador inicial como "X"
            $('#winner-screen').hide(); //Esconde o botão reinício
            $('#winner-message').text(''); 
            $('#botao_voltar').hide(); //Esconde o botão voltar
            $('.container_jogador1').hide(); //Esconde a imagem e o nome do jogador 1
            $('.container_jogador2').hide(); //Esconde a imagem e o nome do jogador 2

            //Criando um efeito de slide após clicar no botão iniciar
            $('#pagina_incial').animate({marginTop: '-10px'}, 1000);
            $('#game').animate({marginTop: '5em'}, 800);
        });
        
        //Evento de clique para o botão de reinício
        $("#restart-btn").click(function(){
            //Função para limpar o contéudo visual do tabuleiro
            $(".cell").text(""); //Limpa todos os textos das células

            //Função para resetar o jogo
            tabuleiro.fill(null); //Zera o array do tabuleiro
            jogadorAtual = "X"; //Define o jogador inicial como "X"
            $('#winner-screen').hide(); //Esconde o botão de reinício
            $('#winner-message').text('');
            $('#botao_voltar').hide(); //Esconde o botão voltar
        });
    });
});
