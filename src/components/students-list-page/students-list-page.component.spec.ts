import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsListPageComponent } from './students-list-page.component';

describe('StudentsListPageComponent', () => {
  let component: StudentsListPageComponent;
  let fixture: ComponentFixture<StudentsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
