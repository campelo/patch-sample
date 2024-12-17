import { AbstractServiceComponent } from "../services/abstract-service.component";
import { ActivatedRoute, Router } from "@angular/router";
import * as jsonPatch from 'fast-json-patch';
import { BaseDto } from "../models/base.dto";
import { Observable } from "rxjs";

export abstract class EditComponent<TDto extends BaseDto> {
  record: TDto = {} as TDto;
  originalRecord!: TDto;
  isEdit = false;

  constructor(
    protected personService: AbstractServiceComponent<TDto>,
    protected route: ActivatedRoute,
    protected router: Router,
    private readonly factory: () => TDto
  ) { }

  loadRecord(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.personService.getById(id)
        .subscribe(data => {
          if (data) {
            this.record = JSON.parse(JSON.stringify(data));
            this.originalRecord = JSON.parse(JSON.stringify(data));
            this.isEdit = true;
          }
        });
    }else{
      this.record = this.factory();
      this.isEdit = false;
    }
  }

  saveRecord(): void {
    let obs: Observable<TDto> = this.isEdit 
    ? this.personService.patchUpdate(this.record.id, this.calculatePatch(this.originalRecord, this.record))
    : this.personService.create(this.record);
    obs.subscribe(() => {
      this.goBack();
    });
  }

  calculatePatch(original: TDto, updated: TDto): any[] {
    if (!original) return [];
    return jsonPatch.compare(original, updated);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

}