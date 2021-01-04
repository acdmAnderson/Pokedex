import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  searchForm: FormGroup;
  pokemonName: string;

  constructor() {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      pokemonName: new FormControl(null),
    });
  }

  search({ pokemonName }): void {
    this.pokemonName = pokemonName;
  }
}
