import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Person } from '../../models/person';
import { PersonService } from '../../services/person.service';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-person-view',
  imports: [CommonModule],
  templateUrl: './person-view.component.html',
  styleUrl: './person-view.component.scss'
})
export class PersonViewComponent implements OnInit, OnDestroy {
  people: Person[] = [];
  private routerSubscription: Subscription = new Subscription();

  constructor(
    private readonly personService: PersonService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.loadPeople();

    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.router.url === '/person-view') {
        this.loadPeople();
      }
    });
  }

  loadPeople(): void {
    this.personService.getAll().subscribe(people => this.people = people);
  }

  createNew(): void {
    this.router.navigate(['/person-edit']);
  }

  editPerson(id: string): void {
    this.router.navigate(['/person-edit', id]);
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}