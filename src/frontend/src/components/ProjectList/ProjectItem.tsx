import React, {FC, MouseEvent, useState, Fragment} from "react";
import IProject from "../../models/Project";

import "./ProjectItem.css";
import {EditProject} from "../EditProject";

export interface IProjectItemProps {
    project: IProject;
    isSelected: boolean;
    isLoaded: boolean;
    onChange: (project: IProject) => void;
    onDelete: (id: number) => void;
    onSelected: (id: number) => void;
}

export const ProjectItem: FC<IProjectItemProps> = ({project, isSelected,isLoaded, onSelected, onChange, onDelete})  => {
    const [showEdit, setShowEdit] = useState(false);

    const handleEdit = (event: MouseEvent<HTMLDivElement>): void => {
        setShowEdit(true);
        event.preventDefault();
        event.stopPropagation();
    }

    const handleDelete = (event: MouseEvent<HTMLDivElement>): void => {
        onDelete(project.id);
        event.preventDefault();
        event.stopPropagation();
    }

    return (
        <li onClick={() => project.id ? onSelected(project.id) : null}
            className={"project-item list-group-item list-group-item-action" + (isSelected ? " active" : "")}
        >
            { showEdit
                ? <div className="edit-container">
                    <EditProject
                        value={project.title}
                        onAccept={(title: string) => {onChange({...project, title}); setShowEdit(false);}}
                        onCancel={() => {setShowEdit(false)}} />
                </div>
                : <Fragment>
                    {project.title}
                    <div className="project-buttons">
                        <div className="edit btn btn-success" onClick={handleEdit}>
                            <i className="fas fa-pencil-alt"/>
                        </div>
                        <div className="delete btn btn-danger" onClick={handleDelete}>
                            <i className="fas fa-trash"/>
                        </div>
                    </div>
                </Fragment>
            }
            {isLoaded &&
            <div className="project-spinner">
                <div className="spinner-border"/>
            </div>
            }
        </li>

    );
};
