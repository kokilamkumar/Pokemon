import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { isNull } from 'util';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: any;

  @Input()
  public dataId: string = null;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (isNull(this.dataId)) {
      this.dataId = id;
    }
    this.http.get<any>('https://api.pokemontcg.io/v1/cards/' + this.dataId).subscribe(resp => {
      this.pokemon = resp;
    });
  }

  goToPokemonListPage() {
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
  }

}
