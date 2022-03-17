import { Component, Input, OnInit } from '@angular/core';
import { ServizioService } from '../../servizi/servizio.service';
import { Post } from '../../interfacce/post/Post';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  @Input() tipo: string = '';

  loggato = sessionStorage.getItem('utente') || localStorage.getItem('utente');
  feed: Post[] = [];
  // impostazioni paginatore
  page: number = 1;
  pageSize: number = 10;

  constructor(private srv: ServizioService) {}
  ngOnInit(): void {
    if (this.tipo === 'home') {
      this.srv.leggi_post().subscribe((risposta) => {
        if (this.srv.isVettore(risposta))
          this.feed = risposta.slice().reverse();
      });
    } else if (this.tipo.includes('profilo')) {
      this.srv.leggi_post().subscribe((risposta) => {
        if (this.srv.isVettore(risposta))
          this.feed = risposta
            .filter((profilo) => profilo.user == this.loggato)
            .slice()
            .reverse();
      });
    }
  }
}
