import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursierSidebarComponent } from './coursier-sidebar.component';

describe('CoursierSidebarComponent', () => {
  let component: CoursierSidebarComponent;
  let fixture: ComponentFixture<CoursierSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursierSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursierSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
