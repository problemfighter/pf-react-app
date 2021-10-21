import PFLayoutInfoData from "@pfo/pf-react/src/artifacts/data/pf-layout-info-data";
import React from "react";


const LoginView = React.lazy(() => import('./../view/auth/login-view'));

export default class FMUrlMappingHolder {

    public static getMappings(publicLayoutInfo: PFLayoutInfoData, privateLayoutInfo: PFLayoutInfoData, pageWithLayout: Array<PFLayoutInfoData>, rootURL: string = "/") : Array<PFLayoutInfoData> {

        publicLayoutInfo.addPageInstance(rootURL, LoginView);
        pageWithLayout.push(publicLayoutInfo);

        return pageWithLayout;
    }

}