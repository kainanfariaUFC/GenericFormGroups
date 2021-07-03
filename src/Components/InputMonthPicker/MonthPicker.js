import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./MonthPicker.css";
import ptBR from "date-fns/locale/pt-BR";
import es from "date-fns/locale/es";
import enUS from "date-fns/locale/en-US"
import InputMask from "react-input-mask";

const locales = {
    "pt-BR": ptBR,
    "es": es,
    "en-US": enUS
}

export default class MonthPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            canUpdate: true
        }
    }

    componentDidMount(){
        if (this.props.useDefault && this.state.canUpdate) {
            let newDate = new Date()
            this.setState({
                canUpdate: false,
                date: newDate,
            })
        }
    }

    componentDidUpdate() {
        if (this.props.value && this.state.canUpdate) {
            let newDate = transformDataServerToDateFormat(this.props.value)
            this.setState({
                canUpdate: false,
                date: newDate,
            })
        }
        if (this.props.useDefault && this.state.canUpdate) {
            let newDate = new Date()
            this.setState({
                canUpdate: false,
                date: newDate,
            })
        }
    }

    render() {
        return (
            <div className={`generic-monthpicker ${this.props.className}`}>
                <DatePicker
                    selected={this.state.date}
                    id={`${this.props.controlId}`}
                    onChange={date => this.setState({ date: date }, () => this.props.onChange ? this.props.onChange(date, "start") : "")}
                    dateFormat="MM/yyyy"
                    disabled={this.props.field.disabled}
                    locale={locales[navigator.language || navigator.userLanguage]}
                    placeholderText={"__/____"}
                    showMonthYearPicker
                    customInput={
                        <InputMask
                            className={`generic-monthpicker-input ${this.props.className}`}
                            maskChar=" "
                            id={this.props.controlId}
                            mask="99/9999"
                            placeholder={"__/____"}
                        />
                    }
                />
            </div>
        );
    }
}

export function transformDataToServer(data) {
    console.log(data)
    let newData = data.split("/")
    return `${newData[2]}-${newData[1]}-${newData[0]}`
}

export function transformDataServerToDateFormat(data) {
    if (data) {
        let newData = data.split(" ")
        let da = `${newData[0].split("-")[0]}, ${newData[0].split("-")[1]}, ${newData[0].split("-")[2]}`
        let d = new Date(da)
        return d
    }

}