import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { CalendarContent } from 'src/app/models/calendarcontent';
import { GeneralContent } from 'src/app/models/generalcontent';
import { ContentService } from 'src/app/services/content.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-comp-calendar',
  templateUrl: './comp-calendar.component.html',
  styleUrls: ['./comp-calendar.component.scss']
})
export class CompCalendarComponent implements OnInit {
  @Input() generalContent: GeneralContent;
  @ViewChild('calendarContentForm') form: NgForm;
  content: CalendarContent;
  contentHistory: CalendarContent[];

  constructor(
    private contentService: ContentService,
    private swalService: SwalService
  ) { }

  ngOnInit(): void {
    this.retrieveData();
  }

  onSubmit() {
    this.swalService.loadingSwal("opslaan");
    this.contentService.saveCalendarContent(this.content).then(() => {
      this.swalService.successSwal("opgeslagen");
    });
  }

  retrieveData(): void {
    this.contentService.getCalendarContent().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.contentHistory = data;
      this.content = data[0];
      if (!this.content) {
        this.loadDefaults();
      }
    });
  }

  setActive(input, e): void {
    e.checked ? input = true : input = false;
  }

  loadDefaults(): void {
    this.content = new CalendarContent();
    this.content.title = "Kalender";
    this.content.subTitle = "Aankomende zaken";
    this.content.text = "Phasellus ultricies, nisi vitae rutrum hendrerit, justo nunc faucibus libero, vel suscipit nibh erat id arcu.";
  }

  /**
   * Clears form of data
   * Asks user for confirmation
   */
  resetForm() {
    this.swalService.promptSwal("Alle veranderingen zullen worden teruggedraaid").then((result) => {
      if (result.value) {
        this.retrieveData();
        this.swalService.successSwal("Veranderingen teruggedraaid");
        this.form.form.markAsPristine();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.swalService.cancelSwal("Veranderingen niet teruggedraaid");
      }
    });
  }
}
