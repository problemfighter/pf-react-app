import React from 'react';
import {PFProps} from "@pfo/pf-react/src/artifacts/interface/pf-mixed-interface";
import PFComponentState from "@pfo/pf-react/src/artifacts/component/pf-component-state";
import PFComponent from "@pfo/pf-react/src/artifacts/component/pf-component";
import CommonUtil from "@pfo/pf-rui/spec/common/common-util";

export interface DetailsViewDefinition {
    name: string
    displayName: string
    customProcessor?: (definition: DetailsViewDefinition, index: any, detailsData: any) => DetailsViewDefinition
    colSpan?: string
    defaultValue?: any
    otherClasses?: string
}

interface Props extends PFProps {
    definitions: Array<DetailsViewDefinition>
    detailsData: { [key: string]: any }
}

class State extends PFComponentState {

}

export default class DetailsViewHelper extends PFComponent<Props, State> {

    state: State = new State();

    static defaultProps = {
    }

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps: Props) {
    }

    private getValue(detailsData: { [key: string]: any }, index: any, definition: DetailsViewDefinition) {
        if (definition.customProcessor) {
            definition = definition.customProcessor(definition, index, detailsData)
        }
        if (detailsData && detailsData[definition.name] !== undefined) {
            return detailsData[definition.name]
        }
        return definition.defaultValue ? definition.defaultValue : ""
    }

    private getView(definition: DetailsViewDefinition, index: any, detailsData: any) {
        let rowSpan = definition.colSpan ? definition.colSpan : "4"
        let html = (
            <div className={CommonUtil.getAndConcatClass(definition.otherClasses, "col-" + rowSpan)} key={index}>
                <div className="form-floating">
                    <div className="form-control fw-bold">{this.getValue(detailsData, index, definition)}</div>
                    <label className="fs-6">{definition.displayName}</label>
                </div>
            </div>
        )
        return html
    }

    renderUI() {
        const {detailsData, definitions} = this.props;
        let _this = this;
        return (
            <React.Fragment>
                {definitions.map((row: any, index: any) => _this.getView(row, index, detailsData))}
            </React.Fragment>
        )
    }

}