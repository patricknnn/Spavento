import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { GeneralContent } from 'src/app/models/generalcontent';
import { NewsItem } from 'src/app/models/newsitem';
import { ContentService } from 'src/app/services/content.service';
import { ModalService } from 'src/app/services/modal.service';
import { NewsService } from 'src/app/services/news.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-news-overview',
  templateUrl: './news-overview.component.html',
  styleUrls: ['./news-overview.component.scss']
})
export class NewsOverviewComponent implements AfterViewInit {
  generalContent: GeneralContent;
  title = 'Overzicht';
  subTitle = 'Nieuws';
  text = 'Hier is een overzicht van alle nieuws items te vinden.';
  newsItems: NewsItem[];
  modalItem: NewsItem;
  displayedColumns: string[] = [
    'title',
    'author',
    'category',
    'created',
    'updated',
    'active',
    'options'
  ];
  formStyle = "standard";
  formColor = "accent";
  resultsLength = 0;
  isLoadingResults = true;
  dataSource: MatTableDataSource<NewsItem>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('modalContent') modalContent;

  constructor(
    private router: Router,
    private newsService: NewsService,
    private contentService: ContentService,
    private swalService: SwalService,
    private modalService: ModalService
  ) {
    this.generalContent = new GeneralContent();
    this.generalContent.cardElevation = "mat-elevation-z8";
    this.generalContent.formStyle = "standard";
    this.generalContent.formColor = "accent";
  }

  ngAfterViewInit(): void {
    this.retrieveItems();
    this.retrieveGeneralContent();
  }

  retrieveItems(): void {
    this.newsService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      ))
      .subscribe((data) => {
        this.newsItems = data;
        this.isLoadingResults = false;
        this.resultsLength = data.length;
        this.initTable(data);
      });
  }

  retrieveGeneralContent(): void {
    this.contentService.getGeneralContent(1).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.generalContent = data[0];
    });
  }

  initTable(data): void {
    this.dataSource = new MatTableDataSource<NewsItem>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'created': return item.timestampCreated;
        case 'updated': return item.timestampUpdated;
        default: return item[property];
      }
    };
    this.dataSource.sort = this.sort;
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
   * Updates active state of painting
   * @param painting Painting to update
   * @param e Event
   */
  setActiveState(item: NewsItem, e): void {
    let msg = "";
    if (e.checked) {
      item.active = true;
      msg = "Nieuws item zichtbaar op website";
    } else {
      item.active = false;
      msg = "Nieuws item niet zichtbaar op website";
    }
    this.newsService.update(item.id, item).then(() => {
      this.swalService.successSwal(msg);
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

  // Open edit page
  goToNewsEdit(itemId: number): void {
    this.router.navigate(['/admin/news-edit', { id: itemId }]);
  }

  // Open modal
  openModalItem(item: NewsItem): void {
    this.modalItem = item;
    this.modalService.openModal(this.modalContent);
  }
}
