import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { IHero } from '../../models/ihero';

@Injectable({
  providedIn: 'root',
})
export class HeroServiceForLab {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  heroesUrl = 'http://localhost:3000/heroes'; // URL to web api

  constructor(private http: HttpClient) {}

  /** GET heroes from the server */
  getHeroes(): Observable<IHero[]> {
    return this.http.get<IHero[]>(this.heroesUrl);
  }

  /** PUT: update the hero on the server */
  updateHero(hero: IHero): Observable<IHero> {
    return this.http.put(
      `${this.heroesUrl}/${hero.id}`,
      hero,
      this.httpOptions,
    ) as Observable<IHero>;
  }
}
