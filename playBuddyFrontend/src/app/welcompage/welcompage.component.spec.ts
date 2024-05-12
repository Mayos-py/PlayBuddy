import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcompageComponent } from './welcompage.component';

describe('WelcompageComponent', () => {
  let component: WelcompageComponent;
  let fixture: ComponentFixture<WelcompageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelcompageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WelcompageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
