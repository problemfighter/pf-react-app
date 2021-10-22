import PFReactComponent from "@pfo/pf-react/src/artifacts/component/pf-react-component";
import React from "react";
import PFLayoutRenderer from "@pfo/pf-react/src/artifacts/component/pf-layout-rander";
import Bootstrap from "@pfo/pf-rui/bootstrap/Bootstrap";
import LeftSidebarView from "../snippet/left-sidebar-view";
import "./../../assets/css/style.css"
import "./../../assets/css/common.css"
import "./../../assets/libs/js/bootstrap.bundle.min"

export default class PrivateLayout extends PFReactComponent<any, any> {

    render() {
        const {component, route, appConfig} = this.props;
        return (
            <Bootstrap>
                <LeftSidebarView route={route}/>
                <PFLayoutRenderer route={route} appConfig={appConfig} component={component}/>
            </Bootstrap>
        );
    }
}