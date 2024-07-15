import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckreportComponent } from './checkreport.component';

describe('CheckreportComponent', () => {
  let component: CheckreportComponent;
  let fixture: ComponentFixture<CheckreportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckreportComponent]
    });
    fixture = TestBed.createComponent(CheckreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
