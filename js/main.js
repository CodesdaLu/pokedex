const listpokemon = document.getElementById('listpokemon')
const loadMoreButton = document.getElementById('loadMoreButton')
const namee = document.getElementsByClassName('name')


const maxRecords = 151
const limit = 15
let offset = 0;
const name = []

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <p>Abilities</p>
            
            <div class="detail">
        
                <ol class="abilities">
                ${pokemon.abilities.map((ability) => `<li class="ability">${ability}</li>`).join('')}
                </ol>
        
            </div>                        
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        listpokemon.innerHTML += newHtml
    })
}


loadPokemonItens(offset, limit)


loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})







