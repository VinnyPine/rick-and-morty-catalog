import {
  Component,
  inject,
  Input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  imports: [ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private router = inject(Router);
  breakpointObserver = inject(BreakpointObserver);

  isSmallScreen = signal(false);
  toggleSearch = signal(false);

  @Input() searchBy!: FormControl<string>;
  @Input() searchInput!: FormControl<string>;
  @Input() togglePage!: FormControl<'character' | 'episode'>;

  submit = output();

  handleSubmit(e?: SubmitEvent) {
    if (e) e.preventDefault();
    this.submit.emit();
  }

  handlePage() {
    this.searchBy.setValue('name');
    this.router.navigate([this.togglePage.value]);
  }

  toggleButtonClass() {
    // if (this.search.value && !this.toggleSearch())
    //   return 'material-icons md-blue';
    return 'material-icons';
  }

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.XSmall]).subscribe((res) => {
      this.isSmallScreen.set(res.matches);
    });
  }
}
