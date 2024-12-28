import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodesListComponent } from './episodes-list.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('EpisodesListComponent', () => {
  let component: EpisodesListComponent;
  let fixture: ComponentFixture<EpisodesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodesListComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(EpisodesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
