import { FakeProjectRepository } from "../../../infrastructure/persistence/fakes/FakeProjectRepository";
import { Project } from "../../../domain/project/Project";
import { Task } from "../../../domain/task/Task";
import {ListTaskIdsUseCase} from "../ListTaskIdsUseCase";
import { ProjectNotFoundError } from "../UseCaseErrors";

describe('ListTaskIdsUseCase', () => {
    test('successfully create the list of taskIds', async()=>{
        const projectrepo = new FakeProjectRepository();
        const project= Project.create('Projecto');
        const task= Task.create('tarea');
        const useCase = new ListTaskIdsUseCase(projectrepo);
        project.addTask(task.id);
        projectrepo.save(project);
        expect(await useCase.execute(project.id)).toStrictEqual([task.id]);
    });
        test('Project not exist', async()=>{
        const projectrepo = new FakeProjectRepository();
        const project= Project.create('Projecto');
        const task= Task.create('tarea');
        const useCase = new ListTaskIdsUseCase(projectrepo);
        project.addTask(task.id);
        projectrepo.save(project);
        await expect( useCase.execute("Projecto2")).rejects.toThrow(ProjectNotFoundError);
    });
        test('when there is no task on a project', async()=>{
        const projectrepo = new FakeProjectRepository();
        const project= Project.create('Projecto');
        const useCase = new ListTaskIdsUseCase(projectrepo);
        projectrepo.save(project);
        expect(await useCase.execute(project.id)).toStrictEqual([]);
    });
});
