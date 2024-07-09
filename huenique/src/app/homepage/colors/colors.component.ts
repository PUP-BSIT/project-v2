import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css']
})
export class ColorsComponent {
  constructor(private router: Router) {}

  navigateTo(season: string, color: string) {
    this.router.navigate([`/homepage/colors/${season}/${color}`]);
  }
}
