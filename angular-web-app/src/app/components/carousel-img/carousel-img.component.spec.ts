import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CarouselImgComponent } from './carousel-img.component';

describe('CarouselImgComponent', () => {
  let component: CarouselImgComponent;
  let fixture: ComponentFixture<CarouselImgComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
