import { Component, OnInit } from '@angular/core';
import { PropertyCardComponent } from '../property-card/property-card/property-card.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HousingService } from '../../services/housing.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [PropertyCardComponent, HttpClientModule],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css',
})
export class PropertyListComponent implements OnInit {
  properties: any;
  SellRent = 1;
  constructor(
    private route: ActivatedRoute,
    private housingService: HousingService
  ) {}
  ngOnInit(): void {
    if (this.route.snapshot.url.toString()) {
      this.SellRent = 2;
    }
    this.housingService.getAllProperties(this.SellRent).subscribe((data) => {
      console.log(data);
      this.properties = data;
    });
  }
}
