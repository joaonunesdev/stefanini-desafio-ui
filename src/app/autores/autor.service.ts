import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DESAFIO_API } from '../app.api';

export class AutorFilter {
  page = 0;
  size = 5;
}

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  constructor(private http: HttpClient) {}

  autoresUrl = `${DESAFIO_API}/autores`;

  search(filter: AutorFilter): Observable<any> {
    const params = new HttpParams()
      .set('page', filter.page.toString())
      .set('size', filter.size.toString());

    return this.http.get<any>(this.autoresUrl, { params }).pipe(
      map(response => {
        const result = {
          autores: response.content,
          totalRecords: response.totalElements
        };
        return result;
      })
    );
  }

  save(autor: any) {
     if (autor.codigo == null) {
      return this.http.post<any>(this.autoresUrl, autor);
    } else {
      return this.http.put<any>(`${this.autoresUrl}/${autor.codigo}`, autor);
    }
  }

  delete(codigo: number): Observable<void> {
    return this.http.delete<void>(`${this.autoresUrl}/${codigo}`);
  }

  getAutorAsSelectItem(): Observable<any> {
      return this.http.get<[any]>(`${this.autoresUrl}/resumo`).pipe(
      map(autorResumo => {
        return autorResumo.map(x => {
          return { label: x.nome, value: x };
        });
      })
    );

  }
}
