import { FileService } from './../modules/file.service';
import { KeyConsts } from './../enuns/global';
import { ErrorModel } from './../modules/error.model.clss';
import { Component, OnInit } from '@angular/core';
import { SetStatus } from '../enuns/global';

@Component({
  selector: 'sqlc-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {

  fileText: string;
  codeElements: ErrorModel[];
  actualline = 0;

  constructor(private fileservice: FileService) { }

  ngOnInit() {
  }

  /**
   * Loads the file read into memory and sets the total of line this file has in a variable
   * @param event file
   */
  public fileUpload(event) {
    this.fileservice.fileUpload(event);
  }
}
