import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodashComponent } from './codash.component';

describe('CodashComponent', () => {
  let component: CodashComponent;
  let fixture: ComponentFixture<CodashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodashComponent]
    });
    fixture = TestBed.createComponent(CodashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
