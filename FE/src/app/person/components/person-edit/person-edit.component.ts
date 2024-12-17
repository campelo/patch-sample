import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person';
import { PersonService } from '../../services/person.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EditComponent } from '../../../shared/components/edit.component';

@Component({
  selector: 'app-person-edit',
  imports: [FormsModule],
  templateUrl: './person-edit.component.html',
  styleUrl: './person-edit.component.scss'
})
export class PersonEditComponent extends EditComponent<Person> implements OnInit {
  constructor(
    personService: PersonService,
    route: ActivatedRoute,
    router: Router
  ) {
    super(personService, route, router, () => new Person());
  }

  ngOnInit(): void {
    this.loadRecord();
  }

}