import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent {
  @Input() ratings!: number | undefined;

  // Function to generate an array of star icon names
  getStarIcons(rating: number): string[] {
    const filledStars = Math.floor(rating); // Number of filled stars
    const hasHalfStar = rating - filledStars >= 0.5; // Check for a half-star

    const starIcons: string[] = [];

    // Add filled stars
    for (let i = 0; i < filledStars; i++) {
      starIcons.push('star');
    }

    // Add half star if applicable
    if (hasHalfStar) {
      starIcons.push('star_half');
    }

    // Add unfilled stars to complete 5 stars
    while (starIcons.length < 5) {
      starIcons.push('star_border');
    }

    return starIcons;
  }
}
