import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemons } from '../pokemons.model';
import { Pokemon } from '../pokemon.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PokemonDetailDialogComponent } from '../pokemon-detail-dialog/pokemon-detail-dialog.component';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  allPokemons: Pokemons[];
  pokemons: Pokemons[];
  infiniteScorllStatus: boolean;

  selectedPokemon: Pokemon;

  constructor(private http: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }
  ngOnInit() {
    this.http.get<any>('https://api.pokemontcg.io/v1/cards').subscribe(resp => {
      this.allPokemons = resp.cards;
      this.pokemons = this.allPokemons.slice(0, 20);

      console.log(this.pokemons);

    });
  }
  getPokemon = (id: string) => {
    this.http.get<any>('https://api.pokemontcg.io/v1/cards/' + id).subscribe(resp => {
      this.selectedPokemon = resp;
      // console.log(this.selectedPokemon);
    });
  }
  onScrollDown() {
    if (this.pokemons.length < this.allPokemons.length) {
      const len = this.pokemons.length;
      for (let i = len; i <= len + 20; i++) {
        if (this.pokemons.length === this.allPokemons.length) {
          this.infiniteScorllStatus = true;
        } else {
          this.pokemons.push(this.allPokemons[i]);
        }
      }
    }
  }

  openDialog(pokemon): void {
    const dialogRef = this.dialog.open(PokemonDetailDialogComponent, {
    data: pokemon
  });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

}
