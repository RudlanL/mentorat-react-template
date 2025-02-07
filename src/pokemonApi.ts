import type { Pokemon } from 'pokenode-ts';

export async function getPokemonById(id: number): Promise<Pokemon> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return response.json();
}
