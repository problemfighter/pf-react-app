import React from 'react';
import {PFProps} from "@pfo/pf-react/src/artifacts/interface/pf-mixed-interface";
import PFComponentState from "@pfo/pf-react/src/artifacts/component/pf-component-state";
import PFComponent from "@pfo/pf-react/src/artifacts/component/pf-component";
import Button from "../../../../../dev-libs/pf-rui/bootstrap/Button";


interface Props extends PFProps {
    route: any;
}

class State extends PFComponentState {

}

export default class TableView extends PFComponent<Props, State> {

    state: State = new State();

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps: Props) {
    }

    renderUI() {
        return (
            <React.Fragment>
                <div className={"action-panel"}>
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center border-bottom mt-3">
                        <h1 className="h4">Data List</h1>
                        <div className="mb-2 d-flex sm-d-block">
                            <form>
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search"/>
                                    <button className="btn  btn-secondary" title="Search" type="submit">
                                        <i className="bi bi-search"></i>
                                    </button>
                                    <a href="#" title="Create" className="btn btn-primary">
                                        <i className="bi bi-file-earmark-plus"></i>
                                    </a>
                                    <a href="#" title="Reset" type="reset" className="btn btn-danger">
                                        <i className="bi bi-arrow-clockwise"></i>
                                    </a>
                                </div>
                            </form>
                            <div className="input-group additional-action">
                                <Button type={"button"} title={"Quick Action"} variant={"secondary"}>
                                    <i className="bi bi-card-list"></i>
                                </Button>
                                <Button type={"button"} title={"Data Filter"}>
                                    <i className="bi bi-funnel"></i>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}