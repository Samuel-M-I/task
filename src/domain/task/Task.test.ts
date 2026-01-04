import { Task } from './Task';
//Task.test.ts
describe('Task domain invariants', () => {

    test('cannot create a task with empty name', () => {
        expect(() => Task.create('')).toThrow();
    });
    test('a task name can be changed explicitly', () => {
        const task = Task.create('Ir al gimnacio');
        task.rename('Ir al gimnasio');
        expect(task.name).toBe('Ir al gimnasio');
    });

    test('a task starts in pendiente state', () => {
        const task = Task.create('Ir al gym');
        expect(task.state).toBe('pendiente');
    });

    test('a task can be completed from pendiente', () => {
        const task = Task.create('Leer');
        task.complete();
        expect(task.state).toBe('completada');
    });

    test('a completed task cannot be completed again', () => {
        const task = Task.create('Estudiar');
        task.complete();
        expect(() => task.complete()).toThrow();
    });
});
