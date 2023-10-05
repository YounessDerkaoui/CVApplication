import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageInfoComponent } from './language-info.component';

describe('LanguageInfoComponent', () => {
  let component: LanguageInfoComponent;
  let fixture: ComponentFixture<LanguageInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageInfoComponent]
    });
    fixture = TestBed.createComponent(LanguageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
