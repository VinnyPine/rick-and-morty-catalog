import { Component, inject, OnInit, output, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints, LayoutModule, MediaMatcher } from '@angular/cdk/layout'

@Component({
  selector: 'app-header',
  imports: [ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private router = inject(Router);
  breakpointObserver = inject(BreakpointObserver);
  isLargeScreen = signal(false);
  toggleSearch = signal(false);
  toggleFilter = output<boolean>();
  search = new FormControl('', { nonNullable: true });
  togglePage = new FormControl('character', { nonNullable: true });

  handleSearch() {
    console.log("🚀 ~ HeaderComponent ~ handleSearch ~ this.isLargeScreen():", this.isLargeScreen())

    if (this.search.value && this.toggleSearch()) {
      console.log('🚀 ~ HeaderComponent ~ REQUEST');
      console.log('🚀 ~ HeaderComponent ~ this.search:', this.search);
    }

    this.toggleSearch.update((v) => !v);
    this.toggleFilter.emit(this.toggleSearch());
  }

  handlePage() {
    this.router.navigate([this.togglePage.value]);
  }

  toggleButtonClass() {
    if (this.search.value && !this.toggleSearch())
      return 'material-icons md-blue';
    return 'material-icons';
  }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(res => {
      this.isLargeScreen.set(res.matches)
    })
  }
}
