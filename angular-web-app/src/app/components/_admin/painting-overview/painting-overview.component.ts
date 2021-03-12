import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
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
export class PaintingOverviewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  title = 'Overzicht';
  subTitle = 'Portfolio';
  text = 'Hier is een overzicht van alle portfolio items te vinden.';
  paintings: Painting[];
  currentPainting: Painting;
  currentIndex = -1;
  modalPainting: Painting;
  dataSource: any;
  displayedColumns: string[] = [
    'thumbnail',
    'title',
    'artist',
    'paint',
    'created',
    'active',
    'options',
  ];  
  formStyle = "standard";
  formColor = "accent";

  constructor(
    private paintingService: PaintingService,
    private swalService: SwalService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.retrievePaintings();
  }

  initTable(): void {
    this.dataSource = new MatTableDataSource(this.paintings);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  refreshList(): void {
    this.currentPainting = undefined;
    this.currentIndex = -1;
    this.retrievePaintings();
  }

  retrievePaintings(): void {
    this.paintingService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.paintings = data;
      this.initTable();
    });
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
