import React from 'react';
import {PFProps} from "@pfo/pf-react/src/artifacts/interface/pf-mixed-interface";
import PFComponentState from "@pfo/pf-react/src/artifacts/component/pf-component-state";
import PFComponent from "@pfo/pf-react/src/artifacts/component/pf-component";
import loginLogo from './../../assets/img/logo/login-logo.jpg'
import './../../assets/css/login.css'
import Card from "@pfo/pf-rui/bootstrap/card/Card";
import Container from "@pfo/pf-rui/bootstrap/Container";
import CardContent from "@pfo/pf-rui/bootstrap/card/CardContent";
import Row from "@pfo/pf-rui/bootstrap/Row";
import Column from "@pfo/pf-rui/bootstrap/Column";
import TextField from "@pfo/pf-rui/bootstrap/TextField";
import Button from "@pfo/pf-rui/bootstrap/Button";
import {FieldSpecification} from "@pfo/pf-react/src/artifacts/data/pf-input-definition";

interface Props extends PFProps {
    logo?: any
    title?: String
    formSubmit?: (event: any, data: any, parentComponent: any) => void;
}

class State extends PFComponentState {

}

export default class LoginView extends PFComponent<Props, State> {

    state: State = new State();

    static defaultProps = {
        logo: loginLogo,
        title: "Problem Fighter"
    }

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        this.showRedirectMessage();
    }

    componentDidUpdate(prevProps: Props) {
    }

    fieldDefinition(field: FieldSpecification) {
        field.email({name: "identifier", label: "Email", required: true, placeholder:"Enter your email", errorText: "Please enter email address"})
        field.password({name: "password", label: "Password", required: true, placeholder: "Enter your password", errorText: "Please enter password"})
    }

    formSubmit(event: any) {
        event.preventDefault();
        const _this = this;
        try {
            let data = _this.getFormData()
            if (_this.props.formSubmit) {
                _this.props.formSubmit(event, data, _this)
            }
        } catch (e: any) {
            _this.showErrorFlash(e.message)
        }
    }

    renderUI() {
        const {logo, title} = this.props
        return (
            <React.Fragment>
                <main className="login-view-wrapper">
                    <div className="h-100 d-flex align-items-center justify-content-center">
                        <Container className="form-window-middle d-flex align-items-center justify-content-center">
                            <Card>
                                <CardContent>
                                    <div className="company-logo p-2">
                                        <img src={logo} className="rounded-circle mx-auto d-block" width="132" height="132"/>
                                    </div>
                                    <div className="text-center mb-3">
                                        <h3>{title}</h3>
                                    </div>
                                    <div className="login-form">
                                        <form method={"post"} className={"row"} noValidate={true} onSubmit={(event:any) => {this.formSubmit(event)}}>
                                            <TextField {...this.setupFieldAttrs("identifier")} wrapperClass={"mb-4"}/>
                                            <TextField {...this.setupFieldAttrs("password")} wrapperClass={"mb-0"}/>
                                            <p className=" forgot mt-0"><a href="#">Forgot password?</a></p>
                                            <TextField type={"checkbox"} name={"rememberMe"} label={"Remember me"} addWrapperClass={"remember-me"}/>
                                            <Row>
                                                <Column span={6} className={"text-center d-grid mx-auto mb-3"}>
                                                    <Button type={"submit"} variant={"secondary"}>Login</Button>
                                                </Column>
                                            </Row>
                                        </form>
                                    </div>
                                </CardContent>
                            </Card>
                        </Container>
                    </div>
                </main>
            </React.Fragment>
        )
    }

}