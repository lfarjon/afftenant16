import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DomainService {
  private domain: string | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject('host') private host: string
  ) {}

  getDomain(): string {
    if (this.domain) {
      return this.domain;
    }

    let determinedDomain: string;

    if (isPlatformBrowser(this.platformId)) {
      determinedDomain = window.location.hostname;
    } else {
      determinedDomain = this.host;
    }

    this.domain = determinedDomain.replace(/^www\./, '');

    return this.domain;
  }
}
