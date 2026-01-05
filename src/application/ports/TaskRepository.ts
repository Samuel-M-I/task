import { Task } from '../../domain/task/Task';

export interface TaskRepository {
    findById(id: string): Task | null;
    save(task: Task): void;
}
