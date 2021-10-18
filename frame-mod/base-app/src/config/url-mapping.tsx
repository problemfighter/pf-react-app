import React from 'react';
import PFURLMapping from "@pfo/pf-react/src/artifacts/config/pf-url-mapping";
import PFLayoutInfoData from "@pfo/pf-react/src/artifacts/data/pf-layout-info-data";
import FMUrlMappingHolder from "./fm-url-mapping-holder";
import PublicLayout from "../view/layouts/public-layout";


const EmptyView = React.lazy(() => import('../view/base-app/empty-view'));

export default class URLMapping extends PFURLMapping {

    public getLayoutsAndPages(): Array<PFLayoutInfoData> {
        let pageWithLayout: Array<PFLayoutInfoData> = [];

        let publicLayoutInfo: PFLayoutInfoData = new PFLayoutInfoData();
        publicLayoutInfo.layout = PublicLayout

        publicLayoutInfo.addPageInstance("/", EmptyView);
        pageWithLayout.push(publicLayoutInfo);

        FMUrlMappingHolder.getMappings(publicLayoutInfo, publicLayoutInfo);

        return pageWithLayout
    }

}