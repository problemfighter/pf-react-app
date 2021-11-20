import React from 'react';
import {PFProps} from "@pfo/pf-react/src/artifacts/interface/pf-mixed-interface";
import PFComponentState from "@pfo/pf-react/src/artifacts/component/pf-component-state";
import PFReactComponent from "@pfo/pf-react/src/artifacts/component/pf-react-component";
import Container from "@pfo/pf-rui/bootstrap/Container";
import Row from "@pfo/pf-rui/bootstrap/Row";
import Column from "@pfo/pf-rui/bootstrap/Column";
import {TopNavData} from "../../data/top-nav-data";

interface Props extends PFProps {
    topNavData?: TopNavData
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
                    <button id="menu-toggle" className="header-left-btn">
                        <i className="bi bi-fullscreen"></i>
                    </button>
                </div>
            </div>
        )
    }

    onClickLogout(event: any) {
        if (this.props.topNavData?.logoutAction) {
            this.props.topNavData?.logoutAction(event)
        }
    }

    getNavIcon(item: any) {
        if (item.iconClass) {
            return <i className={"icon " + item.iconClass}></i>
        }
        return ""
    }

    getNavItems(navItems?: Array<any>) {
        const _this = this
        return (
            <React.Fragment>
                {navItems?.map((item: any, index: any) => (
                        <li key={index}>
                            <a href={item.url}>
                                {_this.getNavIcon(item)}
                                {item.displayName}
                            </a>
                        </li>
                    )
                )}
            </React.Fragment>
        )
    }

    private profileSection() {
        return (
            <div className="profile-box ml-15">
                <button className="dropdown-toggle bg-transparent border-0 header-right-dropdown-btn" type="button" data-bs-toggle="dropdown">
                    <div className="profile-info">
                        <div className="info">
                            <div className="image">
                                <img src={this.props.topNavData?.avatar}/>
                            </div>
                        </div>
                    </div>
                    <i className="bi bi-chevron-down"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                    {this.getNavItems(this.props.topNavData?.operatorNavItemList)}
                    <li onClick={(event: any) => {this.onClickLogout(event)}}>
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
            <div className="create-feature-box d-none d-md-flex">
                <button className="dropdown-toggle header-right-dropdown-btn" type="button" data-bs-toggle="dropdown">
                    <i className="bi bi-list-task"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                    {this.getNavItems(this.props.topNavData?.quickActionItemList)}
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