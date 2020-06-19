import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueSidebarComponent } from './boutique-sidebar.component';

describe('BoutiqueSidebarComponent', () => {
  let component: BoutiqueSidebarComponent;
  let fixture: ComponentFixture<BoutiqueSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoutiqueSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoutiqueSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
