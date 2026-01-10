export class ProjectClosedError extends Error {
    constructor() {
        super('Project is closed');
    }
}

export class TaskAlreadyInProjectError extends Error {
    constructor() {
        super('Task already exists in project');
    }
}

export class TaskNotInProjectError extends Error {
    constructor() {
        super('Task not found in project');
    }
}

export class InvalidProjectNameError extends Error {
    constructor() {
        super('Project name is required');
    }
}
