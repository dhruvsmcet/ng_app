import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserDetailComponent } from './create-user-detail.component';

describe('CreateUserDetailComponent', () => {
  let component: CreateUserDetailComponent;
  let fixture: ComponentFixture<CreateUserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUserDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
