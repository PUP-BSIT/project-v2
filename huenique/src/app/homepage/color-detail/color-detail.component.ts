import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColorService } from '../../../service/color.service';

@Component({
  selector: 'app-color-detail',
  templateUrl: './color-detail.component.html',
  styleUrls: ['./color-detail.component.css']
})
export class ColorDetailComponent implements OnInit {
  colorDetails: any;

  constructor(private route: ActivatedRoute, private colorService: ColorService) {}

  ngOnInit(): void {
    const subcategoryId = this.route.snapshot.paramMap.get('subcategory_id');
    this.colorService.getColorDetails(Number(subcategoryId)).subscribe((data: any) => {
      this.colorDetails = data.data;
    });
  }
}