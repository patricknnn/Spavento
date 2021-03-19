import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoginForm } from 'src/app/models/loginform';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-manager-users',
  templateUrl: './manager-users.component.html',
  styleUrls: ['./manager-users.component.scss']
})
export class ManagerUsersComponent implements OnInit {
  title = "Gebruikers";
  subTitle = "Beheer";
  text = "Om gebruikers toe te voegen kan je gebruik maken van het formulier.";
  formStyles: string[];
  formStyle = "standard";
  formColor = "accent";
  form: LoginForm;
  displayedColumns: string[] = ['uid', 'email', 'displayName', 'photoURL', 'emailVerified', 'options'];
  resultsLength = 0;
  isLoadingResults = true;
  users: User[];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private swalService: SwalService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.form = new LoginForm();
  }

  onSubmit() {
    this.swalService.loadingSwal("toevoegen");
    this.authService.signUp(this.form.email, this.form.password).then(() => {
      this.swalService.successSwal("toegevoegd");
    });
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
