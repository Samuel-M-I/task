import { ProjectRepository } from '../ports/ProjectRepository';
import { ProjectNotFoundError } from './UseCaseErrors';


export class ListTaskIdsUseCase {
    constructor(
        private readonly projectRepo: ProjectRepository,
    ) {}

    async execute(projectId: string): Promise<ReadonlyArray<string>> {
        const project = await this.projectRepo.findById(projectId);
        if (project === null) {
            throw new ProjectNotFoundError();
        }
        return project.getTaskIds;
    
    }}
