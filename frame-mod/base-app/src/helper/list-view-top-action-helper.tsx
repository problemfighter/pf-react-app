import React from 'react';
import {PFProps} from "@pfo/pf-react/src/artifacts/interface/pf-mixed-interface";
import PFComponentState from "@pfo/pf-react/src/artifacts/component/pf-component-state";
import Button from "@pfo/pf-rui/bootstrap/Button";
import {PFUtil} from "@pfo/pf-react/src/artifacts/utils/pf-util";
import PFLoadDataPrams from "@pfo/pf-react/src/artifacts/data/pf-load-data-prams";
import PFComponent from "@pfo/pf-react/src/artifacts/component/pf-component";
import Input from "@pfo/pf-rui/bootstrap/Input";


interface Props extends PFProps {
    title: string
    parentComponent: any;
    onSearchSubmit?: (event: any) => void;
    addButtonURL?: string;
    reloadButtonCallBack?: (event: any) => void;
    addOtherActions?: any
}

class State extends PFComponentState {

}

export default class ListViewTopActionHelper extends PFComponent<Props, State> {

    state: State = new State();

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {}

    componentDidUpdate(prevProps: Props) {
    }

    private submitSearchFormData(event: any) {
        event.preventDefault()
        const _this = this
        if (this.props.onSearchSubmit) {
            this.props.onSearchSubmit(event)
        } else if (this.props.parentComponent.loadData) {
            this.props.parentComponent.loadData()
        }
    }

    private handleSearchOnChange(event: any) {
        this.props.parentComponent.setState({search: event.target.value})
    }

    private getAddButton() {
        const {addButtonURL} = this.props
        if (!addButtonURL) {
            return ""
        }
        return (
            <Button title={"Create"} onClick={(event: any) => {
                PFUtil.gotoUrl(this, addButtonURL)
            }}>
                <i className="bi bi-file-earmark-plus"></i>
            </Button>
        )
    }


    private reloadButtonOnClick(event: any) {
        if (this.props.reloadButtonCallBack) {
            this.props.reloadButtonCallBack(event)
        } else if (this.props.parentComponent.loadData) {
            this.props.parentComponent.loadData(new PFLoadDataPrams().resetQuery())
        }
        this.setState({search: undefined})
    }

    private getReloadButton() {
        let reloadButton = (
            <Button variant={"danger"} title={"Reload"} type={"reset"} onClick={(event: any) => {
                this.reloadButtonOnClick(event)
            }}>
                <i className="bi bi-arrow-clockwise"></i>
            </Button>
        )

        let isShowReloadButton = false
        if (this.props.reloadButtonCallBack) {
            isShowReloadButton = true
        } else if (this.props.parentComponent.loadData) {
            isShowReloadButton = true
        }

        return isShowReloadButton ? reloadButton : ""
    }

    private getItemTotalCount() {
        let count = this.props.parentComponent.state.totalItem
        if (count) {
            return "(" + count + ")"
        }
        return ""
    }

    renderUI() {
        const {title, addOtherActions} = this.props
        return (
            <React.Fragment>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center border-bottom mt-3">
                    <h4 className={"section-title"}>{title} {this.getItemTotalCount()}</h4>
                    <div className="mb-2 d-flex sm-d-block">
                        <form onSubmit={(event: any) => {this.submitSearchFormData(event)}}>
                            <div className="input-group">
                                <Input type="text" placeholder="Search" onChange={(event: any) => {this.handleSearchOnChange(event)}}/>
                                <Button variant={"secondary"} title={"Search"} type={"submit"}><i className="bi bi-search"></i></Button>
                                {this.getAddButton()}
                                {this.getReloadButton()}
                            </div>
                        </form>
                        {addOtherActions}
                    </div>
                </div>
            </React.Fragment>
        )
    }

}