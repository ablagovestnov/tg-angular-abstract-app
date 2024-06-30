import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from "@angular/core";

export abstract class AbstractCrudService<T> {
  http: HttpClient = inject(HttpClient)

  constructor() {}

  protected abstract getUrl(): string;

  protected getParams(): HttpParams {
    return new HttpParams()
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.getUrl(), { params: this.getParams() });
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.getUrl()}/${id}`, { params: this.getParams() });
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.getUrl(), item, { params: this.getParams() });
  }

  update(id: number, item: T): Observable<T> {
    return this.http.put<T>(`${this.getUrl()}/${id}`, item, { params: this.getParams() });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.getUrl()}/${id}`, { params: this.getParams() });
  }
}
