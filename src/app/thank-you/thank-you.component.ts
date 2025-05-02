import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thank-you',
  standalone: false,
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.css'
})
export class ThankYouComponent {
  constructor(private router:Router){}
  gotohome(){
    this.router.navigate(['/desktop'])
  }
}
