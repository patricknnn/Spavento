import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { GeneralContent } from 'src/app/models/generalcontent';
import { Painting } from 'src/app/models/painting';
import { ModalService } from 'src/app/services/modal.service';
import { PaintingService } from 'src/app/services/painting.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-painting-overview',
  templateUrl: './painting-overview.component.html',
  styleUrls: ['./painting-overview.component.scss'],
})
export class PaintingOverviewComponent implements AfterViewInit {
  @Input() generalContent: GeneralContent;
  title = 'Overzicht';
  subTitle = 'Portfolio';
  text = 'Hier is een overzicht van alle portfolio items te vinden.';
  paintings: Painting[];
  modalPainting: Painting;
  displayedColumns: string[] = [
    'thumbnail',
    'title',
    'artist',
    'created',
    'updated',
    'active',
    'options',
  ];
  formStyle = "standard";
  formColor = "accent";
  resultsLength = 0;
  isLoadingResults = true;
  dataSource: MatTableDataSource<Painting>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private paintingService: PaintingService,
    private swalService: SwalService,
    private modalService: ModalService
  ) { }


  ngAfterViewInit() {
    this.retrievePaintings();
  }

  retrievePaintings(): void {
    this.paintingService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      ))
      .subscribe((data) => {
        this.paintings = data;
        this.isLoadingResults = false;
        this.resultsLength = data.length;
        this.initTable(data);
      });
  }

  initTable(data): void {
    this.dataSource = new MatTableDataSource<Painting>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deletePainting(key): void {
    this.swalService.promptSwal("Dit kan niet worden terug gedraaid").then((result) => {
      if (result.value) {
        this.paintingService.delete(key)
          .then(() => {
            this.swalService.successSwal("Schilderij verwijderd")
          })
          .catch((err) => {
            this.swalService.errorSwal(err)
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.swalService.cancelSwal("Schilderij niet verwijderd");
      }
    });
  }

  // Open edit page
  goToPaintingEdit(paintingId: number): void {
    this.router.navigate(['/admin/portfolio-edit', { id: paintingId }]);
  }

  /**
   * Updates active state of painting
   * @param painting Painting to update
   * @param e Event
   */
  setActiveState(painting: Painting, e): void {
    let msg = "";
    if (e.checked) {
      painting.active = true;
      msg = "Schilderij zichtbaar op website";
    } else {
      painting.active = false;
      msg = "Schilderij niet zichtbaar op website";
    } 
    this.paintingService.update(painting.id, painting).then(() => {
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

  /**
   * 
   * @param painting Modal painting
   */
  setModalPainting(painting: Painting): void {
    //this.router.navigate(['/painting', { id: paintingId }]);
    this.modalPainting = painting;
  }

  /**
   * Open modal
   * @param content Modal content
   */
  openModal(content) {
    this.modalService.openModal(content);
  }
}
