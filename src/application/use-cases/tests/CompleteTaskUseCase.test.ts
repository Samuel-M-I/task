import { CompleteTaskUseCase } from '../CompleteTaskUseCase';
import { FakeProjectRepository } from '../../fakes/FakeProjectRepository';
import { FakeTaskRepository } from '../../fakes/FakeTaskRepository';
import { Project } from '../../../domain/project/Project';
import { Task } from '../../../domain/task/Task';

describe('CompleteTaskUseCase', () => {

    test('completes a task inside a project', async () => {
        const projectRepo = new FakeProjectRepository();
        const taskRepo = new FakeTaskRepository();

        const project = Project.create('Proyecto');
        const task = Task.create('Tarea');

        project.addTask(task);
        projectRepo.add(project);

        const useCase = new CompleteTaskUseCase(projectRepo, taskRepo);

        await useCase.execute(task.id, project.id);

        const savedProject = await projectRepo.findById(project.id)!;
        expect(savedProject!.isComplete()).toBe(true);
    });

    test('completes a standalone task', async () => {
        const projectRepo = new FakeProjectRepository();
        const taskRepo = new FakeTaskRepository();

        const task = Task.create('Tarea suelta');
        taskRepo.add(task);

        const useCase = new CompleteTaskUseCase(projectRepo, taskRepo);

        await useCase.execute(task.id);

        const savedTask = await taskRepo.findById(task.id)!;
        expect(savedTask!.state).toBe('completada');
    });

    test('throws error if project not found', async () => {
        const useCase = new CompleteTaskUseCase(
        new FakeProjectRepository(),
        new FakeTaskRepository()
        );

    await expect(useCase.execute('task-id', 'project-id')).rejects.toThrow('Project not found');
    });

    test('throws error if standalone task not found', async () => {
        const useCase = new CompleteTaskUseCase(
        new FakeProjectRepository(),
        new FakeTaskRepository()
        );

        await expect(useCase.execute('task-id')).rejects.toThrow('Task not found');
    });

});
