import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcreateComponent } from './dialogcreate.component';

describe('DialogcreateComponent', () => {
  let component: DialogcreateComponent;
  let fixture: ComponentFixture<DialogcreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogcreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
