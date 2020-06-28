import React, {FC} from "react";
import ITask from "../../models/Task";

interface TaskItemProps {
    task: ITask;
    onComplete: (id: number) => void;
    onDelete: (id: number) => void;
}

export const TaskItem: FC<TaskItemProps> = ({task}) => (
    <li className="list-group-item">
        <div className="todo-indicator bg-focus"/>
        <div className="widget-content p-0">
            <div className="widget-content-wrapper">
                <div className="widget-content-left mr-2">
                    <div className="custom-checkbox custom-control">
                        <label className="custom-control-label" htmlFor="exampleCustomCheckbox1">
                            <input
                                className="custom-control-input"
                                id="exampleCustomCheckbox1"
                                type="checkbox"/>
                        </label>
                    </div>
                </div>
                <div className="widget-content-left">
                    <div className="widget-heading">{task.title}</div>
                </div>
                <div className="widget-content-right">
                    <button className="border-0 btn-transition btn btn-outline-success">
                        <i className="fa fa-check"/></button>
                    <button className="border-0 btn-transition btn btn-outline-danger">
                        <i className="fa fa-trash"/></button>
                </div>
            </div>
        </div>
    </li>
);