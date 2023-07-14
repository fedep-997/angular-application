import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Utente } from '../interfacce/utente/Utente';
import { Post } from '../interfacce/post/Post';
import { Store } from '@ngrx/store';
import { login } from '../componenti/accedi/accedi.actions';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServizioService {
  private entry = 'http://localhost:5000';
  // private server = 'http://localhost:8000/api/';
  httphead = { 'content-type': 'application/json' };

  private stato = this.storageVuoto();
  statodiaccesso = this.stato.asObservable();

  private usernameLoggato = new BehaviorSubject('');
  usernameCorrente = this.usernameLoggato.asObservable();

  paginatore$: Observable<object> | undefined;
  acc$: Observable<string[]>;

  constructor(
    private clienteHTTP: HttpClient,
    private rotta: Router,
    private store: Store<{ accedi: string[] }>
  ) {
    this.acc$ = store.select('accedi');
  }

  // azioni sullo Store
  setUtente(u: string): void {
    this.usernameLoggato.next(u);
  }
  setGuardia(st: boolean): void {
    this.stato.next(st);
  }

  // scrittura dello storage (locale o sessione)
  setStorage(usr: string, ricordautente: boolean): void {
    if (ricordautente) {
      localStorage.setItem('utente', usr);
    } else {
      sessionStorage.setItem('utente', usr);
    }
  }
  storageVuoto(): BehaviorSubject<boolean> {
    if (sessionStorage.length == 0 && localStorage.length == 0) {
      var stato = new BehaviorSubject(false);
      this.rotta.navigateByUrl('/accedi');
    } else {
      var stato = new BehaviorSubject(true);
    }
    return stato;
  }

  // operazioni di accesso
  login(u: object, uu: Utente[]): boolean {
    // 0: username, 1: password, 2: ricorda (booleano)
    var ok: boolean = false;
    for (var utente of uu) {
      if (
        Object.values(u)[0] == utente.id &&
        Object.values(u)[1] == utente.password
      ) {
        ok = true;
        this.setUtente(Object.values(u)[0]);
        this.store.dispatch(
          login({
            username: Object.values(u)[0],
            password: Object.values(u)[1],
          })
        );
        this.setStorage(Object.values(u)[0], Object.values(u)[2]);
        this.setGuardia(true);
      }
    }
    if (ok) {
      return true;
    } else {
      return false;
    }
  }
  logout(): void {
    sessionStorage.clear();
    this.setUtente('');
    this.store.dispatch(login({ username: '', password: '' }));
    this.setGuardia(false);
  }

  // operazioni di lettura
  get_utenti(): Observable<Utente[]> {
    return this.clienteHTTP.get<Utente[]>(this.entry + '/utenti');
    /*return this.clienteHTTP.get<UtenteBack[]>(this.entry + 'utenti/')*/
  }

  leggi_post(utente?: string): Observable<Post[]> {
    if (utente == null) {
      return this.clienteHTTP
        .get<Post[]>(this.entry + '/pubblicazioni')
        .pipe(map((r) => r.slice().reverse()));
    } else {
      return this.clienteHTTP.get<Post[]>(this.entry + '/pubblicazioni').pipe(
        map((v0) => v0.filter((v1) => v1.user === utente)),
        map((r) => r.slice().reverse())
      );
    }
  }

  lettura_post_singolo(numero: number): Observable<Post> {
    return this.clienteHTTP.get<Post>(this.entry + `/pubblicazioni/${numero}`);
  }

  // operazioni di scrittura
  postarePost(b: string, c: string, d: string): Observable<Post> {
    return this.clienteHTTP
      .post<Post>(
        this.entry + '/pubblicazioni',
        { user: b, titolo: c, mipiace: [], testo: d, commenti: [] },
        { headers: this.httphead }
      )
      .pipe(retry(2), catchError(this.errorehttp));
    /*return this.clienteHTTP.post<PostBack>(this.server + 'nuovo/') */
  }
  mipiace(p: Post, ut: string): void {
    this.clienteHTTP
      .patch<Post>(this.entry + `/pubblicazioni/${p.id}`, {
        mipiace: this.like(p.mipiace, ut),
      })
      .pipe(retry(2), catchError(this.errorehttp)).subscribe();
    window.location.reload()
  }
  like(a: Array<string>, b: string): Array<string> {
    if (!a.includes(b)) {
      a.push(b);
      console.log('non erat')
    } else {
      a = a.filter(function (e) {
        console.log('erat')
        return b !== e;
      });
    }
    return a
  }
  commento(p: Post, tc: string, ac: string): void {
    var cto = { tc, ac };
    var cti = p.commenti;
    p.commenti.push(cto);
    this.clienteHTTP
      .patch<Post>(this.entry + `/pubblicazioni/${p.id}`, {
        commenti: cti,
      })
      .pipe(retry(2), catchError(this.errorehttp)).subscribe();
    window.location.reload()
  }
  registrareUtente(e: string, f: string, g: string): Observable<Utente> {
    return this.clienteHTTP
      .post<Utente>(
        this.entry + '/utenti',
        { id: e, email: f, password: g },
        { headers: this.httphead }
      )
      .pipe(retry(2), catchError(this.errorehttp));
  }

  // operazioni di guardia tipo (deprecate)
  isVettore(v: Post | Post[]): v is Post[] {
    return (v as Post[]) !== undefined;
  }
  isUnico(v: Post | Post[]): v is Post {
    return (v as Post) !== undefined;
  }

  // Handler errori http
  private errorehttp(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Errore lato client');
      alert(error.error);
    } else {
      console.error('Errore lato server');
      alert([error.status, error.error]);
    }
    // Restituisci un errorehttp osservabile
    return throwError(() => new Error('Beghe'));
  }

  // Impostazioni
  paginatore(): void {}

  /* backend vero
  registrareBack() {
    return this.clienteHTTP.post(this.server + 'reg/', {
      username: 'Utente',
      password: 'Pwd',
    });
  }
  postareBack() {
    return this.clienteHTTP.post(this.server + 'nuovopost/', {
      testo: 'Arriva Can',
      mipiace: '2',
      commenti: '4',
    });
  }
  cambiarePostBack() {}*/
}
