import {PFProps} from "@pfo/pf-react/src/artifacts/interface/pf-mixed-interface";
import PFComponentState from "@pfo/pf-react/src/artifacts/component/pf-component-state";
import PFComponent from "@pfo/pf-react/src/artifacts/component/pf-component";
import React from "react";
import {ApiUtil} from "../../system/api-util";
import PFHTTResponse from "@pfo/pf-react/src/artifacts/processor/http/pf-http-response";
import CrudUrlMapping from "./crud-url-mapping";
import PFLoadDataPrams from "@pfo/pf-react/src/artifacts/data/pf-load-data-prams";
import {AppConstant} from "../../system/app-constant";
import CrudConfig from "./crud-config";
import TableRow from "@pfo/pf-rui/bootstrap/table/TableRow";
import {DynamicTableHeadColumn} from "@pfo/pf-rui/spec/table/DynamicTableHeadSpec";
import {SortDirection} from "@pfo/pf-react/src/artifacts//data/pf-mixed-data";
import ListViewTopActionHelper from "../../helper/list-view-top-action-helper";
import {TableActionHelper, TableActionItemHelper} from "../../helper/table-action-helper";
import Table from "@pfo/pf-rui/bootstrap/table/Table";
import DynamicTableHead from "@pfo/pf-rui/bootstrap/table/DynamicTableHead";
import TableBody from "@pfo/pf-rui/bootstrap/table/TableBody";
import TableCell from "@pfo/pf-rui/bootstrap/table/TableCell";
import Pagination from "@pfo/pf-rui/bootstrap/Pagination";

interface Props extends PFProps {}


class State extends PFComponentState {
    apiData: any;
    list: any = [];
}

const tableHeaderDefinition: Array<DynamicTableHeadColumn> = [
    {displayName: "Name", fieldName: "name", isSortAble: true},
    {displayName: "Title", fieldName: "title", isSortAble: true},
    {displayName: "Type", fieldName: "type"},
    {displayName: "Actions", fieldName: "actions", isActionColumn: true},
]

export default class CrudListView extends PFComponent<Props, State> {

    state: State = new State();

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        this.showRedirectMessage();
        this.loadData();
    }

    componentDidUpdate(prevProps: Props) {}

    loadData(dataParams: PFLoadDataPrams = new PFLoadDataPrams()) {
        const _this = this;
        let commonConditions = ApiUtil.getSearchSortAndPaginationData(this, dataParams);
        this.httpRequest.getByParams(CrudUrlMapping.API.LIST, commonConditions,
            {
                callback(response: PFHTTResponse): void {
                    let apiResponse = ApiUtil.getValidResponseOrNone(response, _this);
                    ApiUtil.initListViewData(apiResponse, _this)
                }
            },
            {
                callback(response: PFHTTResponse): void {
                    ApiUtil.inspectResponseAndShowValidationError(response, _this);
                }
            }
        );
    }

    delete(id: any) {
        let _this = this;
        this.httpRequest.delete(CrudUrlMapping.API.DELETE + id,
            {
                callback(response: PFHTTResponse): void {
                    let apiResponse = ApiUtil.getValidResponseOrNone(response, _this);
                    if (apiResponse && apiResponse.status === AppConstant.STATUS_SUCCESS) {
                        _this.showSuccessFlash(CrudConfig.NAME_CONSTANT.DELETE_SUCCESS_MESSAGE);
                        _this.loadData();
                    }
                }
            },
            {
                callback(response: PFHTTResponse): void {
                    ApiUtil.inspectResponseAndShowValidationError(response, _this);
                }
            }
        );
    }

    private getTableActions(row: any, index: any) {
        const _this = this
        let id = row.id
        let itemList = TableActionItemHelper.getDefaultTableActions(
            CrudUrlMapping.ui.details + "/" + id,
            CrudUrlMapping.ui.update + "/" + id,
            (data: any) => {
                this.delete(id)
            },
            id
        )
        return itemList
    }

    renderUI() {
        const _this = this;
        return (
            <React.Fragment>
                <section className={"content-section"}>
                    <ListViewTopActionHelper parentComponent={_this} route={_this.props.route} title={CrudConfig.NAME_CONSTANT.LIST} addButtonURL={CrudUrlMapping.ui.create}/>
                    <Table isHoverEffectInRow={true} variant={"bordered"}>
                        <DynamicTableHead currentSortFieldName={_this.state.orderBy} columns={tableHeaderDefinition} onClickSort={(event, sortDirection, fieldName)=>{_this.tableColumnSortAction(event, sortDirection as SortDirection, fieldName, () => {_this.loadData()})}}/>
                        <TableBody>
                            {_this.state.list.map((row: any, index: any) => (
                                <TableRow key={index}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell className={"text-center"}>
                                        <TableActionHelper itemList={_this.getTableActions(row, index)} component={_this}/>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Pagination {...ApiUtil.managePaginationAttributes(_this)}/>
                </section>
            </React.Fragment>
        )
    }

}