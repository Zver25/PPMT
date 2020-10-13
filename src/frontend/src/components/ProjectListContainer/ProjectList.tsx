import React, {FC} from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import {ProjectItem} from "./ProjectItem";
import IProject from "../../models/Project";
import PerfectScrollbar from "react-perfect-scrollbar";
import {IProjectsState} from "../../store/projects/state";

interface IProjectListProps {
    projects: IProjectsState,
    onChange: (project: IProject) => void;
    onDelete: (id: number) => void;
    onSelected: (id: number) => void;
}

export const ProjectList: FC<IProjectListProps> = ({projects, onSelected, onChange, onDelete})  => {

    return (
        <Switch>
            <Redirect exact from="/" to="/projects/list" />
            <Route path={'/projects/:projectId'}>
                <PerfectScrollbar>
                    <ul className="list-group list-group-flush">
                        {projects.list.sort((a: IProject, b: IProject) => (a.createdAt || 0) - (b.createdAt || 0)).map((project: IProject) =>
                            <ProjectItem
                                baseUrl={'/projects'}
                                key={project.id}
                                project={project}
                                isLoaded={project.id === projects.isSync}
                                onChange={onChange}
                                onDelete={onDelete}
                                onSelected={onSelected}/>
                        )}
                    </ul>
                </PerfectScrollbar>
            </Route>
        </Switch>
    );
}
