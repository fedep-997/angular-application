import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

/*const socket = new WebSocket('ws://localhost:8001');
 socket.onopen = function () {
  socket.send('handske');
  socket.addEventListener('message', ({ data }) => {
    console.log(data);
  }); 
}; */
