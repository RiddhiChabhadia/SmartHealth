import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})

export class LandingpageComponent implements OnInit {

  private photo: SafeStyle;
  private photo_1: SafeStyle;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
      this.photo = '/assets/images/healthy_life.jpg';
      this.photo_1 = '/assets/images/fitness_goals.jpg'
  }

}
