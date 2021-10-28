import PFComponentState from "@pfo/pf-react/src/artifacts/component/pf-component-state";
import PFReactComponent from "@pfo/pf-react/src/artifacts/component/pf-react-component";
import {PFState} from "@pfo/pf-react/src/artifacts/interface/pf-mixed-interface";
import React from "react";
import Toast from "@pfo/pf-rui/bootstrap/Toast";
import LoadingIndicator from "@pfo/pf-rui/bootstrap/LoadingIndicator";

interface Props {
    componentState: PFComponentState;
    component: any;
}

export default class AppBeforeRenderView extends PFReactComponent<Props, PFState> {

    private getToast() {
        const _this = this;
        const messageData = _this.props.componentState.messageData
        return (
            <Toast
                messageType={messageData.status}
                message={messageData.message}
                onClose={
                    () => {
                        _this.props.component.closeFlashMessage()
                    }
                }
            />
        )
    }

    private getLoadingIndicator() {
        const _this = this;
        const isShowLoader = _this.props.componentState.isShowLoader
        return (isShowLoader ? <LoadingIndicator/> : "")
    }

    render() {
        const props = this.props;
        const parentComponentStateState = props.componentState
        const {isShowFlashMessage} = parentComponentStateState
        return (
            <React.Fragment>
                {isShowFlashMessage ? this.getToast() : ""}
                {this.getLoadingIndicator()}
            </React.Fragment>
        )
    }

}