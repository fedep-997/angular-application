import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ServizioService } from '../servizi/servizio.service';
import { Post } from '../interfacce/post/Post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  constructor(
    private servizi: ServizioService,
    private rotta: ActivatedRoute
  ) {}

  page = 1;
  pageSize = 10;
  
  accesso = sessionStorage.getItem('utente') || localStorage.getItem('utente');
  mail = sessionStorage.getItem('mail') || localStorage.getItem('utente') || '';

  @Input() numeropost!: number;
  ilpost = <Post>{};
  commenti: any;
  ngOnInit(): void {
    this.rotta.params.subscribe((params) => {
      this.numeropost = params.id;
    });
    this.servizi
      .un_solo_post(this.numeropost)
      .subscribe((c) => (this.ilpost = c));
    this.servizi.get_commenti().subscribe((d) => (this.commenti = d));
  }
  commentare(a: NgForm): void {
    // fai un commento e rifetcha lista commenti aggiornata
    this.servizi
      .commentaUnCommento(
        Object.values(this.ilpost)[3],
        this.mail,
        a.form.value.txt_commento
      )
      .subscribe(() => {});
    this.servizi.get_commenti().subscribe((d) => (this.commenti = d));
    window.location.reload();
  }
}
