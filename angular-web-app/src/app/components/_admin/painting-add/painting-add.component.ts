import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Editor } from 'ngx-editor';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { File } from 'src/app/models/file';
import { GeneralContent } from 'src/app/models/generalcontent';
import { Painting } from 'src/app/models/painting';
import { ContentService } from 'src/app/services/content.service';
import { FileService } from 'src/app/services/file.service';
import { PaintingService } from 'src/app/services/painting.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-painting-add',
  templateUrl: './painting-add.component.html',
  styleUrls: ['./painting-add.component.scss'],
})
export class PaintingAddComponent implements OnInit, OnDestroy {
  @ViewChild('thumbnailSwal') thumbnailSwal!: SwalComponent;
  @ViewChild('thumbnailOptions') thumbnailOptions: any;
  title = 'Toevoegen';
  subTitle = 'Portfolio';
  text = 'Gebruik onderstaand formulier om een schilderij toe te voegen aan het portfolio.';
  generalContent: GeneralContent;
  painting: Painting;
  selectedFiles: File[];
  percentage: Observable<number>;
  uploadCount = 0;
  formDisabled: boolean;
  editor: Editor;
  editorOutput = "";
  focusAnimation = () => {
    const popup = Swal.getPopup();
    popup.classList.remove('swal2-show');
    setTimeout(() => {
      popup.classList.add('focus-animation');
    });
    setTimeout(() => {
      popup.classList.remove('focus-animation');
    }, 500);
    return false;
  };

  /**
   * Constructor
   * @param paintingService painting service
   */
  constructor(
    private paintingService: PaintingService,
    private contentService: ContentService,
    private uploadService: FileService,
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
    this.painting.description = this.editorOutput;
    this.painting.active = true;
    // loading swal
    this.swalService.loadingSwal("Afbeeldingen opslaan");
    // Upload files
    if (this.selectedFiles.length) {
      this.selectedFiles.forEach((sFile) => {
        let file: File = {
          id: "",
          name: "",
          url: "",
          timestampCreated: 0,
          timestampUpdated: 0,
          file: sFile,
        };
        const { downloadUrl, uploadProgress } = this.uploadService.pushFileToStorageAndReturnMetadata(file);
        this.percentage = uploadProgress;
        downloadUrl.subscribe((downloadUrl) => {
          // add url to painting
          this.painting.images.push(downloadUrl);
          this.uploadCount++;
          // check if all files uploaded
          if (this.uploadCount == this.selectedFiles.length) {
            if (this.uploadCount == 1) {
              // set thumbnail
              this.painting.thumbnail = this.painting.images[0];
              this.savePainting();
            } else {
              // let user choose thumbnail
              this.thumbnailSwal.fire().then((result) => {
                // save painting
                this.savePainting();
              });
            }
          }
        });
      });
    }
  }

  savePainting(): void {
    this.swalService.loadingSwal("Schilderij opslaan");
    this.paintingService.create(this.painting).then(() => {
      this.resetFormData();
      this.swalService.successSwal("Schilderij opgeslagen");
    });
  }

  /**
   * Handles file select
   * @param event File select event
   */
  onFileSelect(event): void {
    this.selectedFiles.push(...event.addedFiles);
  }

  /**
   * Handles file remove
   * @param event File remove event
   */
  onFileRemove(event): void {
    this.selectedFiles.splice(this.selectedFiles.indexOf(event), 1);
  }

  /**
   * Sets painting thumbnail
   * @param event Click event
   * @param url Url of image
   */
  setThumbnail(event, url): void {
    // set correct url
    this.painting.thumbnail = url;
    // add class to selected element
    this.thumbnailOptions.nativeElement.querySelectorAll('.selected').forEach((option) => {
      option.classList.remove('selected');
    });
    event.target.parentElement.classList.add('selected');
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
    this.painting = this.getMockPainting();
    //this.painting = new Painting(null, "Rolien Schrik", null, null, null, [], null, null, null, null, null, null, null, null, null, null);
    this.selectedFiles = [];
    this.uploadCount = 0;
    this.percentage = null;
    this.formDisabled = false;
  }

  getMockPainting(): Painting {
    let painting = new Painting();
    painting.artist = 'Rolien Schrik';
    painting.title = '';
    painting.description = '';
    painting.material = '';
    painting.paint = '';
    painting.status = '';
    painting.category = '';
    painting.length = null;
    painting.width = null;
    painting.images = [];
    return painting;
  }
}

