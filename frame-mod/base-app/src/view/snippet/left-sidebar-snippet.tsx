import React from 'react';
import {PFProps} from "@pfo/pf-react/src/artifacts/interface/pf-mixed-interface";
import PFComponentState from "@pfo/pf-react/src/artifacts/component/pf-component-state";
import PFReactComponent from "@pfo/pf-react/src/artifacts/component/pf-react-component";
import {LeftNavData, LeftNavItem} from "../../data/left-nav-data";
import {PFUtil} from "@pfo/pf-react/src/artifacts/utils/pf-util";

interface Props extends PFProps {
    leftNavData?: LeftNavData
}

class State extends PFComponentState {

}

export default class LeftSidebarSnippet extends PFReactComponent<Props, State> {

    state: State = new State();

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps: Props) {
    }


    getNavIcon(item: LeftNavItem) {
        if (item.iconClass) {
            return <i className={"icon " + item.iconClass}></i>
        }
        return ""
    }

    getNestedItem(item: LeftNavItem, ulAttrs = {}, index: any) {
        if (item.nested) {
            return this.getNavItems(item.nested, ulAttrs, index)
        }
        return ""
    }


    goToOtherPage(event: any, url: string) {
        event.preventDefault();
        PFUtil.gotoUrl(this, url);
    }

    getItem(item: LeftNavItem, index: any) {
        let randomId = "nest-" + (Math.random() + 1).toString(36).substring(7);
        let hrefAttrs = {}
        let ulAttrs = {}
        let liAttrs = {"className": "nav-item"}


        if (item.nested) {
            hrefAttrs = {"data-bs-toggle": "collapse", "data-bs-target": "#" +randomId, "className": "collapsed"}
            ulAttrs = {"id": randomId, "className": "collapse dropdown-nav"}
            liAttrs = {"className": "nav-item nav-item-has-children"}
        }
        return (
            <li {...liAttrs} key={index}>
                <a href="#" onClick={(event: any) => {this.goToOtherPage(event, item.url)}} {...hrefAttrs}>
                    {this.getNavIcon(item)}
                    <span className="text">{item.displayName}</span>
                </a>
                {this.getNestedItem(item, ulAttrs, index)}
            </li>
        )
    }

    getNavItems(navItems?: Array<LeftNavItem>, attrs = {}, tIndex = "0") {
        const _this = this
        return (
            <React.Fragment>
                <ul {...attrs}>
                    {navItems?.map((item: LeftNavItem, index: any) =>
                        _this.getItem(item, tIndex + "-" + index)
                    )}
                </ul>
            </React.Fragment>
        )
    }

    getNavBar() {
        const {leftNavData} = this.props
        if (!leftNavData?.leftNavItems) {
            return ""
        }
        return this.getNavItems(leftNavData.leftNavItems)
    }

    render() {
        const {leftNavData} = this.props
        return (
            <React.Fragment>
                <aside className="sidebar-nav-wrapper">
                    <div className="navbar-logo">
                        <a href="#">
                            <img className={"logo"} src={leftNavData?.leftLogo} alt="sidebar-logo"/>
                        </a>
                    </div>

                    <nav className="sidebar-nav">
                        {this.getNavBar()}
                    </nav>
                </aside>
            </React.Fragment>
        )
    }

}