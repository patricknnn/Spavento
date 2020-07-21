import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallToActionDividerComponent } from './call-to-action-divider.component';

describe('CallToActionDividerComponent', () => {
  let component: CallToActionDividerComponent;
  let fixture: ComponentFixture<CallToActionDividerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallToActionDividerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallToActionDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
