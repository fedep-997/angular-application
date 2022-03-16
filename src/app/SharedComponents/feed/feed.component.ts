import { Component, Input, OnInit } from '@angular/core';
import { ServizioService } from '../../servizi/servizio.service';
import { Post } from '../../interfacce/post/Post';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  @Input() tipo: string = '';

  accesso = sessionStorage.getItem('utente') || localStorage.getItem('utente');

  // impostazioni paginatore
  page: number = 1;
  pageSize: number = 10;

  pubblicazioni: Post[] = [];

  constructor(private servizi: ServizioService) {}

  ngOnInit(): void {
    if (this.tipo === 'home') {
      this.servizi.leggi_post().subscribe((c) => (this.pubblicazioni = c));
    }
    else if (this.tipo === 'profilo') {
      this.servizi.leggi_post().subscribe((c) => (this.pubblicazioni = c.filter(p => p.user == this.accesso)));
    }
  }

}
