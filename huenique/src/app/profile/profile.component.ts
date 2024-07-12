import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { QuestionService } from '../../service/question.service';
import { SeasonalDescriptionsService } from '../../service/seasonal-descriptions-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  testResult: any;
  testHistory: any[] = [];
  paginatedTestHistory: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  seasonalDescription: string = '';
  seasonImage: string = '';
  seasonPercentages: { seasonId: number, percentage: number, seasonName: string }[] = [];
  subcategoryPercentages: { subcategoryId: number, percentage: number, subcategoryName: string }[] = [];

  constructor(
    private authService: AuthService,
    private questionService: QuestionService,
    private seasonalDescriptionsService: SeasonalDescriptionsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadTestResult();
    this.loadTestHistory();
    this.loadSeasonPercentages();
  }

  loadUserProfile(): void {
    this.authService.getUserProfile().subscribe(
      data => {
        this.user = data;
      },
      error => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  loadTestResult(): void {
    this.questionService.getTestResult().subscribe(
      data => {
        this.testResult = data;
        const key = this.testResult.subcategory_name ? this.testResult.subcategory_name : this.testResult.season_name;
        this.seasonalDescription = this.seasonalDescriptionsService.getDescription(key);
        this.seasonImage = this.getSeasonImage(key);
      },
      error => {
        console.error('Error fetching test result:', error);
      }
    );
  }

  getSeasonImage(seasonOrSubcategory: string): string {
    const imageMap: { [key: string]: string } = {
      'Clear Winter': 'assets/clearWinter1.svg',
      'Cool Winter': 'assets/coolWinter1.svg',
      'Deep Winter': 'assets/deepWinter1.svg',
      'Light Summer': 'assets/lightSummer1.svg',
      'Cool Summer': 'assets/coolSummer1.svg',
      'Soft Summer': 'assets/softSummer1.svg',
      'Light Spring': 'assets/lightSpring1.svg',
      'Warm Spring': 'assets/warmSpring1.svg',
      'Clear Spring': 'assets/clearSpring1.svg',
      'Soft Autumn': 'assets/softAutumn1.svg',
      'Warm Autumn': 'assets/warmAutumn1.svg',
      'Deep Autumn': 'assets/deepAutumn1.svg',
      'Winter': 'assets/deepWinter1.svg',
      'Summer': 'assets/lightSummer1.svg',
      'Spring': 'assets/lightSpring1.svg',
      'Autumn': 'assets/deepAutumn1.svg'
    };

    return imageMap[seasonOrSubcategory] || 'assets/defaultImage.svg';
  }

  loadTestHistory(): void {
    this.questionService.getTestHistory().subscribe(
      data => {
        this.testHistory = data.map(history => ({
          ...history,
          result_date: new Date(history.result_date).toISOString().split('T')[0]
        }));
        this.totalPages = Math.ceil(this.testHistory.length / this.itemsPerPage);
        this.updatePaginatedTestHistory();
      },
      error => {
        console.error('Error fetching test history:', error);
      }
    );
  }

  updatePaginatedTestHistory(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTestHistory = this.testHistory.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedTestHistory();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedTestHistory();
    }
  }

  navigateToDetail(subcategoryId: number): void {
    this.router.navigate(['/homepage/colors', subcategoryId]);
  }

  loadSeasonPercentages(): void {
    const seasonPercentages = localStorage.getItem('seasonPercentages');
    const subcategoryPercentages = localStorage.getItem('subcategoryPercentages');
    if (seasonPercentages) {
      this.seasonPercentages = JSON.parse(seasonPercentages).map((percentage: any) => ({
        ...percentage,
        seasonName: this.getSeasonName(percentage.seasonId)
      }));
    }
    if (subcategoryPercentages) {
      this.subcategoryPercentages = JSON.parse(subcategoryPercentages).map((percentage: any) => ({
        ...percentage,
        subcategoryName: this.getSubcategoryName(percentage.subcategoryId)
      }));
    }
  }

  getSeasonName(seasonId: number): string {
    switch (seasonId) {
      case 1: return 'Winter';
      case 2: return 'Summer';
      case 3: return 'Autumn';
      case 4: return 'Spring';
      default: return 'Unknown';
    }
  }

  getSubcategoryName(subcategoryId: number): string {
    switch (subcategoryId) {
      case 5: return 'Clear Winter';
      case 6: return 'Cool Winter';
      case 7: return 'Deep Winter';
      case 8: return 'Soft Summer';
      case 9: return 'Cool Summer';
      case 10: return 'Light Summer';
      case 11: return 'Clear Spring';
      case 12: return 'Warm Spring';
      case 13: return 'Light Spring';
      case 14: return 'Soft Autumn';
      case 15: return 'Warm Autumn';
      case 16: return 'Deep Autumn';
      default: return 'Unknown';
    }
  }
}