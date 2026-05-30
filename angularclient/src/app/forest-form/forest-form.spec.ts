import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForestForm } from './forest-form';

describe('ForestForm', () => {
  let component: ForestForm;
  let fixture: ComponentFixture<ForestForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForestForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ForestForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
