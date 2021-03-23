import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Editor } from 'ngx-editor';
import { map } from 'rxjs/operators';
import { File } from 'src/app/models/file';
import { GeneralContent } from 'src/app/models/generalcontent';
import { NewsItem } from 'src/app/models/newsitem';
import { ContentService } from 'src/app/services/content.service';
import { FileService } from 'src/app/services/file.service';
import { NewsService } from 'src/app/services/news.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewsAddComponent implements OnInit, OnDestroy {
  title = "Toevoegen";
  subTitle = "Nieuws";
  text = "Gebruik deze pagina om items aan het nieuws toe te voegen.";
  newsItem: NewsItem;
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
    private newsService: NewsService,
    private fileService: FileService,
    private contentService: ContentService,
    private swalService: SwalService
  ) { }

  ngOnInit() {
    this.retrieveGeneralContent();
    this.editor = new Editor();
    this.resetFormData();
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

  onEditorContentChange(content): void {
    this.editorOutput = content;
  }

  /**
   * Handles form submit
   */
  onSubmit() {
    // disable form
    this.formDisabled = true;
    // set newsitem variables
    this.newsItem.text = this.editorOutput;
    this.newsItem.active = true;
    // loading swal
    this.swalService.loadingSwal("Nieuws item opslaan");
    // Upload files
    if (this.selectedFiles.length > 0) {
      let file: File = {
        id: "",
        name: "",
        url: "",
        timestampCreated: 0,
        timestampUpdated: 0,
        file: this.selectedFiles[0],
      };
      const { downloadUrl, uploadProgress } = this.fileService.pushFileToStorageAndReturnMetadata(file);
      downloadUrl.subscribe((downloadUrl) => {
        // add url to painting
        this.newsItem.image = downloadUrl;
        this.saveItem();
      });
    } else {
      this.newsItem.image = "../../../../assets/img/material-bg.jpg";
      this.saveItem();
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
    this.newsItem.author = "Rolien Schrik";
    this.newsItem.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque orci elit, tincidunt in egestas ut, condimentum vitae urna. Aenean ullamcorper est sit amet mattis interdum. Vestibulum dictum tortor dictum orci mollis facilisis. Pellentesque augue purus, scelerisque sit amet luctus eget, fringilla elementum sapien. Nam consectetur est at tortor viverra, eu bibendum justo placerat. Aenean non sodales erat, eget ullamcorper eros. Donec ut laoreet augue.";
    this.selectedFiles = [];
    this.formDisabled = false;
  }
}
