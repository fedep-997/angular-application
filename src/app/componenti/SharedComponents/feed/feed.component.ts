import { Component, Input } from '@angular/core';
import { ServizioService } from '../../../servizi/servizio.service';
import { Router } from '@angular/router';
import { Post } from '../../../interfacce/post/Post';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent {
  @Input() tipo: string = '';
  feed: Post[] = [];
  out$: Observable<Post[]> | undefined;
  // impostazioni paginatore
  page: number = 1;
  pageSize: number = 10;

  constructor(private srv: ServizioService, private rotta: Router) {
    if (this.rotta.url === '/home') {
      this.out$ = this.srv.leggi_post();
    }
    else if (this.rotta.url.includes('profilo')) {
      this.out$ = this.srv.leggi_post(this.rotta.url.slice(9));
    }
  }
}
