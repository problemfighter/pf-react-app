import {AppConstant} from "./app-constant";
import PFHTTResponse from "@pfo/pf-react/src/artifacts/processor/http/pf-http-response";
import {AppMessage} from "./app-message";
import {PFException} from "@pfo/pf-react/src/artifacts/common/pf-exception";

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

};