import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionComponentComponent } from './reaction-component.component';

describe('ReactionComponentComponent', () => {
  let component: ReactionComponentComponent;
  let fixture: ComponentFixture<ReactionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactionComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
