import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FogotPwdComponentComponent } from './fogot-pwd-component.component';

describe('FogotPwdComponentComponent', () => {
  let component: FogotPwdComponentComponent;
  let fixture: ComponentFixture<FogotPwdComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FogotPwdComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FogotPwdComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
