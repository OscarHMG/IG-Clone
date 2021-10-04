import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopNewpostcomponentComponent } from './pop-newpostcomponent.component';

describe('PopNewpostcomponentComponent', () => {
  let component: PopNewpostcomponentComponent;
  let fixture: ComponentFixture<PopNewpostcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopNewpostcomponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopNewpostcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
