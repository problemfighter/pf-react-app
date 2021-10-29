import React from "react";
import PFLayoutInfoData from "@pfo/pf-react/src/artifacts/data/pf-layout-info-data";


const ListView = React.lazy(() => import('./crud-list-view'));
const CreateUpdateView = React.lazy(() => import('./crud-create-edit-view'));
const DetailsView = React.lazy(() => import('./crud-details-view'));

const UI_BASE_URL = "/crud"
const API_BASE_URL = "api/v1/card/"

export default class CrudUrlMapping {


    public static readonly API = {
        LIST: API_BASE_URL + "list",
        CREATE: API_BASE_URL + "create",
        UPDATE: API_BASE_URL + "update",
        DELETE: API_BASE_URL + "delete/",
        DETAILS: API_BASE_URL + "details/",
        ACTIVE_INACTIVE: API_BASE_URL + "active-inactive",
    };


    public static readonly ui = {
        index: UI_BASE_URL,
        list: UI_BASE_URL + "/list",
        create: UI_BASE_URL + "/create",
        update: UI_BASE_URL + "/update",
        updateWithParams: UI_BASE_URL + "/update/:id",
        details: UI_BASE_URL + "/details",
        detailsWithParams: UI_BASE_URL + "/details/:id",
    };

    public static privateUrlMappings(privateLayoutInfo: PFLayoutInfoData): PFLayoutInfoData {
        privateLayoutInfo.addPageInstance(this.ui.index, ListView);
        privateLayoutInfo.addPageInstance(this.ui.list, ListView);
        privateLayoutInfo.addPageInstance(this.ui.create, CreateUpdateView);
        privateLayoutInfo.addPageInstance(this.ui.updateWithParams, CreateUpdateView);
        privateLayoutInfo.addPageInstance(this.ui.detailsWithParams, DetailsView);
        return privateLayoutInfo;
    }

    public static publicUrlMappings(publicLayoutInfo: PFLayoutInfoData): PFLayoutInfoData {
        return publicLayoutInfo;
    }
}