import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss']
})
export class SynopsisComponent implements OnInit {

  @Input("synopsis-text") synopsis: string;
  @Input('string-length') strLength: number = 0;

  get synopsisPoints(){
    return this.stringFormat(this.synopsis);
  }

  constructor() { }

  ngOnInit() { }

  stringFormat(str: string) {
  
    if(str === undefined) return [];
    for(let i = 0; i <= str.indexOf("\n\n");) 
      str = str.trim().replace("\n\n", "\n");
      
    return str.trim().split("\n");
  }

}
