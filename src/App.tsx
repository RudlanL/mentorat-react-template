import { useState } from 'react';
import PokemonItemList from './PokemonItem';

function createPokemon(id: number) {
  return {
    id: id,
    name: 'pokemon',
    url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
  };
}

function createPokemons(offset: number, count: number) {
  return [...new Array(count)].map((v, i) => createPokemon(offset + i));
}

function App() {
  const pokemonsList = createPokemons(1, 3);
  const [pokemons, setPokemons] = useState(pokemonsList);
  return (
    <>
      <header className="header">Pokedex</header>
      <main className="main">
        <div className="tools">
          <button
            className="show-more"
            onClick={() => {
              setPokemons([...pokemons, createPokemon(pokemons.length + 1)]);
            }}
          >
            Voir plus
          </button>
          <div className="shiny">
            <label htmlFor="shiny-checkbox">shiny</label>
            <input id="shiny-checkbox" type="checkbox" />
          </div>
        </div>
        <div
          className="list"
          // onWheel={(e) => {
          //   if (e.deltaY >= 0) {
          //     setPokemons([...pokemons, createPokemon(pokemons.length + 1)]);
          //   }
          // }}
        >
          {pokemons.map((pokemon) => (
            <PokemonItemList
              id={pokemon.id}
              label={pokemon.name}
              url={pokemon.url}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
