import {TopNavData} from "./top-nav-data";
import {LeftNavData} from "./left-nav-data";

export class NavigationConfigData {

    private LEFT_NAV: string = "LEFT_NAV_CONFIG_DATA"
    private TOP_NAV: string = "TOP_NAV_CONFIG_DATA"
    public topNavData?: TopNavData;
    public leftNavData?: LeftNavData;

    public addToLeftNavDataConfig(config: any): NavigationConfigData {
        if (config) {
            config.addToGeneralConfig(this.LEFT_NAV, this.leftNavData)
        }
        return this
    }

    public getFromLeftNavConfig(config: any): LeftNavData | undefined {
        if (config) {
            return config.getFromGeneralConfig(this.LEFT_NAV)
        }
        return undefined
    }

    public addToTopNavDataConfig(config: any): NavigationConfigData {
        if (config) {
            config.addToGeneralConfig(this.TOP_NAV, this.topNavData)
        }
        return this
    }

    public getTopNavConfig(config: any): TopNavData | undefined {
        if (config) {
            return config.getFromGeneralConfig(this.TOP_NAV)
        }
        return undefined
    }

    public static instance() {
        return new NavigationConfigData()
    }

}