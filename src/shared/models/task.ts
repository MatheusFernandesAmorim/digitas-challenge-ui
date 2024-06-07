export interface Task {
    id: number;
    name: string;
    description: string;
    starts: Date;
    ends: Date;
    status: string;
}