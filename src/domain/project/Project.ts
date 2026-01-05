import { randomUUID } from 'crypto';
import {Task} from '../task/Task';

export class Project{
    readonly _id:string;
    name:string;
    private tasks: Task[]=[];
    private closed: boolean = false;
    constructor(id:string, name:string){
        this.name = name;
        this._id = id;   
    }
    static create(name:string):Project{
        if (!name || name.trim() === ''){    
            throw new Error('Project name cannot be empty');
        }
        return new Project(randomUUID(),name);
    }

    //getters
    isComplete():boolean{
        if(this.tasks.length ===0){ return false; }
        return this.tasks.every(task => task.state === 'completada');
    }
    get id():string{
        return this._id;
    }

    getProgress():number|null{
        if(this.tasks.length ===0){ return null; }
        return this.tasks.filter(t=>t.state==='completada').length / this.tasks.length;

    }
    //edicion del Project
    rename(newName:string):void{
        if (this.closed){
            throw new Error('Cannot rename a closed project');
        }
        if (!newName || newName.trim() === ''){
            throw new Error('Project name cannot be empty');
        }
        this.name = newName;
    }
    close():void{
        this.closed = true;
    }
    reopen():void{
        this.closed = false;
    }

    //task management
    addTask(task:Task):void{
        if(this.closed){
            throw new Error('Cannot add tasks to a closed project');
        }
        this.tasks.push(task);
    }
    removeTask(taskId:string):void{
        if(this.closed){
            throw new Error('Cannot rename tasks in a closed project');
        }
        const indice = this.tasks.findIndex(t => t.id === taskId);
        if (indice === -1){
            throw new Error('Task not found in project')
        }
        this.tasks.splice(indice,1);
    }

    renameTask(taskId:string, newName:string):void{
        if(this.closed){
            throw new Error('Cannot rename tasks in a closed project');
        }
        const task = this.tasks.find(t => t.id === taskId);
        if(!task){
            throw new Error('Task not found in project');
        }
        task.rename(newName);
    }
    completeTask(taskId:string):void{
        if(this.closed){
            throw new Error('Cannot complete tasks in a closed project');
        }
        const task = this.tasks.find(t => t.id === taskId);
        if(!task){
            throw new Error('Task not found in project');
        }
        task.complete();
    }

}