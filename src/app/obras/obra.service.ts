import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DESAFIO_API } from '../app.api';

export class ObraFilter {
  nome: string;
  descricao: string;
  page = 0;
  size = 5;
}

@Injectable({
  providedIn: 'root'
})
export class ObraService {
  obrasUrl = `${DESAFIO_API}/obras`;

  constructor(private http: HttpClient) {}

  search(filter: ObraFilter): Observable<any> {
    let params = new HttpParams()
      .set('page', filter.page.toString())
      .set('size', filter.size.toString());

    if (filter.nome) {
      params = params.set('nome', filter.nome);
    }

    if (filter.descricao) {
      params = params.set('descricao', filter.descricao);
    }

    return this.http.get<any>(this.obrasUrl, { params }).pipe(
      map(response => {
        const result = {
          obras: response.content,
          totalRecords: response.totalElements
        };
        return result;
      })
    );
  }

  save(obra: any) {
    if (obra.codigo == null) {
      return this.http.post<any>(this.obrasUrl, obra);
    } else {
      return this.http.put<any>(`${this.obrasUrl}/${obra.codigo}`, obra);
    }
  }

  delete(codigo: number): Observable<void> {
    return this.http.delete<void>(`${this.obrasUrl}/${codigo}`);
  }

  getObrasAsSelectItem(): Observable<any> {
    return this.http.get<[any]>(`${this.obrasUrl}/resumo`).pipe(
      map(obraResumo => {
        return obraResumo.map(x => {
          return { label: x.nome, value: x };
        });
      })
    );

  }

}
