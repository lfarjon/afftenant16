import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Website } from 'src/app/core/models/website';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss'],
})
export class TenantComponent {
  @Input() website!: Website;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
}
