
export interface QuickActionItem {
    displayName: string
    url: string
    name?: string
    iconClass?: string
}

export interface OperatorNavItem {
    displayName: string
    url: string
    name?: string
    iconClass?: string
}

export interface TopNavData {
    avatar?: any
    quickActionItemList?: Array<QuickActionItem>
    operatorNavItemList?: Array<OperatorNavItem>
    logoutAction?: (event: any) => void
}


import avatar from "./../assets/img/avatar.png"
export class DummyTopNavBar {


    public static get() {
        let topNavData: TopNavData;
        topNavData = {
            avatar: avatar
        }

        topNavData.quickActionItemList = [
            {displayName: "Create Supplier", url: "#", iconClass: "bi bi-file-earmark-plus"}
        ]

        topNavData.operatorNavItemList = [
            {displayName: "View Profile", url: "#", iconClass: "bi bi-card-heading"},
            {displayName: "Settings", url: "#", iconClass: "bi bi-gear"},
        ]

        return topNavData
    }

}