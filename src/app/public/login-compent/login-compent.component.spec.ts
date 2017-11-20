import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCompentComponent } from './login-compent.component';

describe('LoginCompentComponent', () => {
  let component: LoginCompentComponent;
  let fixture: ComponentFixture<LoginCompentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginCompentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCompentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
