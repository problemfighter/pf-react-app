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
import Pagination from "../../../../../dev-libs/pf-rui/bootstrap/Pagination";
import ListViewTopActionView from "../snippet/list-view-top-action-view";
import Dropdown from "../../../../../dev-libs/pf-rui/bootstrap/Dropdown";

interface Props extends PFProps {}


class State extends PFComponentState {
    apiData: any;
    list: any = [];
}

const tableHeaderDefinition: Array<DynamicTableHeadColumn> = [
    {displayName: "Name", fieldName: "name", isSortAble: true},
    {displayName: "Title", fieldName: "title", isSortAble: true},
    {displayName: "Type", fieldName: "type"},
    {displayName: "Actions", fieldName: "actions"},
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

    renderUI() {
        const _this = this;
        let list = [
            'View',
            'Edit',
            'Delete',
        ]
        let wrapperPlaceholder = <span className="text-black btn-sm"><i className="bi bi-three-dots-vertical"></i></span>
        return (
            <React.Fragment>
                <section className={"content-section"}>
                    <ListViewTopActionView parentComponent={_this} route={_this.props.route} title={CrudConfig.NAME_CONSTANT.LIST} addButtonURL={CrudUrlMapping.ui.create}/>
                    <Table isHoverEffectInRow={true} variant={"bordered"}>
                        <DynamicTableHead currentSortFieldName={_this.state.orderBy} columns={tableHeaderDefinition} onClickSort={(event, sortDirection, fieldName)=>{_this.tableColumnSortAction(event, sortDirection as SortDirection, fieldName, () => {_this.loadData()})}}/>
                        <TableBody>
                            {_this.state.list.map((row: any, index: any) => (
                                <TableRow key={index}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>
                                        <Dropdown
                                            itemList={list}
                                            wrapperPlaceholder={wrapperPlaceholder}
                                        />
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