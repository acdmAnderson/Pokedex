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

  search({ pokemonName }: { pokemonName: string }): void {
    if (pokemonName?.length) {
      setTimeout(() => (this.pokemonName = pokemonName.toLowerCase()), 50);
      this.pokemonName = null;
      this.resetForm();
    }
  }

  private resetForm(): void {
    this.searchForm.get('pokemonName').setValue(null);
  }
}
