import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Your Angular App';
  data: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // const domain = window.location.hostname;
    // console.log(domain);
    // const url = `https://us-central1-tecrecruite.cloudfunctions.net/fetchTenantData?domain=${domain}`;
    // this.http.get(url).subscribe({
    //   next: response => {
    //     this.data = response;
    //     console.log(this.data);
    //   },
    //   error: error => {
    //     console.error('Error fetching data:', error);
    //   }
    // });
  }
}
