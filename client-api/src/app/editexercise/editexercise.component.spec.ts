import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditexerciseComponent } from './editexercise.component';

describe('EditexerciseComponent', () => {
  let component: EditexerciseComponent;
  let fixture: ComponentFixture<EditexerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditexerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditexerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
