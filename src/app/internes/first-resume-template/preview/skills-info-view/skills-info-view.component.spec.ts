import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsInfoViewComponent } from './skills-info-view.component';

describe('SkillsInfoViewComponent', () => {
  let component: SkillsInfoViewComponent;
  let fixture: ComponentFixture<SkillsInfoViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkillsInfoViewComponent]
    });
    fixture = TestBed.createComponent(SkillsInfoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
