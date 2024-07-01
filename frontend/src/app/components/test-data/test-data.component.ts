import { Component, inject, OnInit } from '@angular/core';
import { TestDataService } from "../../services/test-data/test-data.service";
import { Subject } from "rxjs";

@Component({
  selector: 'app-test-data',
  templateUrl: './test-data.component.html',
  styleUrl: './test-data.component.scss'
})
export class TestDataComponent implements OnInit{
  testDataService:TestDataService = inject(TestDataService)
  newData = { name: '' };
  data$: Subject<any[]> = new Subject();

  loading = false;
  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.loading = true;
    this.testDataService.getAll().subscribe((data: any) => {
      this.loading = false;
      this.data$.next(data);
    });
  }

  addData(): void {
    if (this.newData.name) {
      this.testDataService.create(this.newData).subscribe(() => {
        this.getData()
      });
    }
  }
}
