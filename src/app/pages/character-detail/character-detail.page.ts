import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
})
export class CharacterDetailPage implements OnInit {

  characterId: string = '';
  character: any = null;
  episodes:any = [];

  constructor(private actRoute: ActivatedRoute, private rickAndMortySvc: RickAndMortyService) {
    this.characterId = this.actRoute.snapshot.paramMap.get('id') as string;
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.getCharacter();
  }

  getCharacter() {
    this.rickAndMortySvc.getCharacterById(this.characterId).subscribe({
      next: (res: any) => {
        this.character = res;
        this.getEpisodes();
        this.character.status = this.statusCharacter(this.character.status);
        this.character.gender = this.genderCharacter(this.character.gender);
      },
      error: (err: any) => {

      }
    })
  }

  getEpisodes() {
    for(let i of this.character.episode){
      this.rickAndMortySvc.getEpisodes(i).subscribe({
        next: (res: any) => {
          this.episodes.push(res);
        },
        error: (err: any) => {

        }
      })
    }
  }

  statusCharacter(status: string){
    if(status == 'Alive'){
      return 'Vivo';
    }
    else if(status == 'Dead'){
      return 'Muerto';
    }
    else{
      return 'Desconocido';
    }
  }

  genderCharacter(status: string){
    if(status == 'Male'){
      return 'Masculino';
    }
    else if(status == 'Female'){
      return 'Femenino';
    }
    else{
      return 'Desconocido';
    }
  }

}
