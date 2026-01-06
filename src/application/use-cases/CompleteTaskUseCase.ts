import { ProjectRepository } from '../ports/ProjectRepository';
import { TaskRepository } from '../ports/TaskRepository';


export class CompleteTaskUseCase {
    constructor(
        private readonly projectRepository: ProjectRepository,
        private readonly taskRepository: TaskRepository
    ) {}

    async execute(taskId: string, projectId?: string): Promise<void> {
        if (projectId) {
            const project = await this.projectRepository.findById(projectId);
            if (!project) throw new Error('Project not found');

            project.completeTask(taskId);
            await this.projectRepository.save(project);
            return;
        }

        const task = await this.taskRepository.findById(taskId);
        if (!task) throw new Error('Task not found');

        task.complete();
        await this.taskRepository.save(task);
    }
}
