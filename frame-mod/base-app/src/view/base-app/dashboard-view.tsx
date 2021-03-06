import React from 'react';
import {PFProps} from "@pfo/pf-react/src/artifacts/interface/pf-mixed-interface";
import PFComponentState from "@pfo/pf-react/src/artifacts/component/pf-component-state";
import PFComponent from "@pfo/pf-react/src/artifacts/component/pf-component";


interface Props extends PFProps {
    route: any;
}

class State extends PFComponentState {

}

export default class DashboardView extends PFComponent<Props, State> {

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
                <h1>Bismillah</h1>
            </React.Fragment>
        )
    }

}