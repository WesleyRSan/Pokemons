$(document).ready(function(){
    
    /**
     * Recebe uma string e retorna a mesma string com primeira
     * letra em maiúscula
     */
    function maiuscula(text) {
        return text.charAt(0).toUpperCase()+text.slice(1);
    }

    /**
     * Recebe um array de pokemons e retorna uma string com codigo html
     */
    const montaListaHtmlPokemons = function(pokemons) {
        let html = '';
        pokemons.forEach((item, index) => {
            const i = index + 1;
            html = html + `
            <tr id="pokemon-${index}">
                <td><a href="${item.url}" class="item">${item.name}</a></td>
                <td><a href="${index}" class="excluir">excluir</a></td>
            </tr>`;
        });
        return html;
    }

    /**
     * Bate na API e retorna um JSON com uma lista de pokemons 
     */
    const loadPokemons = function(show=false, url='https://pokeapi.co/api/v2/pokemon/') {
        $.ajax({
            url,
            dataType: 'json',
            success(retornoDaApi) {
                const qtde = retornoDaApi.count || 0;
                const prev = retornoDaApi.previous || '#';
                const next = retornoDaApi.next || '#';
                pokemons = retornoDaApi.results;

                $("#next").attr('href', next);
                $("#prev").attr('href', prev);

                if (show) {
                    showPokemons(pokemons);
                }
            },
            error(e) {
                $('#listagem-pokemons').html(`<h2>${e}</h2>`)
            }
        });
    }

    /**
     * Exibe pokemons 
     */
    const showPokemons = function(arrayPokemons) {
        const html = montaListaHtmlPokemons(arrayPokemons);
        $('#listagem').html(html);
    }

    $("#recarregar").click(function(){
        showPokemons(pokemons);
    });
    
    $("#listagem").on('click', '.excluir', function(event) {
        const index = $(this).attr('href');
        $(`#pokemon-${index}`).remove();
        event.preventDefault();
    });

    // Preenchendo a tela de Detalhamento
    $('#listagem').on("click", ".item", function(evt) {
        const url = $(this).attr('href');
        evt.preventDefault();
    
        $.ajax({
            url,
            dataType: 'json',
            success(ret) {
                const abilities = ret.abilities.map(item => item.ability.name);
                const apresHabilidades = abilities.join(', ');
                const html = `
                <tr><td class="col-title">Nome:</td><td>${maiuscula(ret.name)}</td></tr>
                <tr><td class="col-title">Imagem:</td><td><img src='${ret.sprites.front_default}'/><img src='${ret.sprites.back_default}'/></td></tr>
                <tr><td class="col-title">Habilidades:</td><td>${apresHabilidades}</td></tr>`;
                
                $('#detalhes').html(html);
            },
            error(e) {
                $('#listagem-pokemons').html(`<h2>${e.responseJSON.detail}</h2>`)
            }
        });           
    });

    $("#paginacao").on("click", ".page-link", function(e) {
        e.preventDefault();
        const url = $(this).attr('href');
        loadPokemons(true, url);
    })
        
    loadPokemons(true); // carrega os pokemons do servico e atribui na veriavel acima (pokemons)    

});