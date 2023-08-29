import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Website } from 'src/app/core/models/website';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantComponent {}
