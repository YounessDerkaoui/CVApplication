import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageInfoViewComponent } from './language-info-view.component';

describe('LanguageInfoViewComponent', () => {
  let component: LanguageInfoViewComponent;
  let fixture: ComponentFixture<LanguageInfoViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageInfoViewComponent]
    });
    fixture = TestBed.createComponent(LanguageInfoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
