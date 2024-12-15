import { Routes } from '@angular/router';
import { PersonViewComponent } from './person/components/person-view/person-view.component';
import { PersonEditComponent } from './person/components/person-edit/person-edit.component';

export const routes: Routes = [
  { path: 'person', component: PersonViewComponent },
  { path: 'person-edit', component: PersonEditComponent },
  { path: 'person-edit/:id', component: PersonEditComponent },
  { path: '**', redirectTo: 'person' },
  { path: '', redirectTo: 'person', pathMatch: 'full' },
];
