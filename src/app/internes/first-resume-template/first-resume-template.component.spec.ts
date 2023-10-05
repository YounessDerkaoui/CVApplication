import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstResumeTemplateComponent } from './first-resume-template.component';

describe('FirstResumeTemplateComponent', () => {
  let component: FirstResumeTemplateComponent;
  let fixture: ComponentFixture<FirstResumeTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirstResumeTemplateComponent]
    });
    fixture = TestBed.createComponent(FirstResumeTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
