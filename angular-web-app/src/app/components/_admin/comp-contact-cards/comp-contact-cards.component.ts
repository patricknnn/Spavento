import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Service } from 'src/app/models/service';
import { ServiceContent } from 'src/app/models/servicecontent';
import { ContentService } from 'src/app/services/content.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-comp-contact-cards',
  templateUrl: './comp-contact-cards.component.html',
  styleUrls: ['./comp-contact-cards.component.scss']
})
export class CompContactCardsComponent implements OnInit {
  services: ServiceContent;
  servicesHistory: ServiceContent[];

  constructor(private contentService: ContentService, private swalService: SwalService) { }

  ngOnInit(): void {
    this.retrieveData();
  }


  onSubmit() {
    this.swalService.loadingSwal("opslaan");
    this.contentService.saveContactCardsContent(this.services).then(() => {
      this.swalService.successSwal("opgeslagen");
    });
  }

  retrieveData(): void {
    this.contentService.getContactCardsContent().snapshotChanges().pipe(
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
    this.services.title = "Lets get in touch";
    this.services.subTitle = "Contact";
    this.services.text = "Phasellus ultricies, nisi vitae rutrum hendrerit, justo nunc faucibus libero, vel suscipit nibh erat id arcu.";
    this.services.active = true;
    this.services.services = [
      new Service(),
      new Service(),
      new Service(),
    ]
    this.services.services[0].icon = "call";
    this.services.services[0].title = "Call us";
    this.services.services[1].icon = "send";
    this.services.services[1].title = "Email us";
    this.services.services[2].icon = "map";
    this.services.services[2].title = "Visit us";
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.swalService.cancelSwal("Veranderingen niet teruggedraaid");
      }
    });
  }
}
