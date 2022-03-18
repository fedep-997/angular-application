import { Component, Input, OnInit } from '@angular/core';
import { ServizioService } from '../../servizi/servizio.service';
import { Router } from '@angular/router';
import { Post } from '../../interfacce/post/Post';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  @Input() tipo: string = '';

  loggato = (sessionStorage || localStorage).getItem('utente');
  feed: Post[] = [];
  // impostazioni paginatore
  page: number = 1;
  pageSize: number = 10;

  constructor(private srv: ServizioService, private rotta: Router) {}
  ngOnInit(): void {
    if (this.rotta.url === '/home') {
      this.srv.leggi_post().subscribe((r) => {
        if (this.srv.isVettore(r)) this.feed = r.slice().reverse();
      });
    } else if (this.rotta.url.includes('profilo')) {
      this.srv.leggi_post().subscribe((r) => {
        if (this.srv.isVettore(r))
          this.feed = r
            .filter((profilo) => profilo.user == this.rotta.url.slice(9))
            .slice()
            .reverse();
      });
    }
  }
}

