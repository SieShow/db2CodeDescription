import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sqlc-code-card',
  templateUrl: './code-card.component.html',
  styleUrls: ['./code-card.component.css']
})
export class CodeCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  teste() {
    console.log('testando');
  }
}
