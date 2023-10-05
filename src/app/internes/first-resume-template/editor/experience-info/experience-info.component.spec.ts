import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceInfoComponent } from './experience-info.component';

describe('ExperienceInfoComponent', () => {
  let component: ExperienceInfoComponent;
  let fixture: ComponentFixture<ExperienceInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExperienceInfoComponent]
    });
    fixture = TestBed.createComponent(ExperienceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
