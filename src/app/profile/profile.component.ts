import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Profile } from '../profile.model';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profiles: Profile[] = [];
  // profile: Profile = {
  //   name: '',
  //   email: '',
  //   // number: '',
  //   // address: []
  // };
  userEmail: string = '';
  matchedProfile: Profile | null = null;
  notFound: boolean = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.userEmail = this.auth.getUserEmail(); // login email
    this.auth.getProfiles().subscribe(data => {
      this.profiles = data;
      this.findByEmail(); // auto match based on login email
    });
  }

  findByEmail(): void {
    const match = this.profiles.find(p => p.email?.toLowerCase() === this.userEmail.toLowerCase());
    if (match) {
      this.matchedProfile = match;
      this.notFound = false;
    } else {
      this.matchedProfile = null;
      this.notFound = true;
    }
  }

  // submitProfile(): void {
  //   this.auth.saveProfile(this.profile).subscribe({
  //     next: (res) => {
  //       alert('Profile saved successfully!');
  //     },
  //     error: (err) => {
  //       console.error('Error saving profile:', err);
  //     }
  //   });
  // }
}
