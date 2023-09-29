import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlavourEditPage } from './flavour-edit.page';

describe('FlavourEditPage', () => {
  let component: FlavourEditPage;
  let fixture: ComponentFixture<FlavourEditPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FlavourEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
