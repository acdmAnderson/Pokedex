import { Pokemon } from 'src/app/domain/models';
import { PokemonDetailModel } from '../models';
import { toKilos, toMetters } from './measure.helper';

export const mapToPokemon = (from: PokemonDetailModel): Pokemon => {
  const { height, weight } = from;
  return {
    ...from,
    height: `${toMetters(height)}`,
    weight: `${toKilos(weight)}`,
  };
};
