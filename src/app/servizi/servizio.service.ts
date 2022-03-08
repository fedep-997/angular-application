import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


import { Utente_tipo } from '../banca_interna/struttura_utente/Utente';
import { Un_post_tipo } from '../banca_interna/interfacciapost/Unpostfattocome';
import { Commento } from '../banca_interna/interfacciacommento/un_commento';


@Injectable({
  providedIn: 'root'
})
export class ServizioService {
  
  private stato = this.checkStato()
  statodiaccesso = this.stato.asObservable()

  // Questi dati sono condivisi tra i componenti
  private numerodaScambiare = new BehaviorSubject(0);
  numerocorrente = this.numerodaScambiare.asObservable();

  private usernameLoggato = new BehaviorSubject('');
  usernameCorrente = this.usernameLoggato.asObservable();

  private emailLoggato = new BehaviorSubject('');
  emailCorrente = this.emailLoggato.asObservable();

  private dati = 'http://localhost:5000'

  constructor(private clienteHTTP: HttpClient,
              private rotta: Router) {}

  // metodi HTTP
  // get utenti 
  acquisizione_utenti(): Observable<Utente_tipo[]> {
    return this.clienteHTTP.get<Utente_tipo[]>(this.dati + '/utenti')
  }
  // per la home
  acquisizione_post(): Observable<Un_post_tipo[]> {
    return this.clienteHTTP.get<Un_post_tipo[]>(this.dati + '/pubblicazioni')
  }
  // per la sezione "post"
  un_solo_post(numero: number): Observable<Un_post_tipo> {
    return this.clienteHTTP.get<Un_post_tipo>(this.dati + `/pubblicazioni/${numero}`)
  }
  acquisizione_commenti(): Observable<Commento[]> {
    return this.clienteHTTP.get<Commento[]>(this.dati + '/commenti')
    
  }
  // post
  postaUnPost(b: string, c: string, d: string): Observable<Un_post_tipo> {
    const testa = { 'content-type': 'application/json' }
    return this.clienteHTTP.post<Un_post_tipo>(this.dati + '/pubblicazioni', { "user": b, "titolo": c, "testo": d }, { 'headers': testa })
  }
  commentaUnCommento(k: number, h: string, j: string): Observable<Commento> {
    const testa = { 'content-type': 'application/json' }
    return this.clienteHTTP.post<Commento>(this.dati + '/commenti', { "post": k, "m_a": h, "testo": j }, { 'headers': testa })
  }
  registraUnUtente(e: string, f: string, g: string): Observable<Utente_tipo> {
    const testa = { 'content-type': 'application/json' }
    return this.clienteHTTP.post<Utente_tipo>(this.dati + '/utenti', { "id": e, "email": f, "password": g }, { 'headers': testa })
  }

  accessoDimentica(usr: string, mail: string, rott: string) {
    this.usernameLoggato.next(usr);
    sessionStorage.setItem('utente', usr);
    sessionStorage.setItem('mail', mail)
    this.rotta.navigateByUrl(rott)
  }

  accessoRicorda(usr: string, mail: string, rott: string) {
    this.usernameLoggato.next(usr);
    localStorage.setItem('utente', usr);
    localStorage.setItem('mail', mail)
    this.rotta.navigateByUrl(rott)
  }

  // Guardia di navigazione: setter
  impostaGuardia(st: boolean) {
    this.stato.next(st)
  }

  //Schifo cambiare
  checkStato(){
    if ((sessionStorage.length == 0) && (localStorage.length == 0)) {
      var stato = new BehaviorSubject(false)
    }
    else {
      var stato = new BehaviorSubject(true)
    }
    return stato
  }
}
