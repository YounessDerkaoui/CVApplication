import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceInfoViewComponent } from './experience-info-view.component';

describe('ExperienceInfoViewComponent', () => {
  let component: ExperienceInfoViewComponent;
  let fixture: ComponentFixture<ExperienceInfoViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExperienceInfoViewComponent]
    });
    fixture = TestBed.createComponent(ExperienceInfoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
