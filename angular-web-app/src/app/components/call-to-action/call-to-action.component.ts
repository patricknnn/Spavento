import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-call-to-action',
  templateUrl: './call-to-action.component.html',
  styleUrls: ['./call-to-action.component.scss']
})
export class CallToActionComponent implements OnInit {
  typewriterText: string;
  typewriterDisplay: string;

  constructor() {
    this.typewriterText = 'Thank you for your interest!';
    this.typewriterDisplay = '';
  }

  ngOnInit(): void {
    this.typingCallback(this);
  }

  typingCallback(that): void {
    const totalLength = that.typewriterText.length;
    const currentLength = that.typewriterDisplay.length;
    if (currentLength < totalLength) {
      that.typewriterDisplay += that.typewriterText[currentLength];
      setTimeout(that.typingCallback, 100, that);
    }
  }

}
