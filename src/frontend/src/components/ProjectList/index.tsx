import React, {FC, Fragment, useState} from "react";
import {IProjectsState} from "../../store/projects/state";
import IProject from "../../models/Project";
import {ProjectItem} from "./ProjectItem";
import {EditProject} from "../EditProject";

import "./style.css";

export interface IProjectListProps {
    projects: IProjectsState,
    onChange: (project: IProject) => void;
    onDelete: (id: number) => void;
    onSelected: (id: number) => void;
}

export const ProjectList: FC<IProjectListProps> = ({projects, onChange, onDelete, onSelected}) => {
    const [showForm, setShowForm] = useState(false);

    return (
        <Fragment>
            { projects.isSync === 0
                ? <div className="spinner-border"/>
                : <ul className="list-group list-group-flush">
                    {projects.list.sort((a: IProject, b: IProject) => (a.createdAt || 0) - (b.createdAt || 0)).map((project: IProject) =>
                        <ProjectItem
                            key={project.id}
                            project={project}
                            isSelected={project.id === projects.selectedProjectId}
                            isLoaded={project.id === projects.isSync}
                            onChange={onChange}
                            onDelete={onDelete}
                            onSelected={onSelected}/>
                    )}
                </ul>
            }
            <div className="project-list-bottom">
                { showForm
                    ? <EditProject
                        value=""
                        onAccept={(title: string) => {setShowForm(false); onChange({id: 0, title})}}
                        onCancel={() => {setShowForm(false)}}/>
                    : <div className="btn btn-block btn-primary" onClick={() => setShowForm(true)}>Add project</div>
                }
            </div>
        </Fragment>
    );
}
