import React, { Component } from "react"
import { Form } from 'react-bootstrap';
import InputMask from "react-input-mask";
import CustomRadio from "../CustomRadio/CustomRadio";
import RenderCheckBox from "../CheckBox/CheckBox"
import { checkEmail, validateFromClient, checkPassWord, removeErrorMessage, injectErrorMessage } from "./FormGroupFunctions"
import InputSelect from "../InputSelect/InputSelect"
import "./FormGroup.css"
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaQuestionCircle } from 'react-icons/fa';
import { CustomButtonNewOnLabel } from "../FormTemplate/ButtonLabel"
import InputWeight from "../InputWeight/InputWeight";
import CurrencyInput from 'react-currency-input';
import MonthPicker from "../InputMonthPicker/MonthPicker"
import SelectCheck from "../InputSelectCheck/SelectCheck"
import { InputGroup, } from "react-bootstrap";
import InputDatePicker from "../InputDatePicker/InputDatePicker"
import Row from "react-bootstrap/Row";
import SelectTree from "../SelectTree/SelectTree";

export default class GenericFormGroups extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allValid: true,
            isCpf: true
        }
    }

    beforeMaskedValueChange = (newState, oldState, userInput) => {
        var { value } = newState;
        let compValue = oldState.value;
        var selection = newState.selection;
        var cursorPosition = selection?.start;
        let cpf = null
        if (compValue.replace(/[^0-9]/g, '').length === "999.999.999-99".replace(/[^0-9]/g, '').length && userInput) {
            value = value + userInput;
            cursorPosition += 2;
            selection = { start: cursorPosition, end: cursorPosition };
            if (!cpf) {
                cpf = false
            }
        }

        if (compValue.replace(/[^0-9]/g, '').length > value.replace(/[^0-9]/g, '').length && value.replace(/[^0-9]/g, '').length === "999.999.999-99".replace(/[^0-9]/g, '').length) {
            if (!cpf) {
                cpf = true
            }
        }

        if (value.replace(/[^0-9]/g, '').length < "999.999.999-99".replace(/[^0-9]/g, '').length) {
            if (!cpf) {
                cpf = true
            }
        }

        if (this.state.isCpf !== cpf && cpf !== null) {
            this.setState({ isCpf: cpf })
        }

        return {
            value,
            selection
        };
    }

    renderInputMaskCpfCnpj = (entity, field) => {
        return (
            <>
                <InputMask
                    className="generic-form-input"
                    maskChar="_"
                    data-validation-schema={field.validation ? field.validation : this.state.isCpf ? "X" : "Y"}
                    value={entity[field.control]}
                    disabled={field.disabled}
                    id={field.control}
                    onBlur={e => document.getElementById(e.target.id).value.split(" ")[0].length < field.min && field.validSize && field.validation && document.getElementById(e.target.id).value.length !== 0 ? injectErrorMessage(e.target.id, "Inválido") : removeErrorMessage(e.target.id)}
                    onChange={(e) => {
                        validateFromClient(e.target)
                        if (field.onChange) {
                            field.onChange(e.target)
                        }
                    }}
                    ref={node => {
                        if (field.ref && node)
                            field.ref.current = node.getInputDOMNode();
                    }}
                    beforeMaskedValueChange={this.beforeMaskedValueChange}
                    mask={this.state.isCpf ? "999.999.999-99" : "99.999.999/9999-99"}
                    placeholder={field.placeholder}
                />
                <Form.Control.Feedback id={`invalid-feedback-${field.control}`} className={"generic-invalid-feedback"} name={`invalid-feedback-${field.control}`} type="valid" />
            </>
        )
    }

    renderInputMask = (entity, field) => {
        return (
            <>
                <InputMask
                    className="generic-form-input"
                    maskChar="_"
                    data-validation-schema={field.validation}
                    value={entity[field.control]}
                    disabled={field.disabled}
                    id={field.control}
                    onBlur={e => document.getElementById(e.target.id).value.split(" ")[0].length < field.min && field.validSize && field.validation && document.getElementById(e.target.id).value.length !== 0 ? injectErrorMessage(e.target.id, "Inválido") : removeErrorMessage(e.target.id)}
                    onChange={(e) => {
                        validateFromClient(e.target)
                        if (field.onChange) {
                            field.onChange(e.target, entity, field)
                        }
                    }}
                    ref={node => {
                        if (field.ref && node)
                            field.ref.current = node.getInputDOMNode();
                    }}
                    beforeMaskedValueChange={field.beforeMaskedValueChange}
                    mask={field.mask}
                    data-mask={field.mask}
                    placeholder={field.placeholder}
                />
                <Form.Control.Feedback id={`invalid-feedback-${field.control}`} className={"generic-invalid-feedback"} name={`invalid-feedback-${field.control}`} type="valid" />
            </>
        )
    }

    renderInputCep = (entity, field) => {
        return (
            <>
                <InputMask
                    className="generic-form-input"
                    data-validation-schema={field.validation}
                    value={entity[field.control]}
                    disabled={field.disabled}
                    id={field.control}
                    mask={field.mask}
                    onBlur={this.fetchCEPData}
                    onChange={(e) => {
                        if (e.target.value.replace(/[^0-9]/g, '').length >= 9) {
                            this.fetchCEPData()
                        }
                        if (field.onChange) {
                            field.onChange(e.target)
                        }
                    }}
                    placeholder={field.placeholder}
                />
                <Form.Control.Feedback id={`invalid-feedback-${field.control}`} className={"generic-invalid-feedback"} name={`invalid-feedback-${field.control}`} type="valid" />
            </>
        )
    }

    fetchCEPData = () => {
        let zipcode = document.getElementById("zipcode").value
        if (zipcode.length === 9) {
            fetch(`https://api.pagar.me/1/zipcodes/${zipcode}`, { method: 'get' })
                .then(response => response.json())
                .then(this.handleCEP)
        }
    }

    handleCEP = (data) => {
        let feedback = document.getElementById("zipcode");
        let feedMsg = document.getElementById(`invalid-feedback-zipcode`)
        if (data.errors) {
            feedback.classList.add('is-invalid');
            feedMsg.classList.add('is-invalid');
            feedMsg.textContent = "Inválido";
        } else {
            feedback.classList.remove('is-invalid');
            feedMsg.classList.remove('is-invalid');
            feedMsg.textContent = "";
            if (data.city) {
                document.getElementById("city").value = data.city
            }
            if (data.neighborhood) {
                document.getElementById("neighborhood").value = data.neighborhood
            }
            if (data.state) {
                document.getElementById("uf").value = data.state
            }
            if (data.street) {
                document.getElementById("street").value = data.street
            }
        }

    }

    transformDateToServer = (value, control) => {
        if (window.navigator.language === "en-US") {
            let newDate = value.split("-")
            document.getElementById(control).value = `${newDate[2]}/${newDate[1]}/${newDate[0]}`
        } else if (window.navigator.language === "pt-BR") {
            let newDate = value.split("-")
            document.getElementById(control).value = `${newDate[2]}/${newDate[1]}/${newDate[0]}`
        }
    }

    transServerDateToForm = (value) => {
        let newValue = value.split(" ")[0]
        if (window.navigator.language === "en-US") {
            let newDate = newValue.split("-")
            return `${newDate[2]}/${newDate[1]}/${newDate[0]}`
        } else if (window.navigator.language === "pt-BR") {
            let newDate = newValue.split("-")
            return `${newDate[2]}/${newDate[1]}/${newDate[0]}`
        }
    }

    renderInputDate = (entity, field) => {
        return (
            <>
                <div className="generic-form-input-date-container" >
                    <InputDatePicker entity={entity} field={field} validateFromClient={validateFromClient} />
                </div>
                <Form.Control.Feedback id={`invalid-feedback-${field.control}`} className={"generic-invalid-feedback"} name={`invalid-feedback-${field.control}`} type="valid" />
            </>
        )
    }

    renderInputText = (entity, field) => {
        return (
            <>
                <input
                    className="generic-form-input"
                    data-validation-schema={field.validation}
                    defaultValue={function () {
                        if (field.subEntity && entity[field.subEntity]) {
                            return entity[field.subEntity][field.subValue]
                        }
                        return entity[field.control]
                    }()}
                    disabled={field.disabled}
                    id={field.control}
                    onChange={(e) => {
                        validateFromClient(e.target)
                        if (field.type === "email") {
                            checkEmail(e.target.value, e.target.id)
                        }
                        if (field.onChange) {
                            field.onChange(e.target, entity, field)
                        }
                    }}
                    placeholder={field.placeholder}
                    readOnly={field.readOnly}
                    type={"text"}
                    ref={field.ref}

                />
                <Form.Control.Feedback id={`invalid-feedback-${field.control}`} className={"generic-invalid-feedback"} name={`invalid-feedback-${field.control}`} type="valid" />
            </>
        )
    }

    renderInputPassword = (entity, field) => {
        return (
            <>
                <input
                    className="generic-form-input"
                    data-validation-schema={field.validation}
                    defaultValue={function () {
                        if (field.subEntity && entity[field.subEntity]) {
                            return entity[field.subEntity][field.subValue]
                        }
                        return entity[field.control]
                    }()}
                    onChange={() => checkPassWord()}
                    id={field.control}
                    placeholder={field.placeholder}
                    type={"password"}
                />
                <Form.Control.Feedback id={`invalid-feedback-${field.control}`} className={"generic-invalid-feedback"} name={`invalid-feedback-${field.control}`} type="valid" />
            </>
        )
    }

    renderCustomRadio = (entity, field) => {
        return (
            <div className={field.radioClass}>
                <div className={`${field.radioClass}-container`}>
                    <CustomRadio radios={field.radios} field={field} entity={entity} />
                </div>
            </div>
        )
    }

    renderCustomCheck = (entity, field) => {
        return (
            <div className={`${field.className} ${field.extraClass}`}>
                <div className={`${field.extraClass}-container`}>
                    {field && field.options.map((option, index) => {
                        let check = entity ? entity[option.control] : false
                        return (
                            <RenderCheckBox
                                callbackFunction={field.callbackFunction}
                                check={check}
                                column={option}
                                disabled={option.disable}
                                index={index}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }

    renderInputSelect = (entity, field) => {
        return (
            <>
                <InputSelect entity={entity} field={field} validateFromClient={validateFromClient} />
                <Form.Control.Feedback id={`invalid-feedback-${field.control}`} className={"generic-invalid-feedback"} name={`invalid-feedback-${field.control}`} type="valid" />
            </>
        )
    }

    earringIcon = (field) => {
        return (
            <OverlayTrigger
                delay={{ show: 0, hide: 350 }}
                key="top"
                overlay={
                    <Tooltip id="tooltip-top">
                        {field.tootipLabel}
                    </Tooltip>
                }
                placement="top"
            >
                <FaQuestionCircle className="infoIcon" />
            </OverlayTrigger>
        );
    }

    renderInputButton = (entity, field) => {
        return (
            <>

                <button disabled={field.disabled} id={field.control} onClick={e => field?.onClick(e, entity)} style={field.style} type={"button"}>{field.placeholder}</button>
            </>
        )
    }

    renderInputColor = (entity, field) => {
        return (
            <>

                <input data-validation-schema={field.validation} data-value-type={field.dataValueType} id={field.control} onChange={e => field.onChange ? field.onChange(e.target, entity, field) : () => { }} readOnly={field.readOnly} type="color" value={entity[field.control]} />
                <Form.Control.Feedback id={`invalid-feedback-${field.control}`} className={"generic-invalid-feedback"} name={`invalid-feedback-${field.control}`} type="valid" />
            </>
        )
    }

    renderInputTextArea = (entity, field) => {
        return (
            <>

                <Form.Control as="textarea" data-validation-schema={field.validation} data-value-type={field.dataValueType} id={field.control} onChange={e => field.onChange ? field.onChange(e.target, entity, field) : () => { }} readOnly={field.readOnly} ref={field.ref} rows={field.rows} style={{ minHeight: '5em', lineHeight: 1 }} defaultValue={entity[field.control] || field.value} />
                <Form.Control.Feedback id={`invalid-feedback-${field.control}`} className={"generic-invalid-feedback"} name={`invalid-feedback-${field.control}`} type="valid" />
            </>
        )
    }

    renderInputWeight = (entity, field) => {
        return (
            <>

                <InputWeight field={field} id={field.control} onChange={(e) => field.onChange ? field.onChange(e.target, entity, field) : () => { }} value={entity[field.control] || field.value} validation={field.validation} placeholder={field.placeholder} />
                <Form.Control.Feedback id={`invalid-feedback-${field.control}`} className={"generic-invalid-feedback"} name={`invalid-feedback-${field.control}`} type="valid" />
            </>
        )
    }

    renderInputMonthPicker = (entity, field) => {
        return (
            <>

                <MonthPicker field={field} controlId={field.control} onChange={(e) => field.onChange ? field.onChange(e.target, entity, field) : () => { }} value={entity[field.control] || field.value} validation={field.validation} placeholder={field.placeholder} />
                <Form.Control.Feedback id={`invalid-feedback-${field.control}`} className={"generic-invalid-feedback"} name={`invalid-feedback-${field.control}`} type="valid" />
            </>
        )
    }

    renderInputNumber = (entity, field) => {
        let val = typeof entity[field.control] === "string" ? parseInt(entity[field.control]) : entity[field.control]
        return (
            <>
                <div className="number-div-form-generic">
                    <input
                        accept={field.accept}
                        className={`input-generic-number ${field.unity ? "input-generic-number-unity" : ""}`}
                        data-validation-schema={field.validation}
                        data-value-default={field.valueDefault}
                        data-value-type={field.dataValueType}
                        disabled={field.disabled}
                        id={field.control}
                        max={field.max}
                        min={field.min}
                        onChange={(e) => {
                            validateFromClient(e.target)
                            if (field.onChange) {
                                field.onChange(e.target, entity, field)
                            }
                        }}
                        onInput={field.onInput}
                        placeholder={field.placeholder}
                        readOnly={field.readOnly}
                        ref={field.ref}
                        step={field.step}
                        type={field.type}
                        value={val} />
                    {field.unity && <InputGroup.Prepend className="number-div-form-generic-prepend">
                        <InputGroup.Text className="input-unity">{field.unity}</InputGroup.Text>
                    </InputGroup.Prepend>}
                </div>

                <Form.Control.Feedback id={`invalid-feedback-${field.control}`} className={"generic-invalid-feedback"} name={`invalid-feedback-${field.control}`} type="valid" />
            </>
        )
    }

    renderInputCurrency = (entity, field) => {
        return (
            <>
                <div className="currency-div-form-generic">
                    <InputGroup.Prepend className="currency-div-form-generic-prepend">
                        {field.prefix ? `${field.prefix} ` : " "}
                    </InputGroup.Prepend>
                    <CurrencyInput
                        autoFocus={field.autoFocus}
                        className={`form-control currency-div-form-generic-container input-generic-curency ${field.unity ? "input-generic-number-unity" : ""}`}
                        data-validation-schema={field.validation}
                        data-value-type={field.dataValueType}
                        decimalSeparator={!field.decimalSeparator ? "," : field.decimalSeparator}
                        disabled={field.disabled}
                        id={field.control}
                        inputType={"text"}
                        maxLength={field.maxLength}
                        onChangeEvent={(e, maskedValue, floatValue) => {
                            let target = e.target;
                            validateFromClient(e.target)
                            if (field.onChange) {
                                field.onChange(target, floatValue, entity, field)
                            }
                        }}
                        placeholder={field.placeholder}
                        precision={field.precision}
                        prefix={""}
                        readOnly={field.readOnly}
                        selectAllOnFocus={field.selectAllOnFocus}
                        thousandSeparator={!field.thousandSeparator ? "." : ""}
                        value={parseFloat(entity[field.control])}
                    />
                    {field.unity && <InputGroup.Prepend className="number-div-form-generic-prepend">
                        <InputGroup.Text className="input-unity">{field.unity}</InputGroup.Text>
                    </InputGroup.Prepend>}

                </div>
                <Form.Control.Feedback id={`invalid-feedback-${field.control}`} className={"generic-invalid-feedback"} name={`invalid-feedback-${field.control}`} type="valid" />
            </>
        )
    }

    renderInputCardList = (_, field) => {
        return (
            <>

                <Row className={field.classCard}>
                    {
                        field.options?.map((option, key) => {
                            return (
                                <React.Fragment key={key}>
                                    {
                                        field.cardTemplate(option, () => field.onClick(option), event => {
                                            event.stopPropagation();
                                            field.onRemove(option);
                                        })
                                    }
                                </React.Fragment>
                            )
                        })
                    }
                </Row>
                <input className={"generic-card-list-input"} data-validation-schema={field.validation} data-value-type="json" id={field.control} type="hidden" value={JSON.stringify(field.options)} />
                <Form.Control.Feedback id={`invalid-feedback-${field.control}`} className={"generic-invalid-feedback"} name={`invalid-feedback-${field.control}`} type="valid" />
            </>
        )
    }

    renderInputSelectCheck = (entity, field) => {
        return (
            <>
                <SelectCheck entity={entity} field={field} validateFromClient={validateFromClient} />
                <Form.Control.Feedback id={`invalid-feedback-${field.control}`} className={"generic-invalid-feedback"} name={`invalid-feedback-${field.control}`} type="valid" />
            </>
        )
    }

    renderInputHiddenDefault = (_, field) => {
        return (
            <>
                <input className={"generic-hidden-input"} id={field.control} type="hidden" value={field.value} />
            </>
        )
    }

    renderSelectTree = (entity, field) => {
        return (
            <>
                <SelectTree entity={entity} field={field} validateFromClient={validateFromClient} />
                <Form.Control.Feedback id={`invalid-feedback-${field.control}`} className={"generic-invalid-feedback"} name={`invalid-feedback-${field.control}`} type="valid" />
            </>
        )
    }

    handleInputs = (entity, field) => {
        const functionsDict = {
            "text": this.renderInputText,
            "inputMask": this.renderInputMask,
            "password": this.renderInputPassword,
            "radio": this.renderCustomRadio,
            "check": this.renderCustomCheck,
            "date": this.renderInputDate,
            "email": this.renderInputText,
            "cep": this.renderInputCep,
            "select": this.renderInputSelect,
            "button": this.renderInputButton,
            "color": this.renderInputColor,
            "textarea": this.renderInputTextArea,
            "weight": this.renderInputWeight,
            "monthpicker": this.renderInputMonthPicker,
            "number": this.renderInputNumber,
            "currency": this.renderInputCurrency,
            "cardList": this.renderInputCardList,
            "selectCheck": this.renderInputSelectCheck,
            "hidden": this.renderInputHiddenDefault,
            "selectTree": this.renderSelectTree,
            "cpfCnpj": this.renderInputMaskCpfCnpj,
        }
        let functionCall = functionsDict[field.type]
        return (
            <>
                {field.fieldLabel && <Form.Label className="form-generic-groups-label" for={field.control} style={{ width: "100%", color: "#676767" }}>{field.fieldLabel} {!this.props.allValidation && field.validation ? "*" : ""} {field.falseValidation ? "*" : ""} {field.tootipLabel ? this.earringIcon(field) : ""}  {field.newButton ? <CustomButtonNewOnLabel onClick={(e) => field.newButton(e)} /> : ""}</Form.Label>}
                {functionCall(entity, field)}
            </>
        )
    }

    render() {
        let entity = this.props.entity
        let field = this.props.field
        return (
            this.handleInputs(entity, field)
        )
    }
}