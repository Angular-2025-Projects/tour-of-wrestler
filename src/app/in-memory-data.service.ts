import { Injectable } from '@angular/core';
import { WRESTLERS } from './mock-wrestlers';
import { Wrestler } from './wrestler.interface';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService{

  constructor() { }

  createDb() {
    return {wrestlers : WRESTLERS}
  }

  // Remplace la méthode genId pour garantir qu'un lutteur a toujours un identifiant.
  // Si le tableau des lutteurs est vide,
  // la méthode ci-dessous renvoie le nombre initial (11).
  // si le tableau n'est pas vide, la méthode ci-dessous renvoie le plus grand identifiant + 1
  genId(wrestlers: Wrestler[]): number {
    return wrestlers.length > 0 ? Math.max(...wrestlers.map(w => w.id)) + 1 : 11;
  }
}
