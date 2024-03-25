import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Profile1Page } from './profile1.page';

describe('Profile1Page', () => {
  let component: Profile1Page;
  let fixture: ComponentFixture<Profile1Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Profile1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
