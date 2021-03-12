import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { LatestNewsContent } from 'src/app/models/latestnewscontent';
import { ContentService } from 'src/app/services/content.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-comp-latest-news',
  templateUrl: './comp-latest-news.component.html',
  styleUrls: ['./comp-latest-news.component.scss']
})
export class CompLatestNewsComponent implements OnInit {
  latestNews: LatestNewsContent;
  latestNewsHistory: LatestNewsContent[];

  constructor(private contentService: ContentService,
    private swalService: SwalService) { }

  ngOnInit(): void {
    this.retrieveData();
  }

  onSubmit() {
    this.swalService.loadingSwal("opslaan");
    this.contentService.saveLatestNewsContent(this.latestNews).then(() => {
      this.swalService.successSwal("opgeslagen");
    });
  }

  retrieveData(): void {
    this.contentService.getLatestNewsContent().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.latestNewsHistory = data;
      this.latestNews = data[0];
      if (!this.latestNews) {
        this.loadDefaults();
      }
    });
  }

  loadDefaults(): void {
    this.latestNews = new LatestNewsContent();
    this.latestNews.title = "Latest news";
    this.latestNews.subTitle = "Stay up to date";
    this.latestNews.text = "Phasellus ultricies, nisi vitae rutrum hendrerit, justo nunc faucibus libero, vel suscipit nibh erat id arcu.";
    this.latestNews.active = true;
    this.latestNews.amount = 3;
    this.latestNews.link = "/news";
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.swalService.cancelSwal("Veranderingen niet teruggedraaid");
      }
    });
  }

}
