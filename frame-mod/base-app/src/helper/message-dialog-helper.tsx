import React from 'react';
import {PFProps} from "@pfo/pf-react/src/artifacts/interface/pf-mixed-interface";
import PFComponentState from "@pfo/pf-react/src/artifacts/component/pf-component-state";
import PFComponent from "@pfo/pf-react/src/artifacts/component/pf-component";
import Dialog from "@pfo/pf-rui/bootstrap/dialog/Dialog";
import DialogContent from "@pfo/pf-rui/bootstrap/dialog/DialogContent";
import DialogFooter from "@pfo/pf-rui/bootstrap/dialog/DialogFooter";
import Button from "../../../../dev-libs/pf-rui/bootstrap/Button";


interface Props extends PFProps {
    title: string
    body: any
    buttonAdditionalData?: any
    okayButtonLabel?: string
    cancelButtonLabel?: string
    okayButtonAction?: (event: any, data?:any) => boolean;
    cancelButtonAction?: (data?:any) => void;
}

class State extends PFComponentState {
    isShowDialog: boolean = true
}

export default class MessageDialogHelper extends PFComponent<Props, State> {

    state: State = new State();

    static defaultProps = {
        okayButtonLabel: "Okay",
        cancelButtonLabel: "Cancel",
    }

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {}

    componentDidUpdate(prevProps: Props) {}

    private okayButtonAction(event: any) {
        let isOpen: boolean = false
        if (this.props.okayButtonAction) {
            isOpen = this.props.okayButtonAction(event, this.props.buttonAdditionalData)
        }
        if (!isOpen) {
            this.cancelButtonAction()
        }
    }

    private cancelButtonAction() {
        this.setState({isShowDialog: false})
        if (this.props.cancelButtonAction){
            this.props.cancelButtonAction(this.props.buttonAdditionalData)
        }
    }

    renderUI() {
        const _this = this
        const {title, body, okayButtonLabel, cancelButtonLabel} = this.props
        return (
            <React.Fragment>
                {!_this.state.isShowDialog ? "" : (
                    <Dialog title={title} onClose={() => {_this.cancelButtonAction()}}>
                        <DialogContent>
                            {body}
                        </DialogContent>
                        <DialogFooter>
                            <Button onClick={(event: any) => {_this.okayButtonAction(event)}} viewSize={"small"} variant={"primary"}>{okayButtonLabel}</Button>
                            <Button onClick={(event: any) => {_this.cancelButtonAction()}} viewSize={"small"} variant={"danger"}>{cancelButtonLabel}</Button>
                        </DialogFooter>
                    </Dialog>
                )}
            </React.Fragment>
        )
    }

}