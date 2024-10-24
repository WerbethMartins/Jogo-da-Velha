//Criando animação da página inicial quando a página for carregada
window.addEventListener('load', function(){
    //Criando a váriavel e adicionando o elemento 
    const anima_pagina_incial = document.getElementById('pagina_incial');
    //Adicionando a classe 'visible' após a página carregar
    setTimeout(() => {
        anima_pagina_incial.classList.add('visible'); 
    }, 500); //Pequeno delay para dar um efeito suave
});

//Criando variaveis e atribuindo valores
var rodada = 1;
var matriz_jogo = Array(3);

//Criando Matriz Bi-dimensional
    //Criando Arrays das posições A, B, C
    matriz_jogo['A'] = Array(3);
    matriz_jogo['B'] = Array(3);
    matriz_jogo['C'] = Array(3);

    //Referenciando o array de cada linha e seus valores
    matriz_jogo['A'][1] = 0;
    matriz_jogo['A'][2] = 0;
    matriz_jogo['A'][3] = 0;

    matriz_jogo['B'][1] = 0;
    matriz_jogo['B'][2] = 0;
    matriz_jogo['B'][3] = 0;

    matriz_jogo['C'][1] = 0;
    matriz_jogo['C'][2] = 0;
    matriz_jogo['C'][3] = 0;

$(document).ready(function(){
    $('#button_iniciar_jogo').click(function(){
        //Criando um efeito de slide após clicar no botão iniciar
        $('#pagina_incial').animate({marginTop: '-10px'}, 1000);
        $('#palco_jogo').animate({marginTop: '5em'}, 800);

        //Validando o Apelido dos jogadores
        if($('#entrada_nome_jogador_1').val() == ''){
            alert('O apelido do jogador 1 não foi preenchido');
            return false
        }
        
        if($('#entrada_nome_jogador_2').val() == ''){
            alert('O apelido do jogador 2 não foi preenchido');
            return false
        }

        //Exibindo o apelido dos jogadores
        $('#nome_jogador_1').html($('#entrada_nome_jogador_1').val());
        $('#nome_jogador_2').html($('#entrada_nome_jogador_2').val());

        //Controlando a visualização das div's
        $('#pagina_incial').hide();
        $('#palco_jogo').show();

    });

    //Recuperando o clique e atribuindo valores das jogadas
    $('.jogada').click(function(){
       var id_campo_clicado = this.id;
       $('#'+id_campo_clicado).off(); //Função usada para limpar o evento de click
       jogada(id_campo_clicado);
    });

    //Atribuindo valores e inserindo icones X e O de cada jogada
    function jogada(id){
        var icone = '';
        var ponto = 0;

        if((rodada % 2) == 1){
            icone = 'url("img/Icone_X.png")';
            ponto = -1;
        } else {
            icone = 'url("img/Icone_O.png")';
            ponto = 1;
        }
        rodada++;

        $('#'+id).css('background-image', icone); 

        //Usando o metodo Splint para quebrar o array da string
        var linha_coluna = id.split('-');
        matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;

        //Atribuindo a função 'verifica_combinacao' da verificação de pontos
        verifica_combinacao();
    }

    //Verificação para marcar os pontos por posição.
    function verifica_combinacao(){
        //Posição Horizontal Linha A
        var pontos = 0; //Variavel pontos criada para a contagem dos pontos marcados
        for(var i = 1; i <= 3; i++){
            pontos = pontos + matriz_jogo['A'][i];
        }
        ganhador(pontos);

        //Posição Horizontal linha B
        pontos = 0; //Váriavel zerada para não marcar pontos a todo momento.
        for(var i = 1; i <=3; i++) {
            pontos = pontos + matriz_jogo['B'][i];
        }
        ganhador(pontos);

        //Posição Horizontal linha C
        pontos = 0; 
        for(var i = 1; i <=3; i++) {
            pontos = pontos + matriz_jogo['C'][i];
        }
        ganhador(pontos);

        //Posição Vertical
        for(var l = 1; l <=3; l++){
            pontos = 0
            pontos += matriz_jogo['A'][1];
            pontos += matriz_jogo['B'][1];
            pontos += matriz_jogo['C'][1];
            ganhador(pontos);

            pontos = 0
            pontos += matriz_jogo['A'][2];
            pontos += matriz_jogo['B'][2];
            pontos += matriz_jogo['C'][2];
            ganhador(pontos);

            pontos = 0
            pontos += matriz_jogo['A'][3];
            pontos += matriz_jogo['B'][3];
            pontos += matriz_jogo['C'][3];
            ganhador(pontos);
        }  
        
         //Posição Diagonal
         pontos = 0
         pontos = matriz_jogo['A'][1] + matriz_jogo['B'][2] + matriz_jogo['C'][3];
         ganhador(pontos);

         pontos = 0
         pontos = matriz_jogo['A'][3] + matriz_jogo['B'][2] + matriz_jogo['C'][1];
         ganhador(pontos);

    }

    //Verificação de ganho por base de pontos para cada jogador
    function ganhador(pontos){ //Recebe a váriavel pontos
        if(pontos == -3) {
        var jogador_1 = $('#entrada_nome_jogador_1').val();
        $("#vencedor").text("Parabéns " + jogador_1 + ", você venceu!");

        // Mostrar a div #vencedor
        $("#mensagemVencedor").show();
            $('.jogada').off();
            
        } else if (pontos == 3){
            var jogador_2 = $('#entrada_nome_jogador_2').val();
            $("#vencedor").text("Parabéns " + jogador_2 + ", você venceu!");

            // Mostrar a div #vencedor
            $("#mensagemVencedor").show();
            $('.jogada').off();
        } 
    }
});
