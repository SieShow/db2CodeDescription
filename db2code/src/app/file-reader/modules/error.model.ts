export interface ErrorModelInterface {
    id: number;
    code: string;
    destination?: string;
    description: string;
    explanation: string;
    system_action: string;
    programmer_response: string;
    sql_state: string;
    searchs: number;
    note: string;
}
