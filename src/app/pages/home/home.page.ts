import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  /*standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedModule]*/
})
export class HomePage implements OnInit {

  characters: any[] = [];
  resCharacters: any = null;
  params = {} as any;

  constructor(private rickAndMortySvc: RickAndMortyService) { }

  ngOnInit() {
    this.params.page = 0;
    this.getCharacter();
  }

  // Obtener personajes
  getCharacter(event?: any) {
    this.params.page += 1;
    this.rickAndMortySvc.getCharacter(this.params).subscribe({
      next: (res: any) => {
      this.resCharacters = res.results;
      this.characters.push(...this.resCharacters);
        if(event){
          event.target.complete();
        }
      },
      error: (err: any) => {
        if(event){
          event.target.complete();
        }
      }
    })
  }

  // Buscar personajes
  searchCharacter() {
    this.params.page = 1;
    this.rickAndMortySvc.getCharacter(this.params).subscribe({
      next: (res: any) => {
        this.characters = res.results;
      },
      error: (err: any) => {

      }
    })
  }

}
