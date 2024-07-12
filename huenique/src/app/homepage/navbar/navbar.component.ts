import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isDropdownOpen = false;
  isDropdownMenuOpen = false;
  dropdownTimeout: any;

  constructor(private authService: AuthService) {}

  toggleDropdown(state: boolean, delay = false) {
    if (delay) {
      this.dropdownTimeout = setTimeout(() => {
        this.isDropdownOpen = state;
      }, 300);
    } else {
      clearTimeout(this.dropdownTimeout);
      this.isDropdownOpen = state;
    }
  }

  toggleDropdownMenu() {
    this.isDropdownMenuOpen = !this.isDropdownMenuOpen;
  }

  logout() {
    this.authService.logout();
  }
}
