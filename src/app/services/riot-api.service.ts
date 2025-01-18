import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RiotApiService {
  private baseUrl = 'http://localhost:3000/api/champion-rotations';
  private dataDragonUrl = 'https://ddragon.leagueoflegends.com/cdn/14.24.1/data/en_US/champion.json';
  private masteryUrl = 'http://localhost:3000/api/champion-mastery/98';

  constructor(private http: HttpClient) {}

  getWeeklyRotation(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getChampionDetails(): Observable<any> {
    return this.http.get(this.dataDragonUrl);
  }

  getChampionMastery(): Observable<any> {
    return this.http.get(this.masteryUrl);
  }
}
