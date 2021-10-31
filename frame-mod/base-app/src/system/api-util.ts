import {AppConstant} from "./app-constant";
import PFHTTResponse from "@pfo/pf-react/src/artifacts/processor/http/pf-http-response";
import {AppMessage} from "./app-message";
import {PFException} from "@pfo/pf-react/src/artifacts/common/pf-exception";
import SystemConfig from "./system-config";
import PFLoadDataPrams from "@pfo/pf-react/src/artifacts/data/pf-load-data-prams";

export const ApiUtil = {

    getParamsDataFromRouter(router: any, key: string) {
        if (router && router.match && router.match.params && router.match.params[key]) {
            return router.match.params[key]
        }
        return null
    },

    errorFlashRequest: (component: any, message: string) => {
        component.showErrorFlash(message)
    },

    getResponseRawContent: (response: PFHTTResponse) => {
        let errorMessage = AppMessage.unableToCommunicate;
        if (!response.isSuccess || !response.responseData) {
            if (response.responseData && response.responseData.message) {
                errorMessage = response.responseData.message
            } else if (response.message) {
                errorMessage = response.message
            }
            throw new PFException(errorMessage)
        }
        return response.responseData
    },

    inspectResponseValidationError: (response: PFHTTResponse) => {
        let errorMessage = AppMessage.somethingWentWrong;
        let responseData = ApiUtil.getResponseRawContent(response)
        if (responseData.status === AppConstant.STATUS_ERROR) {
            if (responseData.message) {
                errorMessage = responseData.message
            }
            throw new PFException(errorMessage).setErrorDetails(responseData)
        }
        return responseData
    },

    inspectResponseAndShowValidationError: (response: PFHTTResponse, component: any) => {
        ApiUtil.getValidResponseOrNone(response, component)
    },

    getValidResponseOrNone: (response: PFHTTResponse, component: any) => {
        let errorMessage = AppMessage.somethingWentWrong;
        let responseData = undefined
        try {
            responseData = ApiUtil.inspectResponseValidationError(response)
        } catch (e: any) {
            if (e.message) {
                errorMessage = e.message
            }
            ApiUtil.errorFlashRequest(component, errorMessage)
        }
        return responseData
    },

    getFormRequestValidResponseOrNone: (response: PFHTTResponse, component: any) => {
        let errorMessage = AppMessage.somethingWentWrong;
        let responseData = undefined
        try {
            responseData = ApiUtil.inspectResponseValidationError(response)
        } catch (e: any) {
            if (e.errorDetails) {
                let errorResponseData = e.errorDetails
                if (errorResponseData && errorResponseData.status === AppConstant.STATUS_ERROR && errorResponseData.error && errorResponseData.error.length !== 0) {
                    component.showServerSideFormValidationError(errorResponseData.error);
                }
            }
            if (e.message) {
                errorMessage = e.message
            }
            ApiUtil.errorFlashRequest(component, errorMessage)
        }
        return responseData
    },

    isEmptyObject(obj: object): boolean {
        return Object.keys(obj).length === 0
    },

    resetSearchAndPagination: (component: any) => {
        component.state.queryCondition = {};
        component.state.currentPage = 0;
        component.state.itemPerPage = SystemConfig.itemPerPage();
        component.setState({search: null})
    },

    getSearchSortAndPaginationData: (parentState: any, dataParams: PFLoadDataPrams = new PFLoadDataPrams()) => {
        let state = parentState.state;
        let queryParams: { [key: string]: any } = {}
        if (dataParams.params) {
            queryParams = dataParams.params
        }
        if (dataParams.isReset) {
            ApiUtil.resetSearchAndPagination(parentState)
            return queryParams
        }
        queryParams['page'] = state.currentPage;
        queryParams['per-page'] = state.itemPerPage;
        queryParams['sort-order'] = state.sortDirection;
        queryParams['sort-field'] = state.orderBy;
        if (state.search) {
            queryParams["search"] = state.search;
        }
        return queryParams;
    },

    managePaginationAttributes: (component: any, callBack?: any) => {
        let state = component.state
        return {
            totalPage: state.totalPage,
            currentPage: state.currentPage,
            itemPerPage: state.itemPerPage,
            onChangePagination: (event: any, pageNumber: number) => {
                component.setState(
                    {
                        currentPage: pageNumber,
                    }, () => {
                        if (callBack) {
                            callBack()
                        } else if (component.loadData) {
                            component.loadData()
                        }
                    }
                );
            },
            onChangeItemPerPage: (event: any, itemPerPage: number) => {
                ApiUtil.resetSearchAndPagination(component);
                component.setState(
                    {
                        itemPerPage: itemPerPage,
                    }, () => {
                        if (callBack) {
                            callBack()
                        } else if (component.loadData) {
                            component.loadData()
                        }
                    }
                );
            }
        }
    }

};