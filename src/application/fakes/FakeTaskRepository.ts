import { Task } from '../../domain/task/Task';
import { TaskRepository } from '../ports/TaskRepository';

export class FakeTaskRepository implements TaskRepository {
    private tasks = new Map<string, Task>();

    async findById(id: string): Promise<Task | null> {
        return this.tasks.get(id) ?? null;
    }

    async save(task: Task): Promise<void> {
        this.tasks.set(task.id, task);
    }

    add(task: Task): void {
        this.tasks.set(task.id, task);
    }
}
