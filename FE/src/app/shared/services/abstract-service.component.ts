import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export abstract class AbstractServiceComponent<TDto> {
  abstract get apiUrl(): string;

  constructor(protected http: HttpClient) { }

  getAll(): Observable<TDto[]> {
    return this.http.get<TDto[]>(`${this.apiUrl}`);
  }

  getById(id: string): Observable<TDto> {
    return this.http.get<TDto>(`${this.apiUrl}/${id}`);
  }

  create(dto: TDto): Observable<TDto> {
    return this.http.post<TDto>(this.apiUrl, dto);
  }

  update(id: string, dto: TDto): Observable<TDto> {
    return this.http.put<TDto>(`${this.apiUrl}/${id}`, dto);
  }

  patchUpdate(id: string, patchOperations: any[]): Observable<TDto> {
    return this.http.patch<TDto>(`${this.apiUrl}/${id}`, patchOperations);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}