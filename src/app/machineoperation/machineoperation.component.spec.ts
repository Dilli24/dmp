import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineoperationComponent } from './machineoperation.component';

describe('MachineoperationComponent', () => {
  let component: MachineoperationComponent;
  let fixture: ComponentFixture<MachineoperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineoperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineoperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
