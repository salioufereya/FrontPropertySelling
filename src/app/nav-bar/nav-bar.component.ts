import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('you are logged out');
  }
  loggedInUser!: string;
  loggedIn() {
    this.loggedInUser = localStorage.getItem('user')!;
    return this.loggedInUser;
  }
}
