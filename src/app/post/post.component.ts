import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ServizioService } from '../servizi/servizio.service';
import { Un_post_tipo } from '../banca_interna/interfacciapost/Unpostfattocome';

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

  mail = sessionStorage.getItem('mail') || localStorage.getItem('utente') || '';

  @Input() numeropost!: number;
  ilpost = <Un_post_tipo>{};
  commenti: any;
  ngOnInit(): void {
    this.rotta.params.subscribe((params) => {
      this.numeropost = params.id;
    });
    this.servizi
      .un_solo_post(this.numeropost)
      .subscribe((c) => (this.ilpost = c));
    this.servizi.acquisizione_commenti().subscribe((d) => (this.commenti = d));
  }
  commentare(a: NgForm): void {
    // fai un commento e rifetcha lista commenti aggiornata
    this.servizi
      .commentaUnCommento(
        Object.values(this.ilpost)[3],
        this.mail,
        a.form.value.txt_commento
      )
      .subscribe((data) => {});
    this.servizi.acquisizione_commenti().subscribe((d) => (this.commenti = d));
    window.location.reload();
  }
}
