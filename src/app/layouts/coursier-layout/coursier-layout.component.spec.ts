import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursierLayoutComponent } from './coursier-layout.component';

describe('CoursierLayoutComponent', () => {
  let component: CoursierLayoutComponent;
  let fixture: ComponentFixture<CoursierLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursierLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursierLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
