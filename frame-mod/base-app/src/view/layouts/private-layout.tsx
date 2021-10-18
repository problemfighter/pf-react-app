import PFReactComponent from "@pfo/pf-react/src/artifacts/component/pf-react-component";
import React from "react";
import PFLayoutRenderer from "@pfo/pf-react/src/artifacts/component/pf-layout-rander";

export default class PrivateLayout extends PFReactComponent<any, any> {

    render() {
        const {component, route, appConfig} = this.props;
        return (
            <React.Fragment>
                <PFLayoutRenderer route={route} appConfig={appConfig} component={component}/>
            </React.Fragment>
        );
    }
}