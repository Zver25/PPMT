import React, {FC, Fragment, MouseEvent, useState} from "react";
import {Link, useParams} from "react-router-dom";
import IProject from "../../models/Project";

import "./ProjectItem.css";
import {EditProject} from "../EditProject";

export interface IProjectItemProps {
    baseUrl: string;
    project: IProject;
    isLoaded: boolean;
    onChange: (project: IProject) => void;
    onDelete: (id: number) => void;
    onSelected: (id: number) => void;
}

export const ProjectItem: FC<IProjectItemProps> = ({baseUrl,project, isLoaded, onSelected, onChange, onDelete}) => {
    const [showEdit, setShowEdit] = useState(false);
    const {projectId} = useParams();

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

    const isSelected = parseInt(projectId) === project.id;

    return isLoaded
        ? <div className="project-spinner">
            <div className="spinner-border"/>
        </div>
        : <li onClick={() => project.id ? onSelected(project.id) : null}
              className={"project-item list-group-item list-group-item-action" + (isSelected ? " active" : "")}
        >
            {showEdit
                ? <div className="edit-container">
                    <EditProject
                        value={project.title}
                        onAccept={(title: string) => {
                            onChange({...project, title});
                            setShowEdit(false);
                        }}
                        onCancel={() => {
                            setShowEdit(false)
                        }}/>
                </div>
                : <Fragment>
                    <Link to={`${baseUrl}/${project.id}`}>{project.title}</Link>
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
        </li>
        ;
};
