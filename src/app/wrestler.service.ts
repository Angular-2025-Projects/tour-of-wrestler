import { Injectable } from '@angular/core';
import { Wrestler } from './wrestler.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WrestlerService {

  private wrestlersUrl = 'api/wrestlers';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private messageService : MessageService,
    private http: HttpClient,
  ) { }

  private log(message: string) {
    this.messageService.add(`WrestlerService: ${message}`);
  }

  getWrestlers () : Observable<Wrestler[]>{
    return this.http.get<Wrestler[]>(this.wrestlersUrl)
    .pipe(
      tap(_ => this.log('lutteurs récupérés')),
      catchError(this.handleError<Wrestler[]>('getWrestlers', []))
    );
  }

  getWrestler(id: number): Observable<Wrestler> {
    const url = `${this.wrestlersUrl}/${id}`;
    return this.http.get<Wrestler>(url).pipe(
      tap(_ => this.log(`lutteur récupéré id=${id}`)),
      catchError(this.handleError<Wrestler>(`getWrestler id=${id}`))
    );
  }

  getWrestlerNo404(id: number): Observable<Wrestler> {
    const url = `${this.wrestlersUrl}/?id=${id}`;
    return this.http.get<Wrestler[]>(url)
      .pipe(
        map(wrestlers => wrestlers[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'récupéré' : 'n\'est pas trouvé';
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Wrestler>(`getHero id=${id}`))
      );
  }

  updateWrestler(wrestler: Wrestler): Observable<any> {
    return this.http.put(this.wrestlersUrl, wrestler, this.httpOptions).pipe(
      tap(_ => this.log(`lutteur modifié id=${wrestler.id}`)),
      catchError(this.handleError<any>('updateWrestler'))
    );
  }

  addWrestler(wrestler: Wrestler): Observable<Wrestler> {
    return this.http.post<Wrestler>(this.wrestlersUrl, wrestler, this.httpOptions).pipe(
      tap((newWrestler: Wrestler) => this.log(`lutteur ajouté id=${newWrestler.id}`)),
      catchError(this.handleError<Wrestler>('addWrestler'))
    );
  }

  deleteWrestler(id: number): Observable<Wrestler> {
    const url = `${this.wrestlersUrl}/${id}`;
  
    return this.http.delete<Wrestler>(url, this.httpOptions).pipe(
      tap(_ => this.log(`lutteur supprimé id=${id}`)),
      catchError(this.handleError<Wrestler>('deleteWrestler'))
    );
  }

  searchWrestlers(term: string): Observable<Wrestler[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Wrestler[]>(`${this.wrestlersUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`lutteur trouvé correspondant à "${term}"`) :
         this.log(`aucun lutteur correspondant à "${term}"`)),
      catchError(this.handleError<Wrestler[]>('searchWrestlers', []))
    );
  }

/**
 * Gérer l'opération HTTP qui a échoué.
 * Laissez l'application continuer.
 *
 * @param operation - nom de l'opération qui a échoué
 * @param result - valeur facultative à renvoyer comme résultat observable
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO : envoyer l'erreur à l'infrastructure de journalisation distante
      console.error(error);

      // TODO : Transformation de l'erreur pour la consommation de l'utilisateur
      this.log(`${operation} echec: ${error.message}`);

      // Laissez l'application continuer à fonctionner en renvoyant un résultat vide.
      return of(result as T);
    };
  }
}
