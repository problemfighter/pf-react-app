import {PFProps} from "@pfo/pf-react/src/artifacts/interface/pf-mixed-interface";
import PFComponentState from "@pfo/pf-react/src/artifacts/component/pf-component-state";
import PFComponent from "@pfo/pf-react/src/artifacts/component/pf-component";
import CrudUrlMapping from "./crud-url-mapping";
import CrudConfig from "./crud-config";
import React from "react";
import {ApiUtil} from "../../system/api-util";
import PFHTTResponse from "@pfo/pf-react/src/artifacts/processor/http/pf-http-response";
import {AppConstant} from "../../system/app-constant";
import Card from "@pfo/pf-rui/bootstrap/card/Card";
import CardContent from "@pfo/pf-rui/bootstrap/card/CardContent";
import Row from "@pfo/pf-rui/bootstrap/Row";
import TextField from "@pfo/pf-rui/bootstrap/TextField";
import Select from "@pfo/pf-rui/bootstrap/Select";
import Column from "@pfo/pf-rui/bootstrap/Column";
import Button from "@pfo/pf-rui/bootstrap/Button";
import {PFUtil} from "@pfo/pf-react/src/artifacts/utils/pf-util";
import {FieldSpecification} from "@pfo/pf-react/src/artifacts/data/pf-input-definition";


interface Props extends PFProps {}

class State extends PFComponentState{
    isEdit: boolean = false;
    submitUrl: string = CrudUrlMapping.API.CREATE;
    formHeading: string = CrudConfig.NAME_CONSTANT.CREATE;
    buttonLabel: string = CrudConfig.NAME_CONSTANT.SAVE_BUTTON;
}

export default class CrudCreateEditView extends PFComponent<Props, State> {

    state: State = new State();

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        this.showRedirectMessage();
        let id = ApiUtil.getParamsDataFromRouter(this.props.route, "id");
        if (id){
            this.setState({
                isEdit: true,
                formHeading: CrudConfig.NAME_CONSTANT.UPDATE,
                buttonLabel: CrudConfig.NAME_CONSTANT.UPDATE_BUTTON,
            });
            this.state.submitUrl = CrudUrlMapping.API.UPDATE;
            this.loadFormData(id);
        }
    }

    componentDidUpdate(prevProps: Props) {}

    loadFormData(id: any) {
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

    submitFormData(event: any) {
        event.preventDefault();
        const _this = this;
        try {
            _this.httpRequest.postJson(_this.state.submitUrl, _this.getFormData(),
                {
                    callback(response: PFHTTResponse): void {
                        let apiResponse = ApiUtil.getFormRequestValidResponseOrNone(response, _this);
                        if (apiResponse && apiResponse.status === AppConstant.STATUS_SUCCESS) {
                            _this.successRedirect(CrudUrlMapping.ui.list, apiResponse.message);
                        }
                    }
                },
                {
                    callback(response: PFHTTResponse): void {
                        ApiUtil.inspectResponseAndShowValidationError(response, _this);
                    }
                }
            );
        } catch (e: any) {
            _this.showErrorFlash(e.message)
        }
    }

    fieldDefinition(field: FieldSpecification) {
        const type = [
            {value: 'Slider', label: 'Slider'},
            {value: 'Thumb', label: 'Thumb'},
            {value: 'TextOnly', label: 'TextOnly'},
        ]

        field.text({name: "name", label: "Name", required: true})
        field.text({name: "title", label: "Title", required: true})
        field.select({name: "type", label: "Type", required: true, options: type, optionValue: "value", optionLabel: "label"})
        field.text({name: "target", label: "Target"})
        field.text({name: "targetType", label: "Target Type"})
        field.textArea({name: "description", label: "Description"})
    }


    renderUI() {
        const _this = this;
        return (
            <React.Fragment>
                <div className="pt-3 pb-2 mb-2 border-bottom">
                    <h4>{this.state.formHeading}</h4>
                </div>
                <Card>
                    <CardContent>
                        <form>
                            <Row>
                                <TextField {...this.setupFieldAttrs("name")} addWrapperClass={"col-6"}/>
                                <TextField {...this.setupFieldAttrs("title")} addWrapperClass={"col-6"}/>
                                <Select {...this.setupFieldAttrs("type")} addWrapperClass={"col-12"}/>
                                <TextField {...this.setupFieldAttrs("target")} addWrapperClass={"col-6"}/>
                                <TextField {...this.setupFieldAttrs("targetType")} addWrapperClass={"col-6"}/>
                                <TextField {...this.setupFieldAttrs("description")} addWrapperClass={"col-12"}/>
                                <Column span={12}>
                                    <span className={"float-end"}>
                                        <Button type={"submit"} onClick={(event: any) =>{ this.submitFormData(event)}}>{this.state.buttonLabel}</Button>
                                        <Button variant={"danger"} className="ms-2" onClick={(event:any) => {PFUtil.gotoUrl(_this, CrudUrlMapping.ui.list)}}>{CrudConfig.NAME_CONSTANT.CANCEL_BUTTON}</Button>
                                    </span>
                                </Column>
                            </Row>
                        </form>
                    </CardContent>
                </Card>
            </React.Fragment>
        )
    }

}