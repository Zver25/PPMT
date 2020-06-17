import React, {FC} from "react";
import {IProjectsState} from "../../store/projects/state";
import IProject from "../../models/Project";

export interface IProjectListProps {
    projects: IProjectsState,
    onChange: (project: IProject) => void;
    onDelete: (id: number) => void;
    onSelected: (id: number) => void;
}

export const ProjectList: FC<IProjectListProps> = ({projects, onChange, onDelete, onSelected})  => (
    <ul className="list-group list-group-flush">
        { projects.list.map((project: IProject) =>
            <li onClick={() => project.id ? onSelected(project.id): null}
                className={"list-group-item list-group-item-action" + (project.id === projects.selectedProjectId? 'list-group-item-active' : '')}
            >
                {project.title}
            </li>)
        }
    </ul>
);
