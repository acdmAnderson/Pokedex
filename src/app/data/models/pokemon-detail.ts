export interface PokemonDetailModel {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: Array<Ability>;
  types: Array<Type>;
}

export interface Ability {
  name: string;
}

export interface Type {
  name: string;
}
