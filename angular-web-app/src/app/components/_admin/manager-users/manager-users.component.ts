import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { GeneralContent } from 'src/app/models/generalcontent';
import { LoginForm } from 'src/app/models/loginform';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ContentService } from 'src/app/services/content.service';
import { ModalService } from 'src/app/services/modal.service';
import { SwalService } from 'src/app/services/swal.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-manager-users',
  templateUrl: './manager-users.component.html',
  styleUrls: ['./manager-users.component.scss']
})
export class ManagerUsersComponent implements OnInit {
  generalContent: GeneralContent;
  title = "Gebruikers";
  subTitle = "Beheer";
  text = "Hier is een overzicht van alle gebruikers berichten te vinden. Om gebruikers toe te voegen kan je gebruik maken van het formulier.";
  formStyles: string[];
  formStyle = "standard";
  formColor = "accent";
  form: LoginForm;
  displayedColumns: string[] = ['photoURL', 'displayName', 'email', 'emailVerified', 'options'];
  resultsLength = 0;
  isLoadingResults = true;
  users: User[];
  modalUser: User;
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private swalService: SwalService,
    private authService: AuthService,
    private userService: UserService,
    private contentService: ContentService,
    private modalService: ModalService
  ) {
    this.generalContent = new GeneralContent();
    this.generalContent.cardElevation = "mat-elevation-z8";
    this.generalContent.formStyle = "standard";
    this.generalContent.formColor = "accent";
  }

  ngOnInit(): void {
    this.form = new LoginForm();
    this.retrieveData();
    this.retrieveGeneralContent();
  }

  onSubmit() {
    this.swalService.loadingSwal("toevoegen");
    this.authService.signUp(this.form.email, this.form.password).then(() => {
      this.swalService.successSwal("toegevoegd");
    });
  }

  updateUser(): void {
    this.swalService.loadingSwal("opslaan");
    this.authService.updateProfile(this.modalUser.displayName, this.modalUser.photoURL).then(() => {
      this.swalService.successSwal("Gebruiker bijgewerkt");
    }).catch((error) => {
      this.swalService.errorSwal(error.message);
    });
  }

  retrieveData(): void {
    this.userService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      ))
      .subscribe((data) => {
        this.users = data;
        this.isLoadingResults = false;
        this.resultsLength = data.length;
        this.initTable(data);
      });
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

  initTable(data): void {
    this.dataSource = new MatTableDataSource<User>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteItem(key): void {
    this.swalService.promptSwal("Dit kan niet worden terug gedraaid").then((result) => {
      if (result.value) {
        this.userService.delete(key)
          .then(() => {
            this.swalService.successSwal("Gebruiker verwijderd")
          })
          .catch((err) => {
            this.swalService.errorSwal(err)
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.swalService.cancelSwal("Gebruiker niet verwijderd");
      }
    });
  }

  /**
   * Apply filter to the table view
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Reset the table view filter
   */
  resetFilter(): void {
    this.dataSource.filter = null;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Set modal item
   * @param item Modal user
   */
  setModalItem(item: User): void {
    this.modalUser = item;
  }

  /**
   * Open modal
   * @param content Modal content
   */
  openModal(content): void {
    this.modalService.openModal(content);
  }

  /**
   * Clears form of data
   * Asks user for confirmation
   */
  resetForm() {
    this.swalService.promptSwal("Alle veranderingen zullen worden teruggedraaid").then((result) => {
      if (result.value) {
        this.form = new LoginForm();
        this.swalService.successSwal("Veranderingen teruggedraaid");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.swalService.cancelSwal("Veranderingen niet teruggedraaid");
      }
    });
  }
}
