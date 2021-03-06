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
    this.textFormatting();
    return this.stringFormat(this.synopsis);
  }

  constructor() { }

  ngOnInit() { }

  stringFormat(str: string) {
  
    if(str === undefined || str === null) return [];
    
    for(let i = 0; i <= str.indexOf("\n\n");) 
      str = str.trim().replace("\n\n", "\n");
      
    return str.trim().split("\n");
  }

  textFormatting() {
    this.applyformat("*", "<b>", "</b>");
    this.applyformat("_", "<i>", "</i>");
    this.applyformat("~", "<s>", "</s>");
    this.applyformat("```", "<kbd>", "</kbd>");
    this.applyformat("^^^", "<code>", "</code>");
  }

  applyformat(textToReplace: string, openingTag: string, closingTag: string) {

    if(this.synopsis === undefined || this.synopsis === null) return;

    for(let i = 1; i < this.synopsis.indexOf(textToReplace); i++)
    {
        if(i % 2 != 0) 
            this.synopsis = this.synopsis.replace(textToReplace, openingTag);
        else
            this.synopsis = this.synopsis.replace(textToReplace, closingTag);
    }
  }
}
