import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class BelongingsService {
  private apiUrl = 'https://localhost/api/belongings';
  http: HttpClient = inject(HttpClient)


  constructor() {}

  getBelongings(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addBelonging(belonging: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, belonging);
  }
}
