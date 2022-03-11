import { Component, OnInit } from '@angular/core';
 import { ServizioService } from '../servizi/servizio.service';
import { Un_post_tipo } from '../banca_interna/interfacciapost/Unpostfattocome';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css'],
})
export class ProfiloComponent implements OnInit {
  constructor(private servizi: ServizioService) {}

  titolopagina: string = 'home';

  // impostazioni paginatore
  page: number = 1;
  pageSize: number = 10;

  accesso = sessionStorage.getItem('utente') || localStorage.getItem('utente');
  
  pubblicazioni: Un_post_tipo[] = [];

  ngOnInit(): void {
    this.servizi.leggi_post().subscribe((c) => (this.pubblicazioni = c));
  }
}
