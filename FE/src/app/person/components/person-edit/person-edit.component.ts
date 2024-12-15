import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person';
import { PersonService } from '../../services/person.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import * as jsonPatch from 'fast-json-patch';

@Component({
  selector: 'app-person-edit',
  imports: [FormsModule],
  templateUrl: './person-edit.component.html',
  styleUrl: './person-edit.component.scss'
})
export class PersonEditComponent implements OnInit {
  person: Person = { id: '', name: '', age: 0, address: { street: '', city: '', state: '', zip: '' } };
  originalPerson: Person | null = null;
  isEdit = false;

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.personService.getById(id)
        .subscribe(person => {
          const existingPerson = person
          if (existingPerson) {
            this.person = { ...existingPerson, address: { ...existingPerson.address } };
            this.originalPerson = { ...existingPerson, address: { ...existingPerson.address } };
            this.isEdit = true;
          } else {
            this.person = { id: '', name: '', age: 0, address: { street: '', city: '', state: '', zip: '' } };
          }
        });
    }
  }

  savePerson(): void {
    if (this.isEdit) {
      const patchOperations = this.calculatePatch(this.originalPerson, this.person);
      this.personService.patchUpdate(this.person.id, patchOperations)
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    } else {
      this.personService.create(this.person)
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    }
  }

  calculatePatch(original: any, updated: any): any[] {
    if (!original) return [];
    return jsonPatch.compare(original, updated);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}