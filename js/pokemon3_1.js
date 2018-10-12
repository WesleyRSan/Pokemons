$(document).ready(function(){

    // Transformar primeira letra em maiuscula
    maiuscula = (text) => text.charAt(0).toUpperCase()+text.slice(1);

    // Excluir Pokemons
    $("#listagem").on('click', '.excluir', function(event) {
        const index = $(this).attr('href');
        $(`#pokemon-${index}`).remove();
        event.preventDefault();
    });

    // Funcao Recarregar Listagem
    $('body').on('click', '.recarregar', function(){
        showPokemon(pokemons) 
    })

    // Recebe os dados da API e chama showPokemon
    const loadPokemon = function(show=false) {
        $.ajax({
            url: 'https://pokeapi.co/api/v2/pokemon/',
            dataType: 'json',
            success(retornoDaApi) {
                pokemons = retornoDaApi.results;     // Recebe Listagem
                if(show) { // Para so chamar LoadPokemon no final, evitar chamar antes de funções nao iniciadas
                    showPokemon(pokemons)
                }
            },
            error(e) {
                $('#listagem-pokemons').html(`<h2>${e.responseJSON.detail}</h2>`)
            }
        });
    }

    // Monta Linhas com Listagem de Pokemons
    const montaListaPokemons = function(pokemons){        
        let html = '';
        pokemons.forEach((item, index) => {
            const i = index + 1;
            html =  html + `
            <tr  id="pokemon-${index}">
                <td>${i}</td>
                <td><a href="${item.url}" class="item">${item.name}</a></td>
                <td><a href='${index}' class='excluir'><img src='img/trash.png' class='deletar'></a></td>
            </tr>`;
        });
        return html;
    }

    // Coloca os Pokemons na tela
    const showPokemon = function() {
        $('#listagem').html(`<table>${montaListaPokemons(pokemons)}</table>`);
    }

    // Pegando o link especifico para detalhamento
    $('#listagem').on("click", ".item", function(evt) {
        const url = $(this).attr('href');
        evt.preventDefault();

        $.ajax({
            url,
            dataType: 'json',
            success(ret) {
                const abilities = [];
                
                //Alimentando a constante de habilidades
                ret.abilities.forEach(item => {
                    abilities.push(maiuscula(item.ability.name));    
                });

                const apresHabilidades = abilities.join(', ');
                
                // Montando a tabela de Habilidades
                const html = `<table>
                <tr><td>Nome:</td><td>${maiuscula(ret.name)}</td></tr>
                <tr><td>Imagem:</td><td><img src='${ret.sprites.front_default}'/><img src='${ret.sprites.back_default}'/></td></tr>
                <tr><td>Habilidades:</td><td>${apresHabilidades}</td></tr>
                </table>`;
                
                // Lançando a tabela de Habilidades na div
                $('#detalhes').html(html);
            },

            error(e) {
                $('#listagem-pokemons').html(`<h2>${e.responseJSON.detail}</h2>`)
            }
        });           
    });
    loadPokemon(true);
});