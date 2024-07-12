import { Component, OnInit, HostListener } from '@angular/core';
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
  seasonImage: string = '';
  showScrollToTop: boolean = false;

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

  private seasonImages: { [key: string]: string } = {
    '5': 'assets/clearWinter1.svg',
    '6': 'assets/coolWinter1.svg',
    '7': 'assets/deepWinter1.svg',
    '8': 'assets/softSummer1.svg',
    '9': 'assets/coolSummer1.svg',
    '10': 'assets/lightSummer1.svg',
    '11': 'assets/clearSpring1.svg',
    '12': 'assets/warmSpring1.svg',
    '13': 'assets/lightSpring1.svg',
    '14': 'assets/softAutumn1.svg',
    '15': 'assets/warmAutumn1.svg',
    '16': 'assets/deepAutumn1.svg'
  };

  constructor(private route: ActivatedRoute, private colorService: ColorService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.route.paramMap.subscribe(params => {
      const subcategoryId = params.get('subcategory_id');
      if (subcategoryId) {
        this.colorService.getColorDetails(Number(subcategoryId)).subscribe((data: any) => {
          this.colorDetails = data.data;
          this.filterColorDetails();
          this.seasonName = this.getSeasonName(Number(subcategoryId));
          this.bgColor = this.getBgColor(Number(subcategoryId));
          this.seasonImage = this.getSeasonImage(Number(subcategoryId));
        });
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollToTop = window.pageYOffset > 300;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getSeasonName(id: number): string {
    return this.seasonNames[id.toString()] || 'Unknown Season';
  }

  getBgColor(id: number): string {
    return this.seasonColors[id.toString()] || '#6094E9';
  }

  getSeasonImage(id: number): string {
    return this.seasonImages[id.toString()] || 'assets/forgot_asset.svg';
  }

  setCategory(category: string): void {
    this.selectedCategory = category;
    this.filterColorDetails();
    window.scrollTo(400, 400);
  }

  filterColorDetails(): void {
    this.filteredColorDetails = this.colorDetails.filter(
      (item: any) => item.category.toLowerCase() === this.selectedCategory
    );
  }
}
