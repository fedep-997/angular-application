import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { Utente } from '../interfacce/utente/Utente';
import { Post } from '../interfacce/post/Post';
import { Commento } from '../interfacce/commento/Commento';

@Injectable({
  providedIn: 'root',
})
export class ServizioService {
  constructor(private clienteHTTP: HttpClient, private rotta: Router) {}

  private stato = this.checkStato();
  statodiaccesso = this.stato.asObservable();

  private usernameLoggato = new BehaviorSubject('');
  usernameCorrente = this.usernameLoggato.asObservable();

  private emailLoggato = new BehaviorSubject('');
  emailCorrente = this.emailLoggato.asObservable();

  private entry = 'http://localhost:5000';

  // Handler errori http
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // Errore client
      console.error('Errore lato client:', error.error);
    } else {
      // Errore server
      console.error(
        `Errore lato server. Codice ${error.status}, contenuto: `,
        error.error
      );
    }
    // Restituisci un errore osservabile
    return throwError(() => new Error('Beghe'));
  }

  // metodi HTTP
  //
  // get
  get_utenti(): Observable<Utente[]> {
    return this.clienteHTTP.get<Utente[]>(this.entry + '/utenti');
  }
  leggi_post(numero?: number): Observable<Post | Post[]> {
    if (numero == null) {
      return this.clienteHTTP.get<Post[]>(this.entry + '/pubblicazioni');
    } else {
      return this.clienteHTTP.get<Post>(
        this.entry + `/pubblicazioni/${numero}`
      );
    }
  }
  get_commenti(): Observable<Commento[]> {
    return this.clienteHTTP.get<Commento[]>(this.entry + '/commenti');
  }

  // post
  testa = { 'content-type': 'application/json' };
  postarePost(b: string, c: string, d: string): Observable<Post> {
    return this.clienteHTTP
      .post<Post>(
        this.entry + '/pubblicazioni',
        { user: b, titolo: c, testo: d },
        { headers: this.testa }
      )
      .pipe(retry(2), catchError(this.handleError));
  }
  commentareCommento(k: number, h: string, j: string): Observable<Commento> {
    return this.clienteHTTP
      .post<Commento>(
        this.entry + '/commenti',
        { post: k, m_a: h, testo: j },
        { headers: this.testa }
      )
      .pipe(retry(2), catchError(this.handleError));
  }
  registrareUtente(e: string, f: string, g: string): Observable<Post> {
    return this.clienteHTTP
      .post<Post>(
        this.entry + '/utenti',
        { id: e, email: f, password: g },
        { headers: this.testa }
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  //accesso
  eseguireAccesso(usr: string, mail: string, ricorda: boolean) {
    this.usernameLoggato.next(usr);
    if (ricorda) {
      localStorage.setItem('utente', usr);
      localStorage.setItem('mail', mail);
    } else {
      sessionStorage.setItem('utente', usr);
      sessionStorage.setItem('mail', mail);
    }
    this.rotta.navigateByUrl('/home');
  }

  // Guardia di navigazione: setter
  impostareGuardia(st: boolean) {
    this.stato.next(st);
  }

  //Schifo cambiare
  checkStato() {
    if (sessionStorage.length == 0 && localStorage.length == 0) {
      var stato = new BehaviorSubject(false);
    } else {
      var stato = new BehaviorSubject(true);
    }
    return stato;
  }


  // Guardie del tipo
  isVettore(v: Post | Post[]): v is Post[] {
    return (v as Post[]) !== undefined;
  }
  isUnico(v: Post | Post[]): v is Post {
    return (v as Post) !== undefined;
  }
}
