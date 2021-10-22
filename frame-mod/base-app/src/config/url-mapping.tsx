import React from 'react';
import PFURLMapping from "@pfo/pf-react/src/artifacts/config/pf-url-mapping";
import PFLayoutInfoData from "@pfo/pf-react/src/artifacts/data/pf-layout-info-data";
import FMUrlMappingHolder from "./fm-url-mapping-holder";
import PublicLayout from "../view/layouts/public-layout";
import PrivateLayout from "../view/layouts/private-layout";


const DashboardView = React.lazy(() => import('../view/base-app/dashboard-view'));

export default class URLMapping extends PFURLMapping {

    public getLayoutsAndPages(): Array<PFLayoutInfoData> {
        let pageWithLayout: Array<PFLayoutInfoData> = [];

        let privateLayoutInfo: PFLayoutInfoData = new PFLayoutInfoData();
        privateLayoutInfo.layout = PrivateLayout

        privateLayoutInfo.addPageInstance("/dashboard", DashboardView);
        pageWithLayout.push(privateLayoutInfo);

        let publicLayoutInfo: PFLayoutInfoData = new PFLayoutInfoData();
        publicLayoutInfo.layout = PublicLayout

        pageWithLayout = FMUrlMappingHolder.getMappings(publicLayoutInfo, privateLayoutInfo, pageWithLayout);

        return pageWithLayout
    }

}