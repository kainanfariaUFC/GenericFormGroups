import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";
import es from "date-fns/locale/es";
import enUS from "date-fns/locale/en-US"
import "./InputDatePicker.css"
import { FaRegCalendar, FaCalendarTimes } from 'react-icons/fa';
import InputMask from "react-input-mask";

const locales = {
    "pt-BR": ptBR,
    "es": es,
    "en-US": enUS
}
let context = null;
export default class InputDatePicker extends Component {
    constructor(props) {
        let { position } = props.field;
        super(props);
        this.state = {
            disabled: true,
            startDate: null,
            popperPlacement: position === "top" ? "top-start" : "bottom-start"
        }
        context = this;
    }

    componentDidUpdate() {
        if (this.props.entity[this.props.field.control] && this.state.startDate === null) {
            let newDate = transformDataServerToDateFormat(this.props.entity[this.props.field.control])
            this.setState({
                startDate: newDate,
            })
        } else if (this.props.entity[this.props.field.control]) {
            let newDate = transformDataServerToDateFormat(this.props.entity[this.props.field.control])
            if (this.state.startDate.toLocaleDateString() !== newDate.toLocaleDateString()) {
                this.setState({
                    startDate: newDate,
                })
            }
        }

    }

    openDatepicker = () => {
        this._calendar.setOpen(true)
    };

    onDatepickerRef = (el) => {
        if (el && el.input) {
            el.input.readOnly = true;
        }
    }

    render() {
        let field = this.props.field
        return (
            <div className={`generic-datepicker-input ${field.extraClass}`}>
                <DatePicker
                    selected={this.state.startDate}
                    dateFormat="dd/MM/yyyy"
                    id={`${field.control}`}
                    disabled={this.props.field.disabled}
                    onChange={date => this.setState({ startDate: date, disabled: false }, () => {
                        if (field.onChange) {
                            field.onChange(date)
                        }
                        if (this.props.validateFromClient) {
                            this.props.validateFromClient({ value: date?.toString(), id: field.control })
                        }

                    })}
                    locale={locales[navigator.language || navigator.userLanguage]}
                    placeholderText={"__/__/____"}
                    ref={(c) => this._calendar = c}
                    customInput={
                        <InputMask
                            className={`generic-datepicker-input-mask ${field.extraClass}-mask`}
                            maskChar=" "
                            mask="99/99/9999"
                            data-validation-schema={field.validation}
                            placeholder={"__/__/____"}
                        />
                    }
                    popperPlacement={this.state.popperPlacement}
                />
                <div className={`generic-form-input-date-icon ${this.state.startDate ? "delete-icon-generic-calendar" : ""}`} onClick={() => {
                    if (!this.props.field.disabled) {
                        this.state.startDate ? this.setState({ startDate: null }) : this.openDatepicker();
                        if (field.onCleanDate) {
                            field.onCleanDate()
                        } else {
                            deleteDate()
                        }
                    }

                }}>
                    <span class="tooltiptext"> {this.state.startDate ? "Deletar data" : "Abrir calendário"} </span>
                    {this.state.startDate ? <FaCalendarTimes /> : <FaRegCalendar />}
                </div>
            </div>
        );
    }
}

export function transformDataServerToDateFormat(data) {
    if (data) {
        let dateString = data.split(" ")[0]
        let date;
        if (dateString.includes("/")) {
            const dateList = dateString.split("/");
            date = new Date(dateList.reverse().join(", "));
        } else {
            const dateList = dateString.split("-");
            date = new Date(dateList.join(", "));
        }

        return date
    }
}


export function deleteDate() {
    context.setState({
        startDate: null
    })
}
