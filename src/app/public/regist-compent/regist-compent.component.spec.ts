import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistCompentComponent } from './regist-compent.component';

describe('RegistCompentComponent', () => {
  let component: RegistCompentComponent;
  let fixture: ComponentFixture<RegistCompentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistCompentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistCompentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
