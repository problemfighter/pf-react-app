import React from 'react';
import {PFProps} from "@pfo/pf-react/src/artifacts/interface/pf-mixed-interface";
import PFComponentState from "@pfo/pf-react/src/artifacts/component/pf-component-state";
import PFReactComponent from "@pfo/pf-react/src/artifacts/component/pf-react-component";
import Container from "@pfo/pf-rui/bootstrap/Container";
import Row from "@pfo/pf-rui/bootstrap/Row";
import Column from "@pfo/pf-rui/bootstrap/Column";
import avatar from "./../../assets/img/avatar.png"

interface Props extends PFProps {
    route: any;
}

class State extends PFComponentState {

}

export default class TopBarSnippet extends PFReactComponent<Props, State> {

    state: State = new State();

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps: Props) {
    }


    private leftSide() {
        return (
            <div className="header-left">
                <div className="menu-toggle-btn">
                    <button id="menu-toggle" className="main-btn btn-hover border-0">
                        <i className="bi bi-fullscreen"></i>
                    </button>
                </div>
            </div>
        )
    }

    private profileSection() {
        return (
            <div className="profile-box">
                <button className="dropdown-toggle bg-transparent border-0" type="button" data-bs-toggle="dropdown">
                    <div className="profile-info">
                        <div className="info">
                            <div className="image">
                                <img src={avatar}/>
                            </div>
                        </div>
                    </div>
                    <i className="bi bi-chevron-down"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                        <a href="#">
                            <i className="bi bi-person"></i>View Profile
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="bi bi-gear"></i>Settings
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="bi bi-box-arrow-in-left"></i>Logout
                        </a>
                    </li>
                </ul>
            </div>
        )
    }

    private quickActionMenu() {
        return (
            <div className="profile-box ml-15 d-none d-md-flex">
                <button className="dropdown-toggle w-46" type="button" data-bs-toggle="dropdown">
                    <i className="bi bi-plus-circle"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                        <a href="#">
                            <i className="bi bi-file-earmark-plus"></i> Create Supplier
                        </a>
                    </li>
                </ul>
            </div>
        )
    }

    private rightSide() {
        return (
            <div className="header-right">
                {this.quickActionMenu()}
                {this.profileSection()}
            </div>
        )
    }

    render() {
        const _this = this;
        return (
            <React.Fragment>
               <header className={"header"}>
                   <Container type={"fluid"}>
                       <Row>
                           <Column span={6} spanLarge={5} spanMedium={5}>
                               {_this.leftSide()}
                           </Column>
                           <Column span={6} spanLarge={7} spanMedium={7}>
                               {_this.rightSide()}
                           </Column>
                       </Row>
                   </Container>
               </header>
            </React.Fragment>
        )
    }

}