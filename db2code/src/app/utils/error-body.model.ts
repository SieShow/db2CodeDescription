export interface ErrorBody {
    id: number;
    code: string;
    description: string;
    explanation: string;
    system_action: string;
    programmer_response: string;
    sql_state: number;
    searchs: number;
}
