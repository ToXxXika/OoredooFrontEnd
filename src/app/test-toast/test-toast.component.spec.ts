import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestToastComponent } from './test-toast.component';

describe('TestToastComponent', () => {
  let component: TestToastComponent;
  let fixture: ComponentFixture<TestToastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestToastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
