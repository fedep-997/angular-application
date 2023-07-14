
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root',
  })
export class Lavor {

}

// Note that at least one consumer has to subscribe to the created subject - otherwise "nexted" values will be just buffered and not sent,
// since no connection was established!
// This will send a message to the server once a connection is made. Remember value is serialized with JSON.stringify by default!
