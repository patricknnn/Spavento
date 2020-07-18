import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSmallComponent } from './header-small.component';

describe('HeaderSmallComponent', () => {
  let component: HeaderSmallComponent;
  let fixture: ComponentFixture<HeaderSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
