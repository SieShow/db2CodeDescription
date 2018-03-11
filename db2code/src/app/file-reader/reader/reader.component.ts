import { KeyConsts } from './../modules/keyConsts';
import { ErrorModel } from './../modules/error.model.clss';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sqlc-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {

  private fileText: string;
  private codeElements: ErrorModel[];
  actualline = 0;
  private totalLines: number;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Return the percentage of the processfile is
   * @param actualLine actual line
   */
  public getPercentage(actualLine: number): number {
    this.actualline = +((actualLine * 100) / this.totalLines).toFixed(0);
    return this.actualline;
  }

  /**
   * Load file to memory and set the total of line this file has
   * @param event file
   */
  public fileUpload(event) {
    const reader = new FileReader();
    reader.readAsText(event.srcElement.files[0]);
    const local = this;
    reader.onload = function () {
      local.fileText = reader.result;
      local.totalLines = local.fileText.split('\n').length;
      local.processFile();
    };
  }

  /**
   * Read each line of the file, creating a object of ErrorModule
  */
  public processFile() {
    const lines = this.fileText.split('\n');

    let errorObj = new ErrorModel();
    this.codeElements = new Array();

    for (let line = 0; line < lines.length; line++) {
      const lineText = lines[line];
      const splited = lineText.split(' ');
      let auxVariable: string;

      this.getPercentage(line + 1);
      this.codeElements.push(errorObj);

      if (lineText === '' || lineText === null) {
        break;

      } else if (this.checkIfIsCode(lineText)) {
        errorObj.$code = lineText;
      } else if (splited[0] === KeyConsts.DESTINATION) {

        errorObj.$destination = splited[1];

      } else if (splited[0] === KeyConsts.EXPLANATION) {

        auxVariable = errorObj.$explanation;
        errorObj.$explanation = auxVariable + splited[1];

      } else if (splited[0] === KeyConsts.SYSTEM_ACTION) {

        auxVariable = errorObj.$system_action;
        errorObj.$system_action = auxVariable + splited[1];

      } else if (splited[0] === KeyConsts.PROGRAMER_RESPONSE) {

        auxVariable = errorObj.$programmer_response;
        errorObj.$programmer_response = auxVariable + splited[1];

      } else if (this.isFullLineString(lineText)) {

        auxVariable = errorObj.$description;
        errorObj.$description = auxVariable + splited[1];

      }
      errorObj = new ErrorModel();
    }
  }

  public isFullLineString(line: string): boolean {
    try {
      const aux = +line;
      return false;
    } catch (e) {
      return true;
    }
  }
  /**
   * Check if the line represent a error code
   * @param line
   */
  public checkIfIsCode(line: string): boolean {
    try {
      const aux = +line;
      return true;
    } catch (e) {
      return false;
    }
  }
  /**
   * Checks if the line represents a page
   * @param words line of the file
   */
  private checkPaginationLine(words: string[]): string {
    let numberObj = Number.MIN_VALUE;

    words.forEach(element => {
      try {
        numberObj = +element;
        if (numberObj !== Number.MIN_VALUE) {
          return element;
        }
      } catch (e) {
        console.log(e);
      }
    });
    return null;
  }
}
