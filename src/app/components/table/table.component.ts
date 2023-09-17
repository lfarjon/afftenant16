import {
  Component,
  OnInit,
  ViewChild,
  Input,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { Article } from 'src/app/core/models/article';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() data!: any[];
  @Input() displayedColumns!: string[];
  @Output() selectionChange = new EventEmitter<any[]>();
  @Output() rowAction = new EventEmitter<any>();

  dataSource!: MatTableDataSource<any>;
  filterValue: string = '';
  selection = new SelectionModel<Article>(true, []);

  allColumns!: string[]; // <-- new array to hold all columns

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data);
    this.allColumns = ['select', ...this.displayedColumns]; // <-- populate the new array
    this.selection.changed.subscribe(() =>
      this.selectionChange.emit(this.selection.selected)
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  action(row: any) {
    this.rowAction.emit(row);
  }
}
