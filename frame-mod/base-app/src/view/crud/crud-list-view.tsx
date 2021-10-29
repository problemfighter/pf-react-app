import {PFProps} from "@pfo/pf-react/src/artifacts/interface/pf-mixed-interface";
import PFComponentState from "@pfo/pf-react/src/artifacts/component/pf-component-state";
import PFComponent from "@pfo/pf-react/src/artifacts/component/pf-component";
import React from "react";

interface Props extends PFProps {}



class State extends PFComponentState {
    apiData: any;
    list: any = [];
}


export default class CrudListView extends PFComponent<Props, State> {

    state: State = new State();

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        this.showRedirectMessage();
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