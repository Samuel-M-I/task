import { Project } from './Project';

describe('Project domain', () => {

  // 🧪 Test 1 — creación válida
    test('cannot create a project without a name', () => {
        expect(() => {
            Project.create('');
        }).toThrow();
    });

  // 🧪 Test 2 — agregar taskId
    test('open project can add a taskId', () => {
        const project = Project.create('My Project');
        const taskId = 'task-1';

        project.addTask(taskId);

        expect(project.getTaskIds).toContain(taskId);
    });

  // 🧪 Test 3 — evitar duplicados
    test('cannot add the same taskId twice', () => {
        const project = Project.create('My Project');
        const taskId = 'task-1';

        project.addTask(taskId);

        expect(() => {
            project.addTask(taskId);
        }).toThrow();
    });

  // 🧪 Test 4 — remover taskId
    test('can remove an existing taskId', () => {
        const project = Project.create('My Project');
        const taskId = 'task-1';

        project.addTask(taskId);
        project.removeTask(taskId);

        expect(project.getTaskIds).not.toContain(taskId);
    });

  // 🧪 Test 5 — error al remover inexistente
    test('throws error when removing a taskId that does not belong to project', () => {
        const project = Project.create('My Project');

        expect(() => {
        project.removeTask('non-existent-task');
        }).toThrow();
    });

  // 🧪 Test 6a — proyecto cerrado no permite addTask
    test('closed project does not allow adding tasks', () => {
        const project = Project.create('My Project');
        project.close();

        expect(() => {
        project.addTask('task-1');
        }).toThrow();
    });

  // 🧪 Test 6b — proyecto cerrado no permite removeTask
    test('closed project does not allow removing tasks', () => {
        const project = Project.create('My Project');
        const taskId = 'task-1';

        project.addTask(taskId);
        project.close();

        expect(() => {
        project.removeTask(taskId);
        }).toThrow();
    });

});
