import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination, Pokemon } from 'src/app/domain/models';
import { GetPokemon } from 'src/app/domain/usecases/get-pokemon';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css'],
})
export class PokedexComponent implements OnInit {
  constructor(private readonly getPokemon: GetPokemon) {}

  ngOnInit(): void {}

  find(): Observable<Pagination<Pokemon>> {
    return this.getPokemon.find();
  }
}
