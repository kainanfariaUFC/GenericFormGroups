import React, { Component } from "react"
import { Form } from "react-bootstrap"
import "./InputSelect.css"

export default class InputSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectValues: [{ "name": 1.0 }, { "name": 1.5 }, { "name": 2.0 }, { "name": 2.5 }, { "name": 3.0 }, { "name": 3.5 }, { "name": 4.0 }, { "name": 4.5 }, { "name": 5.0 }]
        }
    }

    render() {
        let options = this.props.field.options === "ecc" ? this.state.selectValues : this.props.field.options
        let isSelected = Object.keys(this.props.entity).length > 0 ? (this.props.field.editField ? this.props.entity[this.props.field.editField] : this.props.entity[this.props.field.control] ) : (this.props.field.defaultSelect ? this.props.field.defaultSelect : null)
        let field = this.props.field
        let defaultObject = { value: "", name: `${field.placeholder ? field.placeholder : "Escolher opção"}`, disabled: true, selected: true}
        options = !field.defaultSelect ? [defaultObject].concat(options) : options;
        return (
            <>
                <Form.Control as={"select"} data-validation-schema={field.validation || "S"} id={this.props.field.id || this.props.field.controlId || this.props.field.control} className={`input-generic-select ${this.props.field.extraClass ?? ""}`} disabled={this.props.field.disabled ? this.props.field.disabled : false}
                    onChange={(e) => {
                        
                        if ( this.props.validateFromClient) {
                            this.props.validateFromClient(e.target)
                        }
                        if (this.props.field.onChange) {
                            this.props.field.onChange(e.target, this.props.entity)
                        }
                    }}
                >
                    {options && options.map((option, index) => {
                        if (option) {
                            let optionValue = (!option.value || option.value === undefined) ? option.id : option.value
                            return [
                                <option className={optionValue === "" || optionValue === undefined ? "input-generics-select-placeholder" : ""} disabled={optionValue === "" && true || option.disabled} hidden={optionValue === "" && true} key={index} selected={isSelected !== null && isSelected !== undefined && isSelected === optionValue ? true : option.selected} value={optionValue ?? ""}>
                                    {option.name || (option.description || option.label)}
                                </option>,
                            ]
                        }

                    })}
                </Form.Control>
            </>
        )
    }
}