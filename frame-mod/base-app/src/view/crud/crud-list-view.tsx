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
import Table from "../../../../../dev-libs/pf-rui/bootstrap/table/Table";
import TableBody from "../../../../../dev-libs/pf-rui/bootstrap/table/TableBody";
import TableRow from "@pfo/pf-rui/bootstrap/table/TableRow";
import TableCell from "../../../../../dev-libs/pf-rui/bootstrap/table/TableCell";
import {DynamicTableHeadColumn} from "@pfo/pf-rui/spec/table/DynamicTableHeadSpec";
import DynamicTableHead from "../../../../../dev-libs/pf-rui/bootstrap/table/DynamicTableHead";
import {SortDirection} from "@pfo/pf-react/src/artifacts//data/pf-mixed-data";

interface Props extends PFProps {}


class State extends PFComponentState {
    apiData: any;
    list: any = [];
}

const tableHeaderDefinition: Array<DynamicTableHeadColumn> = [
    {displayName: "Name", fieldName: "name", isSortAble: true},
    {displayName: "Title", fieldName: "title", isSortAble: true},
    {displayName: "Type", fieldName: "type"},
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

    componentDidUpdate(prevProps: Props) {
    }

    loadData(dataParams: PFLoadDataPrams = new PFLoadDataPrams()) {
        const _this = this;
        let commonConditions = ApiUtil.getSearchSortAndPaginationData(this, dataParams);
        this.httpRequest.getByParams(CrudUrlMapping.API.LIST, commonConditions,
            {
                callback(response: PFHTTResponse): void {
                    let apiResponse = ApiUtil.getValidResponseOrNone(response, _this);
                    let list = [];
                    if (apiResponse && apiResponse.data) {
                        list = apiResponse.data;
                    }
                    let totalItem = 0;
                    if (apiResponse && apiResponse.pagination && apiResponse.pagination.total) {
                        totalItem = apiResponse.pagination.total;
                    }
                    _this.setState({
                        list: list,
                        totalItem: totalItem,
                        apiData: apiResponse
                    });
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

    renderUI() {
        const _this = this;
        return (
            <React.Fragment>
                <Table isHoverEffectInRow={true}>
                    <DynamicTableHead columns={tableHeaderDefinition} onClickSort={(event, sortDirection, fieldName)=>{_this.tableColumnSortAction(event, sortDirection as SortDirection, fieldName, () => {_this.loadData()})}}/>
                    <TableBody>
                        {_this.state.list.map((row: any, index: any) => (
                            <TableRow key={index}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>{row.type}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </React.Fragment>
        )
    }

}