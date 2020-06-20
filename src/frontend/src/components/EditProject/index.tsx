import React, {MouseEvent, FC, useState} from "react";

interface IEditProjectProps {
    value: string;
    onAccept?: (title: string) => void;
    onCancel?: () => void;
}

export const EditProject: FC<IEditProjectProps> = ({value, onAccept, onCancel}) => {
    const [title, setTitle] = useState(value);

    const handleAccept = () => {
        if (onAccept) onAccept(title);
    };

    const handleCancel = () => {
        if (onCancel) onCancel();
    }

    const stopClick = (event: MouseEvent<HTMLDivElement>): void => {
        event.stopPropagation();
    }

    return (
        <div className="input-group" onClick={stopClick}>
            <input type="text" className="form-control" placeholder="Project title" value={title} onChange={event => setTitle(event.target.value)}/>
            <div className="input-group-append">
                <button
                    className="btn btn-success"
                    type="button"
                    onClick={handleAccept}
                ><i className="fas fa-check"/></button>
                <button
                    className="btn btn-danger"
                    type="button"
                    onClick={handleCancel}
                ><i className="fas fa-times"/></button>
            </div>
        </div>
    );
}
