import { Component } from '@angular/core';
import { LoaderService } from '../service/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'huenique';
  isLoading = false;

  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading.subscribe((v) => {
      this.isLoading = v;
    });
  }
}
