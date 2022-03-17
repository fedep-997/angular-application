import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-testa',
  templateUrl: './testa.component.html',
  styleUrls: ['./testa.component.css'],
})
export class TestaComponent implements OnInit {
  constructor() {}

  accesso = sessionStorage.getItem('utente') || localStorage.getItem('utente');
  nome: string = '';

  @Input()
  header: string = '';

  ngOnInit(): void {
    if (typeof this.accesso == 'string') {
      this.nome = this.accesso;
    }
  }
}
