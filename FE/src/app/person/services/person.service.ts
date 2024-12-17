import { Injectable } from '@angular/core';
import { Person } from '../models/person';
import { HttpClient } from '@angular/common/http';
import { AbstractServiceComponent } from '../../shared/services/abstract-service.component';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends AbstractServiceComponent<Person> {
  constructor(http: HttpClient) {
    super(http);
  }

  get apiUrl(): string {
    return 'http://localhost:7258/api/Person';
  }
}