import { Pokemon } from 'src/app/domain/models';
import { PokemonDetailModel } from '../models';

export const mapToPokemon = (from: PokemonDetailModel): Pokemon => {
  return {
    ...from,
    height: `${from.height} dm`,
    weight: `${from.weight} hg`,
  };
};
