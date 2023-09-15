import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritableSignalComponent } from './writable-signal.component';

describe('WritableSignalComponent', () => {
  let component: WritableSignalComponent;
  let fixture: ComponentFixture<WritableSignalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WritableSignalComponent]
    });
    fixture = TestBed.createComponent(WritableSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
