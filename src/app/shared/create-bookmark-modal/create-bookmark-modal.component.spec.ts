import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBookmarkModalComponent } from './create-bookmark-modal.component';

describe('CreateBookmarkModalComponent', () => {
  let component: CreateBookmarkModalComponent;
  let fixture: ComponentFixture<CreateBookmarkModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBookmarkModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBookmarkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
