import { Component, OnInit } from '@angular/core';
import { FileUpload } from 'src/app/models/fileupload';
import NewsItem from 'src/app/models/newsitem';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { NewsService } from 'src/app/services/news.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.scss']
})
export class NewsAddComponent implements OnInit {
  title = "Toevoegen";
  subTitle = "Nieuws";
  text = "Gebruik deze pagina om items aan het nieuws toe te voegen.";
  formStyle = 'fill';
  formColor = 'accent';
  newsItem: NewsItem;
  categories: string[];
  selectedFiles: File[];
  formDisabled: boolean;

  /**
   * Constructor
   * @param paintingService painting service
   */
  constructor(
    private newsService: NewsService,
    private uploadService: FileUploadService,
    private swalService: SwalService
  ) { }

  ngOnInit() {
    this.categories = this.newsService.getCategories();
    this.resetFormData();
  }

  /**
   * Handles form submit
   */
  onSubmit() {
    // disable form
    this.formDisabled = true;
    // loading swal
    this.swalService.loadingSwal("Nieuws item opslaan");
    // Upload files
    if (this.selectedFiles.length == 1) {
      const { downloadUrl, uploadProgress } = this.uploadService.pushFileToStorageAndReturnMetadata(new FileUpload(this.selectedFiles[0]));
      downloadUrl.subscribe((downloadUrl) => {
        // add url to painting
        this.newsItem.image = downloadUrl;
        this.saveItem();
      });
    }
  }

  saveItem(): void {
    this.newsService.create(this.newsItem).then(() => {
      this.resetFormData();
      this.swalService.successSwal("Nieuws item opgeslagen");
    });
  }


  /**
   * Handles file select
   * @param event File select event
   */
  onFileSelect(event): void {
    if (this.selectedFiles.length) {
      this.swalService.errorSwal("Maximaal 1 foto toegestaan")
    } else {
      this.selectedFiles.push(...event.addedFiles);
    }
  }

  /**
   * Handles file remove
   * @param event File remove event
   */
  onFileRemove(event): void {
    this.selectedFiles.splice(this.selectedFiles.indexOf(event), 1);
  }

  /**
   * Clears form of data
   * Asks user for confirmation
   */
  resetForm() {
    this.swalService.promptSwal("Alle reeds ingevoerde data zal worden verwijderd").then((result) => {
      if (result.value) {
        this.resetFormData();
        this.swalService.successSwal("Formulier leeg gemaakt");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.swalService.cancelSwal("Formulier niet leeg gemaakt");
      }
    });
  }

  /**
   * Clears form data
   */
  resetFormData(): void {
    this.newsItem = new NewsItem();
    this.selectedFiles = [];
    this.formDisabled = false;
  }
}
