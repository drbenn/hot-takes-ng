import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributorPostsComponent } from './contributor-posts.component';

describe('ContributorPostsComponent', () => {
  let component: ContributorPostsComponent;
  let fixture: ComponentFixture<ContributorPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContributorPostsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContributorPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
