import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationInfoViewComponent } from './education-info-view.component';

describe('EducationInfoViewComponent', () => {
  let component: EducationInfoViewComponent;
  let fixture: ComponentFixture<EducationInfoViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EducationInfoViewComponent]
    });
    fixture = TestBed.createComponent(EducationInfoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
