export interface Utente {
    id: string;
    email: string;
    password: string;
    ricordami?: boolean;
}

//Se è un numero, ? dopo il nome della variabile