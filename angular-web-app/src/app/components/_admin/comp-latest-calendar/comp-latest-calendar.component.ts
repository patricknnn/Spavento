import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { GeneralContent } from 'src/app/models/generalcontent';
import { LatestCalendarContent } from 'src/app/models/latestcalendarcontent';
import { ContentService } from 'src/app/services/content.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-comp-latest-calendar',
  templateUrl: './comp-latest-calendar.component.html',
  styleUrls: ['./comp-latest-calendar.component.scss']
})
export class CompLatestCalendarComponent implements OnInit {
  @ViewChild('latestCalendarForm') form: NgForm;
  @Input() generalContent: GeneralContent;
  latestCalendar: LatestCalendarContent;
  latestCalendarHistory: LatestCalendarContent[];

  constructor(
    private contentService: ContentService,
    private swalService: SwalService
  ) { }

  ngOnInit(): void {
    this.retrieveData();
  }

  onSubmit() {
    this.swalService.loadingSwal("opslaan");
    this.contentService.saveLatestCalendarContent(this.latestCalendar).then(() => {
      this.swalService.successSwal("opgeslagen");
    });
  }

  retrieveData(): void {
    this.contentService.getLatestCalendarContent().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.latestCalendarHistory = data;
      this.latestCalendar = data[0];
      if (!this.latestCalendar) {
        this.loadDefaults();
      }
    });
  }

  loadDefaults(): void {
    this.latestCalendar = new LatestCalendarContent();
    this.latestCalendar.title = "Activiteiten";
    this.latestCalendar.subTitle = "Aankomende";
    this.latestCalendar.text = "Phasellus ultricies, nisi vitae rutrum hendrerit, justo nunc faucibus libero, vel suscipit nibh erat id arcu.";
    this.latestCalendar.active = true;
    this.latestCalendar.amount = 3;
    this.latestCalendar.link = "/calendar";
  }

  setActive(input, e): void {
    e.checked ? input = true : input = false;
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
