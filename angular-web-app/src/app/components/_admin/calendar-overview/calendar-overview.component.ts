import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CalendarItem } from 'src/app/models/calendaritem';
import { GeneralContent } from 'src/app/models/generalcontent';
import { CalendarService } from 'src/app/services/calendar.service';
import { ContentService } from 'src/app/services/content.service';
import { ModalService } from 'src/app/services/modal.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-calendar-overview',
  templateUrl: './calendar-overview.component.html',
  styleUrls: ['./calendar-overview.component.scss']
})
export class CalendarOverviewComponent implements AfterViewInit {
  generalContent: GeneralContent;
  title = 'Overzicht';
  subTitle = 'Kalender';
  text = 'Hier is een overzicht van alle kalender items te vinden.';
  calendarItems: CalendarItem[];
  modalItem: CalendarItem;
  displayedColumns: string[] = [
    'title',
    'location',
    'author',
    'created',
    'updated',
    'active',
    'options'
  ];
  resultsLength = 0;
  isLoadingResults = true;
  dataSource: MatTableDataSource<CalendarItem>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('modalContent') modalContent;

  constructor(
    private router: Router,
    private calendarService: CalendarService,
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
    this.calendarService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      ))
      .subscribe((data) => {
        this.calendarItems = data;
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
    this.dataSource = new MatTableDataSource<CalendarItem>(data);
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
        this.calendarService.delete(key)
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
  setActiveState(item: CalendarItem, e): void {
    let msg = "";
    if (e.checked) {
      item.active = true;
      msg = "Kalender item zichtbaar op website";
    } else {
      item.active = false;
      msg = "Kalender item niet zichtbaar op website";
    }
    this.calendarService.update(item.id, item).then(() => {
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
  goToItemEdit(itemId: number): void {
    this.router.navigate(['/admin/calendar-edit', { id: itemId }]);
  }

  // Open modal
  openModalItem(item: CalendarItem): void {
    this.modalItem = item;
    this.modalService.openModal(this.modalContent);
  }
}
