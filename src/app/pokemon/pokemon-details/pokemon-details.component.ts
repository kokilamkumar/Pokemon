import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  pokemon;

  constructor(private activatedRoute: ActivatedRoute,
    private router:Router,
    private http: HttpClient) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.http.get<any>('https://api.pokemontcg.io/v1/cards/' + id).subscribe(resp => {
      this.pokemon = resp;
      // console.log(this.pokemon);
    });
  }

  goToPokemonListPage() {
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
  }

}