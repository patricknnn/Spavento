import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private sidenav: SidenavService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
  }

  goToHome(): void {
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }

}
