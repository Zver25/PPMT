import React, {FC, useState} from "react";

import {IProjectsState} from "../../store/projects/state";
import IProject from "../../models/Project";
import {EditProject} from "../EditProject";
import {ProjectList} from "./ProjectList";

import "./style.css";

interface IProjectListContainerProps {
    projects: IProjectsState,
    onChange: (project: IProject) => void;
    onDelete: (id: number) => void;
    onSelected: (id: number) => void;
}

export const ProjectListContainer: FC<IProjectListContainerProps> = ({projects, onChange, onDelete, onSelected}) => {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="card">
            <div className="card-header-tab card-header">
                <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                    Project list
                </div>
            </div>
            <div className="card-body">
                { projects.isSync === 0
                    ? <div className="spinner-border"/>
                    : <ProjectList projects={projects} onChange={onChange} onDelete={onDelete} onSelected={onSelected} />
                }
            </div>
            <div className="card-footer project-list-bottom">
                { showForm
                    ? <EditProject
                        value=""
                        onAccept={(title: string) => {setShowForm(false); onChange({id: 0, title})}}
                        onCancel={() => {setShowForm(false)}}/>
                    : <div className="btn btn-block btn-primary" onClick={() => setShowForm(true)}>Add project</div>
                }
            </div>
        </div>
    );
}
