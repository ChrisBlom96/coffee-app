import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoffeeFlavoursPage } from './coffee-flavours.page';

describe('CoffeeFlavoursPage', () => {
  let component: CoffeeFlavoursPage;
  let fixture: ComponentFixture<CoffeeFlavoursPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CoffeeFlavoursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
