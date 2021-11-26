import PFReactComponent from "@pfo/pf-react/src/artifacts/component/pf-react-component";
import React from "react";
import Bootstrap from "@pfo/pf-rui/bootstrap/Bootstrap";
import LeftSidebarSnippet from "../snippet/left-sidebar-snippet";
import "./../../assets/css/style.css"
import "./../../assets/css/left-sidebar.css"
import "./../../assets/css/topbar.css"

import "./../../assets/libs/js/bootstrap.bundle.min"
import TopBarSnippet from "../snippet/top-bar-snippet";
import Container from "@pfo/pf-rui/bootstrap/Container";
import PFLayoutRenderer from "@pfo/pf-react/src/artifacts/component/pf-layout-rander";
import {DummyTopNavBar, TopNavData} from "../../data/top-nav-data";
import {DummyLeftNavBar, LeftNavData} from "../../data/left-nav-data";
import PFBrowserStorageManager from "@pfo/pf-react/src/artifacts/manager/pf-browser-storage-manager";
import {Redirect} from "react-router";

interface Props {
    route?: any;
    appConfig?: any;
    component?: any;
    topNavData?: TopNavData;
    leftNavData?: LeftNavData;
}

export default class PrivateLayout extends PFReactComponent<Props, any> {

    static defaultProps = {
        topNavData: DummyTopNavBar.get(),
        leftNavData: DummyLeftNavBar.get()
    }

    render() {
        if (!Boolean(PFBrowserStorageManager.getByKey("isAuthorized"))) {
            return (<Redirect to="/"/>);
        }
        const {component, route, appConfig, topNavData} = this.props;
        let leftNavData = this.props.leftNavData
        let storageNav = PFBrowserStorageManager.getAsJSON("navData")
        if (storageNav && leftNavData) {
            leftNavData["leftNavItems"] = storageNav
        }
        return (
            <Bootstrap>
                <LeftSidebarSnippet route={route} leftNavData={leftNavData}/>
                <main className="main-wrapper">
                    <TopBarSnippet route={route} topNavData={topNavData}/>
                    <section className="content-section">
                        <Container type={"fluid"}>
                            <PFLayoutRenderer route={route} appConfig={appConfig} component={component}/>
                        </Container>
                    </section>
                </main>
            </Bootstrap>
        );
    }
}