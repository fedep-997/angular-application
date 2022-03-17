import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ServizioService } from '../servizi/servizio.service';
import { Post } from '../interfacce/post/Post';
import { Commento } from '../interfacce/commento/Commento';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  page = 1;
  pageSize = 10;

  loggato = sessionStorage.getItem('utente') || localStorage.getItem('utente');
  mail = sessionStorage.getItem('mail') || localStorage.getItem('utente') || '';

  ilpost = <Post>{};
  commenti = <Commento[]>[];

  @Input() numeropost!: number;
  commentare(a: NgForm): void {
    // fai un commento e rifetcha lista commenti aggiornata
    this.servizi
      .commentareCommento(
        Object.values(this.ilpost)[3],
        this.mail,
        a.form.value.txt_commento
      )
      .subscribe(() => {});
    this.servizi
      .get_commenti()
      .subscribe((risposta) => (this.commenti = risposta));
    window.location.reload();
  }

  constructor(
    private servizi: ServizioService,
    private rotta: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.rotta.params.subscribe((params) => {
      this.numeropost = params.id;
    });
    this.servizi.leggi_post(this.numeropost).subscribe((risposta) => {
      if (this.servizi.isUnico(risposta)) this.ilpost = risposta;
    });
    this.servizi
      .get_commenti()
      .subscribe((risposta) => (this.commenti = risposta));
  }
}
