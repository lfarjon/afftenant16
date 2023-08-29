import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, catchError, map, of, take, tap } from 'rxjs';
import { DomainService } from 'src/app/core/services/domain.service';

import { WebsiteLoaderService } from 'src/app/core/services/website-loader.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
})
export class PublicComponent implements OnInit {
  website$!: Observable<any>;
  error$!: Observable<string>;

  constructor(
    private domainService: DomainService,
    private websiteService: WebsiteLoaderService
  ) {
    const cleanedDomain = this.domainService.getDomain();

    if (cleanedDomain === 'retailable.co' || cleanedDomain === 'localhost') {
      this.website$ = of({ domain: 'main' });
      return;
    }

    this.website$ = this.websiteService.getWebsiteData(cleanedDomain).pipe(
      map((data) => {
        if (
          !data &&
          (cleanedDomain.includes('.retailable.co') ||
            cleanedDomain.includes('.localhost'))
        ) {
          this.redirectToMainDomain();
          return null; // No data to pass further down the chain
        } else if (!data) {
          return { domain: 'main' }; // Default to main domain without redirection
        }
        return data; // If data exists, just pass it down
      }),
      catchError((error) => {
        console.error('Error fetching website data:', error);
        if (
          cleanedDomain.includes('.retailable.co') ||
          cleanedDomain.includes('.localhost')
        ) {
          this.redirectToMainDomain();
          return EMPTY; // No further emissions after redirection
        }
        return of({ domain: 'main' });
      })
    );
  }

  ngOnInit() {}

  redirectToMainDomain() {
    window.location.href = 'http://localhost:4200';
    // window.location.href = 'https://retailable.co'; // Change to your main domain URL
  }
}
