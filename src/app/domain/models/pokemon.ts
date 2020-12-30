export interface Pokemon {
  id: number;
  name: string;
  height: string;
  weight: string;
  abilities: Array<Ability>;
  types: Array<Type>;
}

export interface Ability {
  name: string;
}

export interface Type {
  name: string;
}
