import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-painting-add',
  templateUrl: './painting-add.component.html',
  styleUrls: ['./painting-add.component.scss']
})
export class PaintingAddComponent implements OnInit {
  title = "Toevoegen";
  subTitle = "Portfolio";
  text = "Gebruik deze pagina om items aan het portfolio toe te voegen.";
  
  constructor() { }

  ngOnInit(): void {
  }

}
