import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AffiliateTool } from 'src/app/core/models/affiliate-tool';
import { AffiliateToolsService } from 'src/app/core/services/affiliate-tools.service';

@Component({
  selector: 'app-tool-builder',
  templateUrl: './tool-builder.component.html',
  styleUrls: ['./tool-builder.component.scss'],
})
export class ToolBuilderComponent {
  selectedTool$: Observable<AffiliateTool>;

  constructor(
    private toolsService: AffiliateToolsService,
    private route: ActivatedRoute
  ) {
    const toolId = this.route.snapshot.params['toolId'];
    this.selectedTool$ = this.toolsService.getTool(toolId).valueChanges();
  }
}
