import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-painting-edit',
  templateUrl: './painting-edit.component.html',
  styleUrls: ['./painting-edit.component.scss']
})
export class PaintingEditComponent implements OnInit, OnDestroy {
  @Input() painting: Painting;
  @ViewChild('thumbnailSwal') thumbnailSwal!: SwalComponent;
  @ViewChild('thumbnailOptions') thumbnailOptions: any;
  title = 'Aanpassen';
  subTitle = 'Portfolio';
  text = 'Gebruik onderstaand formulier om een schilderij aan te passen.';
  generalContent: GeneralContent;
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
    private router: Router,
    private route: ActivatedRoute,
    private paintingService: PaintingService,
    private uploadService: FileService,
    private contentService: ContentService,
    private swalService: SwalService
  ) { }

  ngOnInit() {
    this.retrieveGeneralContent();
    this.editor = new Editor();
    this.resetFormData();
    if (!this.painting) {
      let id = this.route.snapshot.paramMap.get('id');
      this.retrievePainting(id);
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
    // Upload files
    if (this.selectedFiles.length) {
      // loading swal
      this.swalService.loadingSwal("Afbeeldingen opslaan");
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
              this.updatePainting();
            } else {
              // let user choose thumbnail
              this.thumbnailSwal.fire().then((result) => {
                // save painting
                this.updatePainting();
              });
            }
          }
        });
      });
    } else {
      this.updatePainting();
    }
  }

  retrievePainting(id: string): void {
    this.paintingService.getById(id).snapshotChanges().pipe(
      map(c =>
        ({ id: c.payload.id, ...c.payload.data() })
      )
    ).subscribe(data => {
      this.painting = data;
      this.editorOutput = data.description;
      if (!this.painting) {
        this.goToDashboard();
      }
    });
  }

  updatePainting(): void {
    this.swalService.loadingSwal("Schilderij opslaan");
    this.paintingService.update(this.painting.id, this.painting).then(() => {
      this.resetFormData();
      this.swalService.successSwal("Schilderij opgeslagen");
      this.router.navigate(['/admin/portfolio-overview']);
    });
  }

  /**
   * Removes image from images
   * Asks user for confirmation
   */
  removeImage(image) {
    this.swalService.promptSwal("Afbeelding zal worden verwijderd").then((result) => {
      if (result.value) {
        const index: number = this.painting.images.indexOf(image);
        if (index !== -1) {
          this.painting.images.splice(index, 1);
        }
        this.swalService.successSwal("Afbeelding verwijderd");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.swalService.cancelSwal("Afbeelding niet verwijderd");
      }
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
    this.swalService.promptSwal("Alle aangepaste data zal worden terug gezet").then((result) => {
      if (result.value) {
        this.resetFormData();
        this.retrievePainting(this.painting.id);
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
    this.uploadCount = 0;
    this.percentage = null;
    this.formDisabled = false;
  }

  goToDashboard(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}
