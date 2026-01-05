import { Project } from '../../domain/project/Project';

export interface ProjectRepository {
    findById(id: string): Project | null;
    save(project: Project): void;
}
