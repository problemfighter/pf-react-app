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


interface Props extends PFProps {
    route: any;
}

class State extends PFComponentState {

}


interface ExampleArguments {
    scope?: boolean;
    location?: string;
    project?: number;
}

export default class CreateView extends PFComponent<Props, State> {

    state: State = new State();
    attributes: { [key: string]: any } = {};

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps: Props) {
    }

    field(exampleArguments: ExampleArguments) {
        return exampleArguments
    }

    // fieldDefinition() {
    //     console.log("Create View")
    // }


    renderUI() {
        return (
            <React.Fragment>
                <div className="pt-3 pb-2 mb-2 border-bottom">
                    <h4>Create</h4>
                </div>
                <Card>
                    <Toast messageType={"success"} message={"Bismillah Message"} />
                    <LoadingIndicator/>
                    <CardContent>
                        <form >
                            <Row>
                                <TextField name={this.attributes.name} label={"First Name"} required={true} addWrapperClass={"col-6"}/>
                                <TextField name={"lastName"} label={"Last Name"} addWrapperClass={"col-6"}/>
                                <TextField name={"email"} label={"Email"} type={"email"} required={true} addWrapperClass={"col-6"}/>
                                <TextField name={"password"} label={"Password"} type={"password"} required={true} addWrapperClass={"col-6"}/>
                                <Column span={12}>
                                    <span className={"float-end"}>
                                        <Button type={"submit"}>Save</Button>
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