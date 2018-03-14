import { SetStatus } from '../enuns/global';
import { KeyConsts } from './../enuns/global';
import { ErrorModel } from './../modules/error.model.clss';
import { Injectable } from '@angular/core';

/**
 * @export
 * @class FileService
 * @version 1.0
 * @author lgmagalhes
 * @description This service class has the intent to read a IBM SQL codes file
 * and create a JSON file with all informations about the sql erros code.
 * @prop This class has as objective solve only one problem of file reading. If
 * you find any other purpose for this, feel free to customize
 */
@Injectable()
export class FileService {

    fileText: string;
    codeElements: ErrorModel[];
    actualline = 0;
    totalLines: number;

    /* Code block used to define if a attribute was already defined or not */
    private statusForDestination = SetStatus.NOTSETTED;
    private statusForDescription = SetStatus.NOTSETTED;
    private statusForExplanation = SetStatus.NOTSETTED;
    private statusForSystemAction = SetStatus.NOTSETTED;
    private statusForProgramerResponse = SetStatus.NOTSETTED;
    private statusForCode = SetStatus.NOTSETTED;

    constructor() { }

    /**
     * Restore the value of statusof.. to 'NOTSETTED'
     *
     * The restoration must be done when all information required for an ErrorModule object is complete
     */
    private resetAtributeStatus(): void {
        this.statusForDestination = SetStatus.NOTSETTED;
        this.statusForDescription = SetStatus.NOTSETTED;
        this.statusForExplanation = SetStatus.NOTSETTED;
        this.statusForSystemAction = SetStatus.NOTSETTED;
        this.statusForProgramerResponse = SetStatus.NOTSETTED;
        this.statusForCode = SetStatus.NOTSETTED;
    }

    /**
     * Return the percentage of the file processing
     *
     * @param actualLine actual line
     */
    public getPercentage(actualLine: number): number {
        this.actualline = +((actualLine * 100) / this.totalLines).toFixed(0);
        return this.actualline;
    }

    /**
     * Loads the file read into memory and sets the total of line this file has in a variable
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
     *
     * Read each line of the file, creating a object of ErrorModule
     *
    */
    public processFile() {
        const lines = this.fileText.split('\n');

        let errorObj = new ErrorModel();
        this.codeElements = new Array();

        for (let line = 0; line < lines.length; line++) {

            const lineText = lines[line];
            const splited = lineText.split(' ');

            this.getPercentage(line + 1);
            this.codeElements.push(errorObj);

            if (lineText !== '' || lineText !== null) {

                /* check if is code */
                if (this.checkIfIsCode(lineText)) {

                    errorObj.$code = lineText;

                    /* Check if is destination */
                } else if (splited[0] === KeyConsts.DESTINATION || this.statusForDestination === SetStatus.READING) {

                    errorObj.$destination = splited[1];
                    this.statusForDestination = SetStatus.READING;

                    /* Check if is explanation */
                } else if (splited[0] === KeyConsts.EXPLANATION || this.statusForExplanation === SetStatus.READING) {

                    errorObj.appendExplanation(splited[1]);
                    this.statusForExplanation = SetStatus.READING;

                    if (line + 1 < lines.length && this.isInformationFinished(lines[line + 1].split(' '))) {
                        this.statusForDestination = SetStatus.FINISHED;
                    }

                    /* Check if is system_action */
                } else if (splited[0] === KeyConsts.SYSTEM_ACTION || this.statusForSystemAction === SetStatus.READING) {

                    errorObj.appendSystemAction(splited[1]);
                    this.statusForSystemAction = SetStatus.READING;

                    if (line + 1 < lines.length && this.isInformationFinished(lines[line + 1].split(' '))) {
                        this.statusForSystemAction = SetStatus.FINISHED;
                    }

                    /* check if is programer_response */
                } else if (splited[0] === KeyConsts.PROGRAMER_RESPONSE || this.statusForProgramerResponse === SetStatus.READING
                    || splited[0] === KeyConsts.SYSTEM_PROGRAMER_RESPONSE) {

                    errorObj.appendProgrammerResponse(splited[1]);
                    this.statusForProgramerResponse = SetStatus.READING;

                    if (line + 1 < lines.length && this.isInformationFinished(lines[line + 1].split(' '))) {
                        this.statusForProgramerResponse = SetStatus.FINISHED;
                    }

                    /* if it's belong to no one, so it's a description */
                } else if (this.isFullLineString(lineText) || this.statusForDescription === SetStatus.READING) {

                    errorObj.appendDescription(splited[1]);
                    this.statusForDescription = SetStatus.READING;

                    if (line + 1 < lines.length && this.isInformationFinished(lines[line + 1].split(' '))) {
                        this.statusForDescription = SetStatus.FINISHED;
                    }
                }
            }
            this.resetAtributeStatus();
            errorObj = new ErrorModel();
        }
    }

    /**
     * When the description of a error is at the beginning of a page, then the error code is at the end of
     * the line.
     *
     * Ex: The page starts with: "DSNB320I  DSNB325A"
     * the next block of description and explanations refers to the code DSNB325A
     * @param line
     */
    private checkIfIsCodeInPage(line: string[]): boolean {
      return line.length > 1 && line[1].length === line[line.length - 1].length;
    }

    /**
     * Check if there is more informations relationated to the atribute.
     *
     * The description of some attribute ends when is made a break line or the first word of the next line is one
     * of the possible types of attributes
     *
     * @param line
     * @returns TRUE if the nextline if empty or null.
     * @returns FALSE if the attribute is still being filled
     * @returns NULL if none of the previous options was accepted
     */
    private isInformationFinished(nextline: string[]): boolean {
        if (nextline === null || nextline.length === 0) {
            return true;
        } else if (nextline[0] === KeyConsts.DESTINATION || nextline[0] === KeyConsts.EXPLANATION
          || nextline[0] === KeyConsts.SYSTEM_ACTION || nextline[0] === KeyConsts.PROGRAMER_RESPONSE
          || nextline[0] === KeyConsts.SYSTEM_PROGRAMER_RESPONSE) {
            return true;
        }
        return null;
    }

    /**
     * Check if the line if totally made by strings
     *
     * When a line is made totally by strings(there's not only numbers), it means that the line is a description
     * of some attribute
     * @param line
     */
    private isFullLineString(line: string): boolean {
        return !isNaN(+line);
    }

    /**
     * Verify if the line represent a error code
     *
     * A line can be a code if it is only number or the line has only one string which has at least length
     * equals to 8.
     * @param line
     */
    private checkIfIsCode(line: string): boolean {
        return !isNaN(+line) || line.length <= 8;
    }

    /**
     * Get code from a line if it's represents a page code
     *
     * Lines representing a page have the follow structure i.e:
     * "DSNB320I  DSNB325A".
     *
     * They(start page) show what is the first code error that will be described, and the last
     *
     * @param words line of the file
     */
    private getPaginationLine(words: string[]): string {
        return words[words.length - 1];
    }
}
