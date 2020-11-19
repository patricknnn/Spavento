import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SectionTitleCenterComponent } from './section-title-center.component';

describe('SectionTitleCenterComponent', () => {
  let component: SectionTitleCenterComponent;
  let fixture: ComponentFixture<SectionTitleCenterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionTitleCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionTitleCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
