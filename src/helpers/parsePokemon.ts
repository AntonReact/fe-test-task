// types
import { IPokemon } from "../types";

interface IPokemonData {
  name: string;
  types: Array<{ type: { name: string } }>;
  sprites: { front_default: string };
  weight: number;
}

export const parsePokemon = (data: IPokemonData): IPokemon => {
  const { name, types, weight, sprites } = data;
  return {
    name,
    weight,
    types: types.map(({ type }) => type.name),
    image: sprites.front_default
  }
}