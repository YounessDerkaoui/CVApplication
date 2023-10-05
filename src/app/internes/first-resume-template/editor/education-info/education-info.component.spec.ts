import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationInfoComponent } from './education-info.component';

describe('EducationInfoComponent', () => {
  let component: EducationInfoComponent;
  let fixture: ComponentFixture<EducationInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EducationInfoComponent]
    });
    fixture = TestBed.createComponent(EducationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
