import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css',
})
export class PropertyDetailComponent implements OnInit {
  onSelectNect() {
    this.propertyId += 1;
    this.router.navigate(['/property-detail', this.propertyId]);
  }
  back() {
    this.router.navigate(['/']);
  }
  public propertyId!: number;
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.propertyId = +this.route.snapshot.params['id'];
    this.route.params.subscribe((params) => {
      this.propertyId = +params['id'];
    });
  }
}
