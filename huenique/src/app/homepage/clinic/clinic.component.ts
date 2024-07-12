import { Component, OnInit } from '@angular/core';
import { ClinicService } from '../../../service/clinic.service';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent implements OnInit {
  clinics: any[] = [];
  error: boolean = false;

  constructor(private clinicService: ClinicService) { }

  ngOnInit(): void {
    this.clinicService.getClinics().subscribe({
      next: (data) => {
        this.clinics = data;
      },
      error: (err) => {
        console.error('Error fetching clinic data', err);
        this.error = true;
      }
    });
  }
}