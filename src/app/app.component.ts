import { Component } from '@angular/core';
import {
  Router,
  Event,
  NavigationEnd,
  NavigationError
} from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: []
})
export class AppComponent {
  
  private pi = new BehaviorSubject(['', '']);
  testa: string = '';
  piede: string[] = ['', ''];

  vuoto: string[] = ['/accedi'];
  solo_opzioni: string[] = ['/home'];
  solo_indietro: string[] = ['/registrazione', '/nuovopost', '/opzioni'];
  entrambi: string[] = [];

  

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      // prende informazioni dall'url per impostare footer e titolo
      if (event instanceof NavigationEnd) {
        this.testa = router.url;
        if (this.vuoto.includes(router.url)) {
          this.pi.next(['', '']);
          this.piede = ['', ''];
        } else if (
          this.solo_indietro.includes(router.url) ||
          router.url.includes('profilo') ||
          router.url.includes('post')
        ) {
          this.pi.next(['', 'indietro']);
          this.piede = ['', 'indietro'];
        } else if (this.solo_opzioni.includes(router.url)) {
          this.pi.next(['opzioni']);
          this.piede = ['opzioni'];
        }
      } else if (event instanceof NavigationError) {
        // Present error to user
        console.log(event.error);
      }
    });
  }


}

// Web Worker
if (typeof Worker !== 'undefined') {
  // Create a new
  const worker = new Worker(new URL('./app.worker', import.meta.url));
}
