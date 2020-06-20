import React from "react";
import {connect, ConnectedProps} from "react-redux";

import {IProjectsState} from "../../store/projects/state";
import {ProjectList} from "../ProjectList";
import {AppThunkDispatch, RootState} from "../../store";
import {
    deleteProjectThunkCreator,
    fetchProjectsThunkCreator,
    selectProject,
    updateProjectThunkCreator
} from "../../store/projects/actions";
import IProject from "../../models/Project";

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

type IDashboardPageAllProps = IDashboardPageProps & ConnectedProps<typeof connector>;

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
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <ProjectList
                                    projects={projects}
                                    onChange={this.props.updateProject}
                                    onDelete={this.props.deleteProject}
                                    onSelected={this.props.selectProject}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="card">
                            <div className="card-body">
                                Task list
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connector(DashboardPage);
