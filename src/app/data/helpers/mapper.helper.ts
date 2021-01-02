import { Pokemon } from 'src/app/domain/models';
import { PokemonDetailModel } from '../models';

export const mapToPokemon = (from: PokemonDetailModel): Pokemon => {
  return {
    ...from,
    height: `${from.height} dm`,
    weight: `${from.weight} hg`,
  };
};

export const mapToPage = (urlNext: string): number => {
  const queryParams = urlNext.split('?')[1];
  let page = 0;
  if (queryParams) {
    const params = queryParams.split('&');
    const limit = +params
      .find((parameter) => parameter.includes('limit'))
      .split('=')[1];
    const offset = +params
      .find((parameter) => parameter.includes('offset'))
      .split('=')[1];
    const currentParams = offset - limit;
    page = currentParams === 0 ? 1 : currentParams / limit;
  }
  return page;
};
