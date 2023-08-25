import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Page } from 'src/app/core/models/page';
import { PagesService } from 'src/app/core/services/pages.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  pages$: Observable<Page[]>;

  constructor(
    private pagesService: PagesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    //this.pagesService.generateDefaultPages();
    this.pages$ = this.pagesService
      .getPages()
      .snapshotChanges()
      .pipe(
        map((actions: any) => {
          return actions.map((action: any) => {
            const id = action.payload.doc.id;
            const data = action.payload.doc.data();
            return { id, ...data };
          });
        })
      );
  }

  ngOnInit(): void {}

  handleSelectionChange(selectedRows: any) {
    console.log(selectedRows);
    // You can handle selected rows here.
  }

  handleAction(row: any) {
    this.router.navigate([
      'admin/website/' +
        this.route.snapshot.params['websiteId'] +
        '/page/' +
        row.id,
    ]);
  }
}
