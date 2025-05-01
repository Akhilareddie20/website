import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: false,
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  constructor(private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  } 
}
