import { SetStatus } from './../enuns/setStatus';

export class ErrorModel {
    private id?: number;
    private code: string;
    private destination: string;
    private description: string;
    private explanation: string;
    private system_action: string;
    private programmer_response: string;
    private sql_state: string;
    private searchs: number;
    private note: string;
    private setStatus: SetStatus;

    constructor() {

    }

    public get $id(): number {
        return this.id;
    }

    public set $id(value: number) {
        this.id = value;
    }

    public get $code(): string {
        return this.code;
    }

    public set $code(value: string) {
        this.code = value;
    }

    public get $destination(): string {
        return this.destination;
    }

    public set $destination(value: string) {
        this.destination = value;
    }

    public get $description(): string {
        return this.description;
    }

    public set $description(value: string) {
        this.description = value;
    }

    public get $explanation(): string {
        return this.explanation;
    }

    public set $explanation(value: string) {
        this.explanation = value;
    }

    public get $system_action(): string {
        return this.system_action;
    }

    public set $system_action(value: string) {
        this.system_action = value;
    }

    public get $programmer_response(): string {
        return this.programmer_response;
    }

    public set $programmer_response(value: string) {
        this.programmer_response = value;
    }

    public get $sql_state(): string {
        return this.sql_state;
    }

    public set $sql_state(value: string) {
        this.sql_state = value;
    }

    public get $searchs(): number {
        return this.searchs;
    }

    public set $searchs(value: number) {
        this.searchs = value;
    }

    public get $note(): string {
        return this.note;
    }

    public set $note(value: string) {
        this.note = value;
    }

    public get $setStatus(): SetStatus {
        return this.setStatus;
    }

    public set $setStatus(value: SetStatus) {
        this.setStatus = value;
    }
}
