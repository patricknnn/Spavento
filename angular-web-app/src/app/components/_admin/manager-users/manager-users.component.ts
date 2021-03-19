import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { LoginForm } from 'src/app/models/loginform';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
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
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.form = new LoginForm();
    this.retrieveData();
  }

  onSubmit() {
    this.swalService.loadingSwal("toevoegen");
    this.authService.signUp(this.form.email, this.form.password).then(() => {
      this.swalService.successSwal("toegevoegd");
    });
  }

  updateUser(): void {
    this.swalService.loadingSwal("opslaan");
    this.userService.update(this.modalUser.uid, this.modalUser).then(() => {
      this.swalService.successSwal("opgeslagen");
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
            this.swalService.successSwal("Bericht verwijderd")
          })
          .catch((err) => {
            this.swalService.errorSwal(err)
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.swalService.cancelSwal("Bericht niet verwijderd");
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
