import { randomUUID } from "crypto";
import { TaskState } from "./TaskState";
export class Task {
    private _state: TaskState;
    name: string;
    readonly _id:string;
    private constructor(id:string,name:string){
        this.name = name;
        this._state = 'pendiente';
        this._id = id;

    }
    static create (name:string):Task {
        if (!name || name.trim() === ''){
            throw new Error('Task name cannot be empty');
        }
        return new Task(randomUUID(),name);
    }


    //getters
    get state():TaskState{
        return this._state;
    }
    get id():string{
        return this._id;
    }

    //ediciones
    rename(newName:string):void{
        if (!newName || newName.trim() === ''){
            throw new Error('Task name cannot be empty');
        }
        this.name = newName;
    }
    //state transitions
    complete():void{
        if(this._state === 'completada'){
            throw new Error('Task is already completed');
        }
        this._state = 'completada';
    }

}