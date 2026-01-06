import { Project } from '../../domain/project/Project';

export interface ProjectRepository {
    findById(id: string): Promise<Project | null>;
    save(project: Project): Promise<void>;
}
