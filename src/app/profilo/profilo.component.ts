import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css'],
})
export class ProfiloComponent implements OnInit {
  
  accesso = sessionStorage.getItem('utente') || localStorage.getItem('utente');
  
  constructor() {}
  ngOnInit(): void {}
}
