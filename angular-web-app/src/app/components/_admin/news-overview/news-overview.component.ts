import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { NewsItem } from 'src/app/models/newsitem';
import { ModalService } from 'src/app/services/modal.service';
import { NewsService } from 'src/app/services/news.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-news-overview',
  templateUrl: './news-overview.component.html',
  styleUrls: ['./news-overview.component.scss']
})
export class NewsOverviewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('modalContent') modalContent;
  title = 'Overzicht';
  subTitle = 'Nieuws';
  text = 'Hier is een overzicht van alle nieuws items te vinden.';
  newsItems: NewsItem[];
  modalItem: NewsItem;
  dataSource: any;
  displayedColumns: string[] = [
    'image',
    'title',
    'author',
    'category',
    'created',
    'active',
    'options'
  ];
  formStyle = "standard";
  formColor = "accent";

  constructor(
    private newsService: NewsService,
    private swalService: SwalService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.retrieveItems();
  }

  initTable(): void {
    this.dataSource = new MatTableDataSource(this.newsItems);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  retrieveItems(): void {
    this.newsService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.newsItems = data;
      this.initTable();
    });
  }

  deleteItem(key): void {
    this.swalService.promptSwal("Dit kan niet worden terug gedraaid").then((result) => {
      if (result.value) {
        this.newsService.delete(key)
          .then(() => {
            this.swalService.successSwal("Nieuws item verwijderd")
          })
          .catch((err) => {
            this.swalService.errorSwal(err)
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.swalService.cancelSwal("Nieuws item niet verwijderd");
      }
    });
  }

  /**
   * Apply filter to the table view
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Reset the table view filter
   */
  resetFilter(): void {
    this.dataSource.filter = null;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openModalItem(item: NewsItem): void {
    this.modalItem = item;
    this.modalService.openModal(this.modalContent);
  }
}
