import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorAnalysisComponent } from './color-analysis.component';

describe('ColorAnalysisComponent', () => {
  let component: ColorAnalysisComponent;
  let fixture: ComponentFixture<ColorAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColorAnalysisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
