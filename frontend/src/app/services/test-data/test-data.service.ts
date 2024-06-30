import { Injectable } from '@angular/core';
import { AbstractCrudService } from "../abstract-crud.service";

@Injectable({
  providedIn: 'root'
})
export class TestDataService extends AbstractCrudService<any>{
  protected getUrl(): string {
    return "/api/test-data";
  }
}
