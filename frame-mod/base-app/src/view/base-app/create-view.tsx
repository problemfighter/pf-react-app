import React from 'react';
import {PFProps} from "@pfo/pf-react/src/artifacts/interface/pf-mixed-interface";
import PFComponentState from "@pfo/pf-react/src/artifacts/component/pf-component-state";
import PFComponent from "@pfo/pf-react/src/artifacts/component/pf-component";
import Card from "@pfo/pf-rui/bootstrap/card/Card";
import CardContent from "@pfo/pf-rui/bootstrap/card/CardContent";
import Row from "@pfo/pf-rui/bootstrap/Row";
import Column from "@pfo/pf-rui/bootstrap/Column";
import Button from "@pfo/pf-rui/bootstrap/Button";
import Toast from "@pfo/pf-rui/bootstrap/Toast";
import TextField from "@pfo/pf-rui/bootstrap/TextField";
import LoadingIndicator from "@pfo/pf-rui/bootstrap/LoadingIndicator";
import {FieldSpecification} from "@pfo/pf-react/src/artifacts/data/pf-input-definition";
import Select from "@pfo/pf-rui/bootstrap/Select";


interface Props extends PFProps {
    route: any;
}

class State extends PFComponentState {
    random?: string
}



export default class CreateView extends PFComponent<Props, State> {

    state: State = new State();
    attributes: { [key: string]: any } = {};


    componentDidMount() {
        // const _this = this;
        // setInterval(() => {
        //     _this.setState({random: "" + (Math.random() * 100000000000)})
        //     console.log(_this.state.random)
        // }, 5000)
    }

    componentDidUpdate(prevProps: Props) {
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

    formSubmit(event: any) {
        event.preventDefault();
        const _this = this;
        try {
            console.log(this.getFormData())
            _this.showSuccessFlash("Hmm thik ase sob data")
        }catch (e: any) {
            _this.showErrorFlash(e.message)
        }

    }


    renderUI() {
        return (
            <React.Fragment>
                <div className="pt-3 pb-2 mb-2 border-bottom">
                    <h4>Create</h4>
                </div>
                <Card>
                    <CardContent>
                        <form >
                            <Row>
                                <TextField {...this.setupFieldAttrs("name")} addWrapperClass={"col-6"}/>
                                <TextField {...this.setupFieldAttrs("title")} addWrapperClass={"col-6"}/>
                                <Select {...this.setupFieldAttrs("type")} addWrapperClass={"col-12"}/>
                                <TextField {...this.setupFieldAttrs("target")} addWrapperClass={"col-6"}/>
                                <TextField {...this.setupFieldAttrs("targetType")} addWrapperClass={"col-6"}/>
                                <TextField {...this.setupFieldAttrs("description")} addWrapperClass={"col-12"}/>
                                <Column span={12}>
                                    <span className={"float-end"}>
                                        <Button type={"submit"} onClick={(event: any) =>{ this.formSubmit(event)}}>Save</Button>
                                        <a href="#" className="btn btn-danger ms-2">Cancel</a>
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