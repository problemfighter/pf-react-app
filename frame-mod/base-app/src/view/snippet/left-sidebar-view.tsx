import React from 'react';
import {PFProps} from "@pfo/pf-react/src/artifacts/interface/pf-mixed-interface";
import PFComponentState from "@pfo/pf-react/src/artifacts/component/pf-component-state";
import PFReactComponent from "@pfo/pf-react/src/artifacts/component/pf-react-component";
import sidebarLogo from "./../../assets/img/logo/sidebar-logo.png"

interface Props extends PFProps {
    route: any;
}

class State extends PFComponentState {

}

export default class LeftSidebarView extends PFReactComponent<Props, State> {

    state: State = new State();

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps: Props) {
    }

    render() {
        return (
            <React.Fragment>
                <aside className="sidebar-nav-wrapper">
                    <div className="navbar-logo">
                        <a href="#">
                            <img src={sidebarLogo} alt="sidebar-logo"/>
                        </a>
                    </div>

                    <nav className="sidebar-nav">
                        <ul>
                            <li className="nav-item">
                                <a href="#" className="active">
                                    <i className="icon bi bi-columns-gap"></i>
                                    <span className="text">Dashboard</span>
                                </a>
                            </li>

                            <li className="nav-item  nav-item-has-children">
                                <a href="#" data-bs-toggle="collapse" data-bs-target="#ddmenu_1" >
                                    <i className="icon bi bi-file-earmark"></i>
                                    <span className="text">Pages</span>
                                </a>
                                <ul id="ddmenu_1" className="collapse show dropdown-nav">
                                    <li>
                                        <a href="#" className="active">
                                            <i className="bi bi-file-earmark-medical"></i>
                                            <span className="text">Sub Page</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </aside>
            </React.Fragment>
        )
    }

}