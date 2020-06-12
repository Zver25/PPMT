import React from "react";

export interface DashboardPageProps {

}

interface DashboardPageState {

}

class DashboardPage extends React.Component<DashboardPageProps, DashboardPageState>{

    render(): React.ReactNode {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                Project list
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