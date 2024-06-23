import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BelongingsComponent } from './belongings.component';

describe('BelongingsComponent', () => {
  let component: BelongingsComponent;
  let fixture: ComponentFixture<BelongingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BelongingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BelongingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
