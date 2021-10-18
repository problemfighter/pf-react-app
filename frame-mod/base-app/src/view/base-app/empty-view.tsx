import React from 'react';
import PFComponent from "@pfo/pf-react/src/artifacts/component/pf-component";
import PFComponentState from "@pfo/pf-react/src/artifacts/component/pf-component-state";


export default class EmptyView extends PFComponent<any, PFComponentState> {
    renderUI() {
        return (
            <React.Fragment>
                <h1>My Empty View</h1>
            </React.Fragment>
        );
    }
}