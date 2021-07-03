import React, { Component } from "react";
import TitlePage from "../PageTemplate/TitlePage/TitlePage";
import GenericForm from "../GenericForm/GenericForm"

export default class FormFactory extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="form-template-generic">
                {!this.props.hideTitle && <div className={`generic-form-template-title ${this.props.titleClass}`}>
                    <TitlePage goBackFunction={this.props.goBackFunction} buttonArea={this.props.buttonArea} title={this.props.title} titteAttributes={this.props.titleAttributes} titlePath={this.props.titlePath} />
                </div>}
                <div className={`generic-form-templat-area ${this.props.bodyClass}`}>
                    <GenericForm
                        action={this.props.action}
                        allValidation={this.props.allValidation}
                        entity={this.props.entity}
                        fields={this.props.fields}
                        fieldTitles={this.props.fieldTitles}
                        onHide={this.props.onHide}
                        postEventCallback={this.props.postEventCallback}
                        previousCallback={this.props.previousCallback}
                        urlSuffix={this.props.urlSuffix}
                        profilePic={this.props.profilePic}
                        hideFooter={this.props.hideFooter}
                        subForm={this.props.subForm}
                        methodURL={this.props.methodURL}
                        hideValidation={this.props.hideValidation}
                    />
                </div>
            </div>
        )
    }
}