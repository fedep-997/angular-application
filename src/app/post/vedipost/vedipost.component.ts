import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Un_post_tipo } from '../../banca_interna/interfacciapost/Unpostfattocome';
import { ServizioService } from '../../servizi/servizio.service';

@Component({
  selector: 'app-vedipost',
  templateUrl: './vedipost.component.html',
  styleUrls: ['./vedipost.component.css']
})
export class VedipostComponent implements OnInit {

  titolopagina = 'Post';

  page = 1;
  pageSize = 10;

  @Input() numeropost!: number;

  ilpost = <Un_post_tipo>{}
  commenti: any;

  mail = sessionStorage.getItem('mail') || localStorage.getItem('utente') || '';

  constructor(private servizi: ServizioService) {}

  ngOnInit(): void {
    this.servizi.un_solo_post(this.numeropost).subscribe(c => this.ilpost = c)
    this.servizi.acquisizione_commenti().subscribe(d => this.commenti = d)
  }

  commentare(a: NgForm): void {
    // commenta, riottieni commenti
    this.servizi.commentaUnCommento(Object.values(this.ilpost)[3], this.mail, a.form.value.txt_commento).subscribe(data => {});
    this.servizi.acquisizione_commenti().subscribe(d => this.commenti = d)
    window.location.reload()
  }

}
