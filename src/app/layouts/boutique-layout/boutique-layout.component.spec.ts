import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueLayoutComponent } from './boutique-layout.component';

describe('BoutiqueLayoutComponent', () => {
  let component: BoutiqueLayoutComponent;
  let fixture: ComponentFixture<BoutiqueLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoutiqueLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoutiqueLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
