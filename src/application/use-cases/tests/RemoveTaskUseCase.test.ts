import { FakeProjectRepository } from "../../fakes/FakeProjectRepository";
import { Project } from "../../../domain/project/Project";
import { Task } from "../../../domain/task/Task";
import {RemoveTaskUseCase} from "../RemoveTaskUseCase";

describe('RemoveTaskUseCase', () => {
    test('successfully removes a task from a project', async()=>{
        const projectrepo = new FakeProjectRepository();
        const project= Project.create('Projecto');
        const task= Task.create('tarea');
        const useCase = new RemoveTaskUseCase(projectrepo);
        project.addTask(task);
        projectrepo.save(project);
        await useCase.execute(task.id, project.id);
        const savedProject = await projectrepo.findById(project.id);
        expect(savedProject!.getProgress()).toBeNull();
    });
    test('throws error when removing a task twice', async()=>{
        const projectrepo = new FakeProjectRepository();
        const project= Project.create('Projecto');
        const task= Task.create('tarea');
        project.addTask(task);
        projectrepo.add(project);

        const useCase = new RemoveTaskUseCase(projectrepo);
        await useCase.execute(task.id, project.id);

        await expect(useCase.execute(task.id, project.id)).rejects.toThrow();
        
    });
        test('throws error when project does not exist', async()=>{
        const projectrepo = new FakeProjectRepository();


        const useCase = new RemoveTaskUseCase(projectrepo);

        await expect(useCase.execute('task','project')).rejects.toThrow();
        
    });
    test('throws error when task does not belong to project', async()=>{
        const projectrepo = new FakeProjectRepository();
        const task1= Task.create('tarea1');
        const task2= Task.create('tarea2');
        const project= Project.create('Projecto');
        project.addTask(task1);
        projectrepo.add(project);

        const useCase = new RemoveTaskUseCase(projectrepo);

        await expect(useCase.execute(task2.id,project.id)).rejects.toThrow();
        
    });

});
