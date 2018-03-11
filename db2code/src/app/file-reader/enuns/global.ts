/**
 * Refere if all atributes of a error object are setted
*/
export enum SetStatus {
    READING,
    FINISHED,
    NOTSETTED
}

/**
 * Represent the candy of error is working with
 */
export enum ErrorType {
    ERROR,
    SUCESS,
    WARNING
}

export class KeyConsts {
    public static CODE = 'code';
    public static DESCRIPTION = 'Description:';
    public static EXPLANATION = 'Explanation:';
    public static PROGRAMER_RESPONSE = 'Programmer Response:';
    public static SYSTEM_PROGRAMER_RESPONSE = 'System Programmer Response';
    public static DESTINATION = 'Destination:';
    public static SYSTEM_ACTION = 'System Action:';
    public static NOTE = 'Note:';
    public static SQL_ERRO = 'Error SQL codes';
}
