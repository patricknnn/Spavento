import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingEditComponent } from './painting-edit.component';

describe('PaintingEditComponent', () => {
  let component: PaintingEditComponent;
  let fixture: ComponentFixture<PaintingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaintingEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
