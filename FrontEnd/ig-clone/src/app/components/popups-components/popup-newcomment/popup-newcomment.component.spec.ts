import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupNewcommentComponent } from './popup-newcomment.component';

describe('PopupNewcommentComponent', () => {
  let component: PopupNewcommentComponent;
  let fixture: ComponentFixture<PopupNewcommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupNewcommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupNewcommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
