export interface LeftNavItem {
    displayName: string
    url: string
    name?: string
    iconClass?: string
    nested?: Array<LeftNavItem>
}

export interface LeftNavData {
    leftNavItems?: Array<LeftNavItem>
    leftLogo?: any
}


import sidebarLogo from "./../assets/img/logo/sidebar-logo.png"
export class DummyLeftNavBar {

    public static get() {
        let leftNavBar: LeftNavData = {
            leftLogo: sidebarLogo,
            leftNavItems: [
                {displayName: "Dashboard", url: "#", iconClass: "bi bi-columns-gap"},
                {displayName: "Pages", url: "#", iconClass: "bi bi-stack", nested: [
                        {displayName: "Sub Page", url: "#", iconClass: "bi bi-stack"},
                    ]
                },
            ]
        }
        return leftNavBar
    }

}