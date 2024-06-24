import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BelongingsService } from "../services/belongings/belongings.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-belongings',
  templateUrl: './belongings.component.html',
  styleUrls: ['./belongings.component.scss'],
})
export class BelongingsComponent implements OnInit {
  belongings: any[] = [];
  newBelonging = { name: '' };

  constructor(private belongingsService: BelongingsService) { }

  ngOnInit(): void {
    this.getBelongings();
  }

  getBelongings(): void {
    this.belongingsService.getBelongings().subscribe((data: any) => {
      this.belongings = data;
    });
  }

  addBelonging(): void {
    if (this.newBelonging.name) {
      this.belongingsService.addBelonging(this.newBelonging).subscribe(() => {
        this.getBelongings();
        this.newBelonging.name = '';
      });
    }
  }
}
