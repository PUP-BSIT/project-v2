import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-color-detail',
  templateUrl: './color-detail.component.html',
  styleUrls: ['./color-detail.component.css']
})
export class ColorDetailComponent implements OnInit {
  season: string = '';
  color: string = '';
  colorDetail: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.season = this.route.snapshot.paramMap.get('season') || '';
    this.color = this.route.snapshot.paramMap.get('color') || '';
    this.fetchColorDetail();
  }

  fetchColorDetail(): void {
    // Replace the URL with your actual API endpoint
    this.http.get(`/api/colors/${this.season}/${this.color}`).subscribe(data => {
      this.colorDetail = data;
    });
  }
}
