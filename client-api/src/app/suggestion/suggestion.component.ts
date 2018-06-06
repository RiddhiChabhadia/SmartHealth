import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent implements OnInit {

  constructor() { }


  async ngOnInit() {

    await this.loadScript('../assets/maps.js');
    await this.loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDYI-gUzHKGY9bOezjRZ8pIwuEVaG18Lo0&libraries=places&callback=initMap');


  }
  async ngAfterViewInit() {


  }

  private loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    })
  }

}
