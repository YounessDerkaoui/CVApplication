import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInfoViewComponent } from './basic-info-view.component';

describe('BasicInfoViewComponent', () => {
  let component: BasicInfoViewComponent;
  let fixture: ComponentFixture<BasicInfoViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasicInfoViewComponent]
    });
    fixture = TestBed.createComponent(BasicInfoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
