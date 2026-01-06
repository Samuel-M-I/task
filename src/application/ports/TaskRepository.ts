import { Task } from '../../domain/task/Task';

export interface TaskRepository {
    findById(id: string): Promise<Task | null>;
    save(task: Task): Promise<void>;
}
