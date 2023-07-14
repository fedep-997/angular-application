import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ServizioService } from '../../servizi/servizio.service';
import { Post } from '../../interfacce/post/Post';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  page = 1;
  pageSize = 10;
  piaciuto: boolean = false;
  loggato = (sessionStorage || localStorage).getItem('utente') || '';
  out$: Observable<Post>;

  @Input() numeropost!: number;

  constructor(private s: ServizioService, private r: ActivatedRoute) {
    this.r.params.subscribe((params) => {
      this.numeropost = params.id;
    });
    this.out$ = this.s.lettura_post_singolo(this.numeropost);
  }

  mipiace(): void {
    this.out$?.subscribe((p) => this.s.mipiace(p, this.loggato));
  }

  comm(f: NgForm): void {
    var comm = f.form.value.txt_commento;
    if (comm) {
      this.out$?.subscribe((p) => this.s.commento(p, comm, this.loggato));
    }
  }
}
