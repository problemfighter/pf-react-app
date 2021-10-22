import PFReactComponent from "@pfo/pf-react/src/artifacts/component/pf-react-component";
import React from "react";
import PFLayoutRenderer from "@pfo/pf-react/src/artifacts/component/pf-layout-rander";
import Bootstrap from "@pfo/pf-rui/bootstrap/Bootstrap";
import LeftSidebarSnippet from "../snippet/left-sidebar-snippet";
import "./../../assets/css/style.css"
import "./../../assets/css/common.css"
import "./../../assets/libs/js/bootstrap.bundle.min"
import TopBarSnippet from "../snippet/top-bar-snippet";
import Container from "@pfo/pf-rui/bootstrap/Container";

export default class PrivateLayout extends PFReactComponent<any, any> {

    render() {
        const {component, route, appConfig} = this.props;
        return (
            <Bootstrap>
                <LeftSidebarSnippet route={route}/>
                <main className="main-wrapper">
                    <TopBarSnippet route={route}/>
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