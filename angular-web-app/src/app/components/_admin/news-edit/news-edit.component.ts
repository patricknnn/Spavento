import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Editor } from 'ngx-editor';
import { map } from 'rxjs/operators';
import { FileUpload } from 'src/app/models/fileupload';
import { GeneralContent } from 'src/app/models/generalcontent';
import { NewsItem } from 'src/app/models/newsitem';
import { ContentService } from 'src/app/services/content.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { NewsService } from 'src/app/services/news.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.scss']
})
export class NewsEditComponent implements OnInit, OnDestroy {
  @Input() newsItem: NewsItem;
  title = 'Aanpassen';
  subTitle = 'Nieuws';
  text = 'Gebruik onderstaand formulier om een nieuws item aan te passen.';
  generalContent: GeneralContent;
  selectedFiles: File[];
  formDisabled: boolean;
  editor: Editor;
  editorOutput = "";

  /**
   * Constructor
   * @param paintingService painting service
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private newsService: NewsService,
    private uploadService: FileUploadService,
    private contentService: ContentService,
    private swalService: SwalService
  ) { }

  ngOnInit() {
    this.retrieveGeneralContent();
    this.editor = new Editor();
    this.resetFormData();
    if (!this.newsItem) {
      let id = this.route.snapshot.paramMap.get('id');
      this.retrieveNewsItem(id);
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
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

  retrieveNewsItem(id: string): void {
    this.newsService.getById(id).snapshotChanges().pipe(
      map(c =>
        ({ id: c.payload.id, ...c.payload.data() })
      )
    ).subscribe(data => {
      this.newsItem = data;
      this.editorOutput = data.text;
      if (!this.newsItem) {
        this.goToDashboard();
      }
    });
  }

  onEditorContentChange(content): void {
    this.editorOutput = content;
  }

  /**
   * Handles form submit
   */
  onSubmit() {
    // disable form
    this.formDisabled = true;
    this.newsItem.text = this.editorOutput;
    // loading swal
    this.swalService.loadingSwal("Nieuws item opslaan");
    // Upload files
    if (this.selectedFiles.length > 0) {
      const { downloadUrl, uploadProgress } = this.uploadService.pushFileToStorageAndReturnMetadata(new FileUpload(this.selectedFiles[0]));
      downloadUrl.subscribe((downloadUrl) => {
        // add url to painting
        this.newsItem.image = downloadUrl;
        this.updateItem();
      });
    } else {
      this.newsItem.image = "../../../../assets/img/material-bg.jpg";
      this.updateItem();
    }
  }

  /**
   * Updates news item
   */
  updateItem(): void {
    this.newsService.update(this.newsItem.id, this.newsItem).then(() => {
      this.resetFormData();
      this.swalService.successSwal("Nieuws item opgeslagen");
      this.router.navigate(['/admin/news-overview']);
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
    this.swalService.promptSwal("Alle aangepaste data zal worden terug gezet").then((result) => {
      if (result.value) {
        this.resetFormData();
        this.retrieveNewsItem(this.newsItem.id);
        this.swalService.successSwal("Data terug gezet");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.swalService.cancelSwal("Data niet terug gezet");
      }
    });
  }

  /**
   * Clears form data
   */
  resetFormData(): void {
    this.selectedFiles = [];
    this.formDisabled = false;
  }

  /**
   * Navigates to dashboard
   */
  goToDashboard(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}
