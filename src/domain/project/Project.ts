import { randomUUID } from 'crypto';
import {
    ProjectClosedError,
    TaskAlreadyInProjectError,
    TaskNotInProjectError,
    InvalidProjectNameError
} from './ProjectsErrors';
export class Project{
    private readonly   _id:string;
    private _name:string;
    private _tasksIds: string[]=[];
    private _isclosed: boolean = false;
    private constructor(id:string, _name:string){
        this._name = _name;
        this._id = id;   
    }
    static create(_name:string):Project{
        if (!_name || _name.trim() === ''){    
            throw new InvalidProjectNameError;
        }
        return new Project(randomUUID(),_name);
    }

    //getters
    get id():string{
        return this._id;
    }
    get name():string{
        return this._name;
    }
    get getTaskIds():ReadonlyArray<string>{
        return Array.from(this._tasksIds);
    }
    //edicion del Project
    rename(newName:string):void{
        if (this._isclosed){
            throw new ProjectClosedError;
        }
        if (!newName || newName.trim() === ''){
            throw new InvalidProjectNameError;
        }
        this._name = newName;
    }
    close():void{
        this._isclosed = true;
    }
    reopen():void{
        this._isclosed = false;
    }

    //task management
    searchTask(taskId:string):boolean{
        return this._tasksIds.includes(taskId);
    }
    addTask(taskId:string):void{
        if(this._isclosed){
            throw new ProjectClosedError;
        } else if(this._tasksIds.includes(taskId)){
            throw new TaskAlreadyInProjectError;
        }
        this._tasksIds.push(taskId);
    }
    removeTask(taskId:string):void{
        if(this._isclosed){
            throw new ProjectClosedError;
        }
        const indice = this._tasksIds.findIndex(t => t === taskId);
        if (indice === -1){
            throw new TaskNotInProjectError;
        }
        this._tasksIds.splice(indice,1);
    }


}