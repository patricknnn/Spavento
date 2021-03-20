import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { GeneralContent } from 'src/app/models/generalcontent';
import { Service } from 'src/app/models/service';
import { ServiceContent } from 'src/app/models/servicecontent';
import { ContentService } from 'src/app/services/content.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-comp-services',
  templateUrl: './comp-services.component.html',
  styleUrls: ['./comp-services.component.scss']
})
export class CompServicesComponent implements OnInit {
  @ViewChild('servicesForm') form: NgForm;
  @Input() generalContent: GeneralContent;
  services: ServiceContent;
  servicesHistory: ServiceContent[];
  formStyle = "standard";
  formColor = "accent";
  
  constructor(private contentService: ContentService, private swalService: SwalService) { }

  ngOnInit(): void {
    this.retrieveData();
  }


  onSubmit() {
    this.swalService.loadingSwal("opslaan");
    this.contentService.saveServicesContent(this.services).then(() => {
      this.swalService.successSwal("opgeslagen");
    });
  }

  retrieveData(): void {
    this.contentService.getServicesContent().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.servicesHistory = data;
      this.services = data[0];
      if (!this.services) {
        this.loadDefaults();
      }
    });
  }

  setActive(input, e): void {
    e.checked ? input = true : input = false;
  }

  loadDefaults(): void {
    this.services = new ServiceContent();
    this.services.title = "Services";
    this.services.subTitle = "What i do";
    this.services.text = "Phasellus ultricies, nisi vitae rutrum hendrerit, justo nunc faucibus libero, vel suscipit nibh erat id arcu.";
    this.services.active = true;
    this.services.services = [
      new Service(),
      new Service(),
      new Service(),
    ]
    this.services.services[0].icon = "brush";
    this.services.services[0].title = "Paintings";
    this.services.services[1].icon = "palette";
    this.services.services[1].title = "Artwork";
    this.services.services[2].icon = "architecture";
    this.services.services[2].title = "Expositions";
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
