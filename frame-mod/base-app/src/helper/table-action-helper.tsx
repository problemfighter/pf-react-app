import React from 'react';
import {PFProps} from "@pfo/pf-react/src/artifacts/interface/pf-mixed-interface";
import PFComponentState from "@pfo/pf-react/src/artifacts/component/pf-component-state";
import PFComponent from "@pfo/pf-react/src/artifacts/component/pf-component";
import {BootstrapIconHelper} from "./icon-helper";
import Dropdown from "@pfo/pf-rui/bootstrap/Dropdown";
import MessageDialogHelper from "./message-dialog-helper";


export class ConfirmationInfo {
    title: string = "Confirm"
    body: any = "Are you sure want to delete?"
    buttonAdditionalData?: any
    okayButtonLabel: string = "Confirm"
    cancelButtonLabel?: string
    okayButtonAction?: (event: any, data?: any) => boolean;
    cancelButtonAction?: (data?: any) => void;
}

export interface TableActionItem {
    label: string;
    onClickAdditionalData?: any
    onClickAction?: (data?: any) => void
    url?: string
    iconClass?: string
    confirmBoxData?: ConfirmationInfo
}

export class TableActionItemHelper {

    public static getDefaultTableActions(viewUrl: string, editUrl: string, deleteAction: any, deleteActionData: any): Array<TableActionItem> {
        let itemList: Array<TableActionItem> = new Array<TableActionItem>()
        itemList.push({label: "View", url: viewUrl, iconClass: BootstrapIconHelper.ViewIcon})
        itemList.push({label: "Edit", url: editUrl, iconClass: BootstrapIconHelper.EditIcon})
        itemList.push(
            {
                label: "Delete",
                iconClass: BootstrapIconHelper.DeleteIcon,
                onClickAction: (data?: any) => {
                    if (deleteAction) {
                        deleteAction(deleteActionData)
                    }
                },
                confirmBoxData: new ConfirmationInfo()
            }
        )
        return itemList
    }

}


interface Props extends PFProps {
    itemList: Array<TableActionItem>
    component: any
}

class State extends PFComponentState {
    isOpenConfirmation: boolean = false
    confirmBoxData: ConfirmationInfo = new ConfirmationInfo()
}

export class TableActionHelper extends PFComponent<Props, State> {

    state: State = new State();

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {}

    componentDidUpdate(prevProps: Props) {}

    private getItemView(item: TableActionItem, key: any) {
        let icon: any
        if (item.iconClass) {
            icon = (
                <React.Fragment>
                    <i className={item.iconClass + " pe-1"}></i>
                </React.Fragment>
            )
        }
        return (
            <React.Fragment>
                {icon} {item.label}
            </React.Fragment>
        )
    }

    private openConfirmation(){
        this.setState({isOpenConfirmation: true})
    }

    private closeConfirmation(){
        this.setState({isOpenConfirmation: false})
    }

    private handleConfirmationAction(tableActionItem: TableActionItem) {
        let confirmBoxData = tableActionItem.confirmBoxData ? tableActionItem.confirmBoxData : new ConfirmationInfo()
        if (tableActionItem.onClickAction) {
            confirmBoxData.okayButtonAction = (event: any, data?: any) => {
                if (tableActionItem.onClickAction) {
                    tableActionItem?.onClickAction(data)
                }
                return false
            }
        }
        this.setState({
            confirmBoxData: confirmBoxData
        })
        this.openConfirmation()
    }

    private handleUrlAction(tableActionItem: TableActionItem) {
        if (this.props.component && tableActionItem && tableActionItem.url && tableActionItem.url !== "") {
            this.props.component.redirect(tableActionItem.url)
        }
    }

    private handleOnClickAction(tableActionItem: TableActionItem) {
        if (tableActionItem && tableActionItem.onClickAction){
            tableActionItem?.onClickAction(tableActionItem.onClickAdditionalData)
        }
    }

    private handleOnClickItem(clickedItem: TableActionItem, index: any, itemList: Array<TableActionItem>) {
        if (clickedItem.confirmBoxData) {
            this.handleConfirmationAction(clickedItem)
        } else if (clickedItem.url) {
            this.handleUrlAction(clickedItem)
        } else if (clickedItem.onClickAction) {
            this.handleOnClickAction(clickedItem)
        }
    }

    renderUI() {
        const _this = this
        const {title, body, okayButtonAction, buttonAdditionalData, okayButtonLabel} = _this.state.confirmBoxData
        let wrapperPlaceholder = <span className="text-black btn-sm"><i className="bi bi-three-dots-vertical"></i></span>
        return (
            <React.Fragment>
                {_this.state.isOpenConfirmation ? <MessageDialogHelper okayButtonLabel={okayButtonLabel} title={title} body={body} cancelButtonAction={(data: any) => _this.closeConfirmation()} okayButtonAction={okayButtonAction} buttonAdditionalData={buttonAdditionalData}/> : ""}
                <Dropdown
                    itemOnClick={(clickedItem: TableActionItem, index: any, itemList: Array<TableActionItem>) => _this.handleOnClickItem(clickedItem, index, itemList)}
                    itemList={this.props.itemList}
                    wrapperPlaceholder={wrapperPlaceholder}
                    itemLoopCallBack={(item: any, key: any)=> _this.getItemView(item, key)}
                />
            </React.Fragment>
        )
    }

}