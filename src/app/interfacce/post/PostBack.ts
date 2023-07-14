export interface Post {
    id: number;
    user: string;
    titolo: string;
    testo: string;
    mipiace: string[];
    commenti: [{ 
        tc: string,
        ac: string
    }]
}