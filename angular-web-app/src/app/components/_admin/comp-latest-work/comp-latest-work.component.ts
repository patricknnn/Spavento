import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { GeneralContent } from 'src/app/models/generalcontent';
import { LatestWorkContent } from 'src/app/models/latestworkcontent';
import { ContentService } from 'src/app/services/content.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-comp-latest-work',
  templateUrl: './comp-latest-work.component.html',
  styleUrls: ['./comp-latest-work.component.scss']
})
export class CompLatestWorkComponent implements OnInit {
  @Input() generalContent: GeneralContent;
  @ViewChild('latestWorkForm') form: NgForm;
  latestWork: LatestWorkContent;
  latestWorkHistory: LatestWorkContent[];
  formStyle = "standard";
  formColor = "accent";
  
  constructor(
    private contentService: ContentService,
    private swalService: SwalService
  ) { }

  ngOnInit(): void {
    this.retrieveData();
  }

  onSubmit() {
    this.swalService.loadingSwal("opslaan");
    this.contentService.saveLatestWorkContent(this.latestWork).then(() => {
      this.swalService.successSwal("opgeslagen");
    });
  }

  retrieveData(): void {
    this.contentService.getLatestWorkContent().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.latestWorkHistory = data;
      this.latestWork = data[0];
      if (!this.latestWork) {
        this.loadDefaults();
      }
    });
  }

  setActive(input, e): void {
    e.checked ? input = true : input = false;
  }

  loadDefaults(): void {
    this.latestWork = new LatestWorkContent();
    this.latestWork.title = "Latest work";
    this.latestWork.subTitle = "My most recent project";
    this.latestWork.text = "Phasellus ultricies, nisi vitae rutrum hendrerit, justo nunc faucibus libero, vel suscipit nibh erat id arcu.";
    this.latestWork.active = true;
    this.latestWork.amount = 3;
    this.latestWork.link = "/portfolio";
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
