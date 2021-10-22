import React from 'react';
import {PFProps} from "@pfo/pf-react/src/artifacts/interface/pf-mixed-interface";
import PFComponentState from "@pfo/pf-react/src/artifacts/component/pf-component-state";
import PFComponent from "@pfo/pf-react/src/artifacts/component/pf-component";
import loginLogo from './../../assets/img/logo/login-logo.jpg'
import './../../assets/css/login.css'
import Card from "@pfo/pf-rui/bootstrap/card/Card";
import Container from "@pfo/pf-rui/bootstrap/Container";
import CardContent from "@pfo/pf-rui/bootstrap/card/CardContent";
import TextField from "../../../../../dev-libs/pf-rui/bootstrap/TextField";
import Row from "@pfo/pf-rui/bootstrap/Row";
import Column from "@pfo/pf-rui/bootstrap/Column";
import Button from "../../../../../dev-libs/pf-rui/bootstrap/Button";

interface Props extends PFProps {
    route: any;
}

class State extends PFComponentState {

}

export default class LoginView extends PFComponent<Props, State> {

    state: State = new State();

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps: Props) {
    }

    formSubmit(event: any) {
        event.preventDefault();
        const _this = this;
        const data = new FormData(event.currentTarget);
        console.log(data)
        console.log(event.target.elements)
        console.log(event.target[0].name)
        console.log(event.target[1].value)
    }

    renderUI() {
        return (
            <React.Fragment>
                <main className="login-view-wrapper">
                    <div className="h-100 d-flex align-items-center justify-content-center">
                        <Container className="form-window-middle d-flex align-items-center justify-content-center">
                            <Card>
                                <CardContent>
                                    <div className="company-logo p-2">
                                        <img src={loginLogo} className="rounded-circle mx-auto d-block" width="132" height="132"/>
                                    </div>
                                    <div className="text-center mb-3">
                                        <h3>Problem Fighter</h3>
                                    </div>
                                    <div className="login-form">
                                        <form method={"post"} className={"row"} noValidate={true} onSubmit={(event:any) => {this.formSubmit(event)}}>
                                            <TextField wrapperClass={"mb-4"} name="email" label="Email" type={"email"} required={true} placeholder={"Enter your email"}/>
                                            <TextField wrapperClass={"mb-0"} name="password" label="Password" type={"password"} required={true} placeholder={"Enter your password"}/>
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