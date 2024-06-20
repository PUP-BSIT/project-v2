import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonalToneComponent } from './seasonal-tone.component';

describe('SeasonalToneComponent', () => {
  let component: SeasonalToneComponent;
  let fixture: ComponentFixture<SeasonalToneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeasonalToneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeasonalToneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
