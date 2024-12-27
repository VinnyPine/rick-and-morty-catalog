import {
  Component,
  inject,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  BreakpointObserver,
  Breakpoints,
} from '@angular/cdk/layout';
import { RickandmortyapiService } from '../../services/rickandmortyapi.service';

@Component({
  selector: 'app-header',
  imports: [ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private router = inject(Router);
  breakpointObserver = inject(BreakpointObserver);
  rickandmortyapiService = inject(RickandmortyapiService);

  isSmallScreen = signal(false);
  toggleSearch = signal(false);
  toggleFilter = output<boolean>();

  search = new FormControl('', { nonNullable: true });
  togglePage = new FormControl('character', { nonNullable: true });

  handleSearch() {
    if (this.search.value && this.toggleSearch()) {
      this.rickandmortyapiService.getAllCharacters({ name: this.search.value });
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
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
      ])
      .subscribe((res) => {
        this.isSmallScreen.set(res.matches);
      });
  }
}
