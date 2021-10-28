import React from 'react';
import PFAppConfig from "@pfo/pf-react/src/artifacts/config/pf-app-config";
import PFComponentState from "@pfo/pf-react/src/artifacts/component/pf-component-state";
import AppBeforeRenderView from "../view/system/app-before-render-view";


export default class AppConfig extends PFAppConfig {

    public getBeforeRenderUIView(componentState: PFComponentState, component: any) {
        return (<AppBeforeRenderView componentState={componentState} component={component}/>)
    }

}