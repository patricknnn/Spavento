import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { ContactForm } from 'src/app/models/contactform';
import { GeneralContent } from 'src/app/models/generalcontent';
import { ContactFormService } from 'src/app/services/contact-form.service';
import { ContentService } from 'src/app/services/content.service';
import { ModalService } from 'src/app/services/modal.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-manager-messages',
  templateUrl: './manager-messages.component.html',
  styleUrls: ['./manager-messages.component.scss']
})
export class ManagerMessagesComponent implements AfterViewInit {
  generalContent: GeneralContent;
  title = 'Berichten';
  subTitle = 'Beheer';
  text =
    'Hier is een overzicht van alle ontvangen berichten te vinden.';
  displayedColumns: string[] = ['read', 'name', 'email', 'subject', 'created', 'options'];
  formStyle = "standard";
  formColor = "accent";
  resultsLength = 0;
  isLoadingResults = true;
  contactForms: ContactForm[];
  modalItem: ContactForm;
  dataSource: MatTableDataSource<ContactForm>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private contactformService: ContactFormService,
    private contentService: ContentService,
    private swalService: SwalService,
    private modalService: ModalService
  ) { }

  ngAfterViewInit() {
    this.retrieveData();
    this.retrieveGeneralContent();
  }

  retrieveData(): void {
    this.contactformService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      ))
      .subscribe((data) => {
        this.contactForms = data;
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
    this.dataSource = new MatTableDataSource<ContactForm>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteItem(key): void {
    this.swalService.promptSwal("Dit kan niet worden terug gedraaid").then((result) => {
      if (result.value) {
        this.contactformService.delete(key)
          .then(() => {
            this.swalService.successSwal("Bericht verwijderd")
          })
          .catch((err) => {
            this.swalService.errorSwal(err)
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.swalService.cancelSwal("Bericht niet verwijderd");
      }
    });
  }

  /**
   * Mark item as read
   * @param item Item to mark
   */
  markAsRead(item: ContactForm): void {
    if (item.read == false) {
      item.read = true;
      this.contactformService.update(item.id, item);
    }
  }

  /**
   * Updates active state of painting
   * @param item Item to mark
   * @param e Event
   */
  setReadState(item: ContactForm, e): void {
    let msg = "";
    if (e.checked) {
      item.read = true;
      msg = "Gemarkeerd als gelezen";
    } else {
      item.read = false;
      msg = "Gemarkeerd als niet gelezen";
    }
    this.contactformService.update(item.id, item).then(() => {
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
   * Set modal item
   * @param painting Modal painting
   */
  setModalItem(item: ContactForm): void {
    this.modalItem = item;
  }

  /**
   * Open modal
   * @param content Modal content
   */
  openModal(content): void {
    this.modalService.openModal(content);
  }

  getMailLink(): string {
    let email = this.modalItem.email;
    let subject = this.modalItem.subject;
    let emailBody = "Hallo " + this.modalItem.name + ",";
    let link = "mailto:" + email + "?subject=Re: " + subject + "&body=" + emailBody;
    return link;
  }


}
