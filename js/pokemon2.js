$.ajax({
    url: 'https://pokeapi.co/api/v2/pokemon/',
    dataType: 'json',
    success(retornoDaApi) {
        const pokemons = retornoDaApi.results;
        let html = '';

        pokemons.forEach((item, index) => {
            const i = index + 1;
            html = html + `
            <tr>
                <td>${i}</td>
                <td><a href="${item.url}" class="item">${item.name}</a></td>
                <td>${item.url}</td>
            </tr>`;
        });
        
        $('#listagem').html(`<table>${html}</table>`);
    },
    error(e) {
        $('#listagem-pokemons').html(`<h2>${e.responseJSON.detail}</h2>`)
    }
});

// Preenchendo a tela de Detalhamento
$('#listagem').on("click", ".item", function(evt) {
    const url = $(this).attr('href');
    evt.preventDefault();

    $.ajax({
        url,
        dataType: 'json',
        success(ret) {
            const abilities = [];

            ret.abilities.forEach(item => {
                abilities.push(item.ability.name);    
            });

            const apresHabilidades = abilities.join(', ');
            
            const html = `<table>
            <tr><td>Nome:</td><td>${ret.name}</td></tr>
            <tr><td>Imagem:</td><td><img src='${ret.sprites.front_default}'/><img src='${ret.sprites.back_default}'/></td></tr>
            <tr><td>Habilidades:</td><td>${apresHabilidades}</td></tr>
            </table>`;
            
            // console.log(abilities)

            $('#detalhes').html(html);
        },

        error(e) {
            $('#listagem-pokemons').html(`<h2>${e.responseJSON.detail}</h2>`)
        }
    });           
});