import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorTestComponent } from './color-test.component';

describe('ColorTestComponent', () => {
  let component: ColorTestComponent;
  let fixture: ComponentFixture<ColorTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColorTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});