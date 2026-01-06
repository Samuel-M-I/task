import { Project } from '../../domain/project/Project';
import { ProjectRepository } from '../ports/ProjectRepository';

export class FakeProjectRepository implements ProjectRepository {
    private projects = new Map<string, Project>();

    async findById(id: string): Promise<Project | null> {
        return this.projects.get(id) ?? null;
    }

    async save(project: Project): Promise<void> {
        this.projects.set(project.id, project);
    }

    add(project: Project): void {
        this.projects.set(project.id, project);
    }
}
