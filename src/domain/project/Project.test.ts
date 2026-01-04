import { Project } from './Project';
import { Task } from '../task/Task';
//Project.test.ts
describe('Project domain invariants', () => {

    test('cannot create a task with empty name', () => {
        expect(() => Project.create('')).toThrow();
    });
        test('a Project name can be changed explicitly', () => {
        const project = Project.create('Ir al gimnacio');
        project.rename('Ir al gimnasio');
        expect(project.name).toBe('Ir al gimnasio');
    });

    test('a project is not complete if it has no tasks', () => {
        const project = Project.create('Proyecto vacío');
        expect(project.isComplete()).toBe(false);
    });

    test('a project becomes complete when all tasks are completed', () => {
        const project = Project.create('Proyecto 1');
        const task = Task.create('Tarea 1');

        project.addTask(task);
        project.completeTask(task.id);

        expect(project.isComplete()).toBe(true);
    });

    test('a closed project does not accept new tasks', () => {
        const project = Project.create('Proyecto cerrado');
        project.close();

        expect(() => project.addTask(Task.create('Nueva tarea'))).toThrow();
    });
    test('cannot rename project when closed', () => {
    const project = Project.create('Proyecto');
    project.close();

    expect(() => project.rename('Nuevo nombre')).toThrow();
    });

    test('cannot complete a task when project is closed', () => {
        const project = Project.create('Proyecto');
        const task = Task.create('Tarea');

        project.addTask(task);
        project.close();

        expect(() => project.completeTask(task.id)).toThrow();
    });


    test('project progress is null when it has no tasks', () => {
        const project = Project.create('Proyecto vacío');
        expect(project.getProgress()).toBeNull();
    });

    test('project progress is 0 when it has tasks but none completed', () => {
        const project = Project.create('Proyecto');
        project.addTask(Task.create('T1'));
        project.addTask(Task.create('T2'));

        expect(project.getProgress()).toBe(0);
    });

    test('project progress reflects completed tasks ratio', () => {
    const project = Project.create('Proyecto');
    const t1 = Task.create('T1');
    const t2 = Task.create('T2');

    project.addTask(t1);
    project.addTask(t2);
    project.completeTask(t1.id);
    
    expect(project.getProgress()).toBe(0.5);
    });

    test('project progress is 1 when all tasks are completed', () => {
        const project = Project.create('Proyecto');
        const t1 = Task.create('T1');

        project.addTask(t1);
        project.completeTask(t1.id);

        expect(project.getProgress()).toBe(1);
    });



});
