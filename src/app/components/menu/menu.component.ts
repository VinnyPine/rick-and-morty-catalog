import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  imports: [ReactiveFormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @Input() filtersForm!: FormGroup;

  unselectStatus() {
    this.filtersForm.get('status')?.setValue(null);
  }

  unselectGender() {
    this.filtersForm.get('gender')?.setValue(null);
  }
}
