import { STATUS } from "./Status.enum";

export class Task {
    id = 0;
    title = '';
    description = '';
    status = STATUS.PENDIENTE;

    constructor(id, title, description, status) {
        this.id = id
        this.title = title
        this.description = description
        this.status = status
    }
}