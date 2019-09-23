import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pokemon-detail-dialog',
  templateUrl: './pokemon-detail-dialog.component.html',
  styleUrls: ['./pokemon-detail-dialog.component.css']
})
export class PokemonDetailDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PokemonDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
     }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close();
  }
}
