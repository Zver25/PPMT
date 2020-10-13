import React from "react";
import {connect, ConnectedProps} from "react-redux";
import {RouteComponentProps, withRouter, Switch, Route} from "react-router-dom";

import {IProjectsState} from "../../store/projects/state";
import {ProjectListContainer} from "../ProjectListContainer";
import {AppThunkDispatch, RootState} from "../../store";
import {
    deleteProjectThunkCreator,
    fetchProjectsThunkCreator,
    selectProject,
    updateProjectThunkCreator
} from "../../store/projects/actions";
import IProject from "../../models/Project";
import {TaskList} from "../TaskList";
import {ProjectList} from "../ProjectListContainer/ProjectList";

import "./style.css";

export interface IDashboardPageProps {
}

interface IDashboardPageState {
    projectList: Array<IProject>;
}

interface IDashboardStateProps {
    projects: IProjectsState;
}

interface IDashboardDispatchProps {
    fetchProjects: () => void;
    updateProject: (project: IProject) => void;
    deleteProject: (id: number) => void;
    selectProject: (id: number) => void;
}

type IDashboardPageAllProps = IDashboardPageProps & ConnectedProps<typeof connector> & RouteComponentProps;

const mapStateToProps = (state: RootState): IDashboardStateProps => ({
    projects: state.projects
});

const mapDispatchToProps = (dispatch: AppThunkDispatch): IDashboardDispatchProps => ({
    fetchProjects: () => dispatch(fetchProjectsThunkCreator()),
    updateProject: (project: IProject) => dispatch(updateProjectThunkCreator(project)),
    deleteProject: (id: number) => dispatch(deleteProjectThunkCreator(id)),
    selectProject: (id: number) => dispatch(selectProject(id))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

class DashboardPage extends React.Component<IDashboardPageAllProps, IDashboardPageState> {

    componentDidMount() {
        this.props.fetchProjects();
    }

    render(): React.ReactNode {
        const {projects} = this.props;
        return (
            <div className="main-container container">
                <div className="row" style={{ height: "100%" }}>
                    <div className="col-4">
                        <ProjectListContainer
                            projects={projects}
                            onChange={this.props.updateProject}
                            onDelete={this.props.deleteProject}
                            onSelected={this.props.selectProject}
                        />
                    </div>
                    <div className="col-8">
                        <TaskList tasks={[]} />
                    </div>
                </div>
            </div>
        );
    }
}

export default connector(withRouter(DashboardPage));
