
import { ProjectRepository } from "../ports/ProjectRepository";
export class RemoveTaskUseCase {
    constructor(private projectRepo:ProjectRepository){}
    async execute(taskId:string, projectId:string):Promise<void>{
        const project = await this.projectRepo.findById(projectId);
        if(project=== null){throw Error("Project not found")}
        project.removeTask(taskId);
        await this.projectRepo.save(project); 
    }
}