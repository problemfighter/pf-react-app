import {PFProps} from "@pfo/pf-react/src/artifacts/interface/pf-mixed-interface";
import PFComponentState from "@pfo/pf-react/src/artifacts/component/pf-component-state";
import PFComponent from "@pfo/pf-react/src/artifacts/component/pf-component";
import React from "react";
import CrudConfig from "./crud-config";
import CrudUrlMapping from "./crud-url-mapping";
import PFHTTResponse from "@pfo/pf-react/src/artifacts/processor/http/pf-http-response";
import {ApiUtil} from "../../system/api-util";
import {AppConstant} from "../../system/app-constant";
import Card from "@pfo/pf-rui/bootstrap/card/Card";
import CardContent from "@pfo/pf-rui/bootstrap/card/CardContent";
import Row from "@pfo/pf-rui/bootstrap/Row";
import TextField from "@pfo/pf-rui/bootstrap/TextField";
import Select from "@pfo/pf-rui/bootstrap/Select";
import Column from "@pfo/pf-rui/bootstrap/Column";
import Button from "@pfo/pf-rui/bootstrap/Button";
import {PFUtil} from "@pfo/pf-react/src/artifacts/utils/pf-util";
import DetailsViewHelper, {DetailsViewDefinition} from "../../helper/details-view-helper";


interface Props extends PFProps {}

class State extends PFComponentState {
    id: any
}

export default class CrudDetailsView extends PFComponent<Props, State> {

    state: State = new State();

    static defaultProps = {}

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        let id = ApiUtil.getParamsDataFromRouter(this.props.route, "id");
        if (id) {
            this.state.id = id
            this.loadDetailsData(id);
        } else {
            this.failedRedirect(CrudUrlMapping.ui.list, CrudConfig.NAME_CONSTANT.INVALID_DATA);
        }
    }

    componentDidUpdate(prevProps: Props) {
    }

    loadDetailsData(id: any) {
        const _this = this;
        let message = CrudConfig.NAME_CONSTANT.INVALID_DATA;
        this.httpRequest.getRequest(CrudUrlMapping.API.DETAILS + id,
            {
                callback(response: PFHTTResponse): void {
                    let apiResponse = ApiUtil.getValidResponseOrNone(response, _this);
                    if (apiResponse && apiResponse.status === AppConstant.STATUS_SUCCESS && !ApiUtil.isEmptyObject(apiResponse.data)) {
                        _this.setFormData(apiResponse.data)
                    } else {
                        _this.failedRedirect(CrudUrlMapping.ui.list, message);
                    }
                }
            },
            {
                callback(response: PFHTTResponse): void {
                    _this.failedRedirect(CrudUrlMapping.ui.list, message);
                }
            }
        );
    }

    renderUI() {
        let definition: Array<DetailsViewDefinition> = [
            {name: "name", displayName: "Name"},
            {name: "title", displayName: "Title"},
            {name: "type", displayName: "Type"}
        ]
        const _this = this
        return (
            <React.Fragment>
                <div className="pt-3 pb-2 mb-2 border-bottom">
                    <h4>{CrudConfig.NAME_CONSTANT.DETAILS}</h4>
                </div>
                <Card>
                    <CardContent>
                        <Row>
                            <DetailsViewHelper definitions={definition} detailsData={this.state.formData}/>
                            <Column span={12} className={"mt-4"}>
                                <span className={"float-end"}>
                                    <Button className="ms-2" onClick={(event:any) => {PFUtil.gotoUrl(_this, CrudUrlMapping.ui.update + "/" + _this.state.id)}}>{CrudConfig.NAME_CONSTANT.EDIT_BUTTON}</Button>
                                    <Button variant={"danger"} className="ms-2" onClick={(event:any) => {PFUtil.gotoUrl(_this, CrudUrlMapping.ui.list)}}>{CrudConfig.NAME_CONSTANT.CLOSE_BUTTON}</Button>
                                </span>
                            </Column>
                        </Row>
                    </CardContent>
                </Card>
            </React.Fragment>
        )
    }
}