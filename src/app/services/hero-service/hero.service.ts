import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IHero } from '../../models/ihero';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  heroesUrl = 'http://localhost:3000/heroes';

  private http = inject(HttpClient);
  private messageService = inject(MessageService);

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<IHero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<IHero>(url).pipe(tap((_) => this.log(`fetched hero id=${id}`)));
  }

  /** GET heroes from the server */
  getHeroes(): Observable<IHero[]> {
    return this.http.get<IHero[]>(this.heroesUrl).pipe(tap(() => this.log(`fetched heroes`)));
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<IHero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http
      .get<IHero[]>(`http://localhost:3000/heroes/?name=${term}`)
      .pipe(tap((_) => this.log(`found heroes matching "${term}"`)));
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addHero(hero: IHero): Observable<IHero> {
    return this.http
      .post<IHero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(tap((hero: IHero) => this.log(`added hero w/ id=${hero.id}`)));
  }

  /** DELETE: delete the hero from the server */
  deleteHero(hero: IHero | number): Observable<IHero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http
      .delete<IHero>(url, this.httpOptions)
      .pipe(tap((_) => this.log(`deleted hero id=${id}`)));
  }

  /** PUT: update the hero on the server */
  updateHero(hero: IHero): Observable<IHero | Object> {
    return this.http
      .patch(`${this.heroesUrl}/${hero.id}`, hero, this.httpOptions)
      .pipe(tap((_) => this.log(`updated hero id=${hero.id}`)));
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
}
