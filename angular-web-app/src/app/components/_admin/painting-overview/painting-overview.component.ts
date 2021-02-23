import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Painting } from 'src/app/models/painting';
import { PaintingService } from 'src/app/services/painting.service';

@Component({
  selector: 'app-painting-overview',
  templateUrl: './painting-overview.component.html',
  styleUrls: ['./painting-overview.component.scss'],
})
export class PaintingOverviewComponent implements OnInit {
  title = 'Overzicht';
  subTitle = 'Portfolio';
  text = 'Hier is een overzicht van alle portfolio items te vinden.';
  paintings: Painting[];
  dataSource: any;
  displayedColumns: string[] = [
    'thumbnail',
    'title',
    'artist',
    'paint',
    'created',
    'active'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private paintingService: PaintingService) {}

  ngOnInit(): void {
    this.paintings = this.paintingService.getAllPaintings();
    this.dataSource = new MatTableDataSource(this.paintings);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  resetFilter(): void {
    this.dataSource.filter = null;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
