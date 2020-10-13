import React, {FC} from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import ITask from "../../models/Task";
import {TaskItem} from "./TaskItem";
import "./style.css";

interface TaskListProps {
    tasks: Array<ITask>
}

export const TaskList: FC<TaskListProps> = ({tasks}) => (
    <div className="card">
        <div className="card-header-tab card-header">
            <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                <i className="fas fa-tasks"/>&nbsp;Task List
            </div>
        </div>
        <div className="card-body">
            <PerfectScrollbar>
                <div style={{position: "static"}} className="ps ps--active-y">
                    <div className="ps-content">
                        <ul className=" list-group list-group-flush">
                            {tasks.map(item =>
                                <TaskItem
                                    task={item}
                                    onComplete={() => { }}
                                    onDelete={() => { }}/>)
                            }
                        </ul>
                    </div>
                </div>
            </PerfectScrollbar>
        </div>
        <div className="d-block text-right card-footer">
            <button className="btn btn-primary">Add Task</button>
        </div>
    </div>
);