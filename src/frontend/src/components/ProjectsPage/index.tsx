import React from "react";
import {Action, AnyAction} from "redux";
import { ThunkDispatch } from "redux-thunk";
import {IProject, IProjectsState} from "../../store/projects/state";
import {ProjectList} from "../ProjectList";
import {AppActions, AppThunkDispatch, RootState} from "../../store";
import {
    deleteProjectThunkCreator,
    fetchProjectsThunkCreator,
    updateProjectThunkCreator,
    selectProject
} from "../../store/projects/actions";
import {connect} from "react-redux";

export interface DashboardPageProps {

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

type IDashboardAllProps = DashboardPageProps | IDashboardPageState | IDashboardStateProps;

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

class DashboardPage extends React.Component<DashboardPageProps, IDashboardPageState>{

    constructor(props: DashboardPageProps) {
        super(props);
        this.state = {
            projectList: [
                {
                    id: 1,
                    title: 'First project'
                },
                {
                    id: 2,
                    title: 'Second project'
                }
            ]
        }
    }

    render(): React.ReactNode {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <ProjectList list={this.state.projectList} />
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

export default DashboardPage;