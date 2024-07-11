import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColorService } from '../../../service/color.service';

@Component({
  selector: 'app-color-detail',
  templateUrl: './color-detail.component.html',
  styleUrls: ['./color-detail.component.css']
})
export class ColorDetailComponent implements OnInit {
  colorDetails: any[] = [];
  filteredColorDetails: any[] = [];
  selectedCategory: string = 'accessories';
  seasonName: string = '';
  bgColor: string = '';

  private seasonNames: { [key: string]: string } = {
    '1': 'Winter',
    '2': 'Summer',
    '3': 'Autumn',
    '4': 'Spring',
    '5': 'Clear Winter',
    '6': 'Cool Winter',
    '7': 'Deep Winter',
    '8': 'Soft Summer',
    '9': 'Cool Summer',
    '10': 'Light Summer',
    '11': 'Clear Spring',
    '12': 'Warm Spring',
    '13': 'Light Spring',
    '14': 'Soft Autumn',
    '15': 'Warm Autumn',
    '16': 'Deep Autumn'
  };

  private seasonColors: { [key: string]: string } = {
    '1': '#1C417D',
    '5': '#1C417D',
    '6': '#1C417D',
    '7': '#1C417D',
    '2': '#9BC9FD',
    '8': '#9BC9FD',
    '9': '#9BC9FD',
    '10': '#9BC9FD',
    '4': '#FF6594',
    '11': '#FF6594',
    '12': '#FF6594',
    '13': '#FF6594',
    '3': '#B68553',
    '14': '#B68553',
    '15': '#B68553',
    '16': '#B68553'
  };

  constructor(private route: ActivatedRoute, private colorService: ColorService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const subcategoryId = this.route.snapshot.paramMap.get('subcategory_id');
    console.log('subcategoryId:', subcategoryId);
    this.colorService.getColorDetails(Number(subcategoryId)).subscribe((data: any) => {
      this.colorDetails = data.data;
      console.log('colorDetails:', this.colorDetails);
      this.filterColorDetails();
      this.seasonName = this.getSeasonName(Number(subcategoryId));
      this.bgColor = this.getBgColor(Number(subcategoryId));
      console.log('seasonName:', this.seasonName);
      console.log('bgColor:', this.bgColor);
      this.cdr.detectChanges();
    });
  }

  getSeasonName(id: number): string {
    return this.seasonNames[id.toString()] || 'Unknown Season';
  }

  getBgColor(id: number): string {
    return this.seasonColors[id.toString()] || '#6094E9';
  }

  setCategory(category: string): void {
    this.selectedCategory = category;
    this.filterColorDetails();
  }

  filterColorDetails(): void {
    this.filteredColorDetails = this.colorDetails.filter(
      (item: any) => item.category.toLowerCase() === this.selectedCategory
    );
  }
}
