import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalForSubjectsComponent } from './signal-for-subjects.component';

describe('SignalForSubjectsComponent', () => {
  let component: SignalForSubjectsComponent;
  let fixture: ComponentFixture<SignalForSubjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignalForSubjectsComponent]
    });
    fixture = TestBed.createComponent(SignalForSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
