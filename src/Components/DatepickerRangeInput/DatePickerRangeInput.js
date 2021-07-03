import React, { Component } from "react";
//import { FormControl, InputGroup } from "react-bootstrap";
//import { getMessage } from "../../../../Tools/messageHandler";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePickerRangeInput.css";
import ptBR from "date-fns/locale/pt-BR";
import es from "date-fns/locale/es";
import enUS from "date-fns/locale/en-US"
import { FaCalendarTimes } from "react-icons/fa"
import { getMessage } from "../../../Tools/messageHandler";
import CustomTooltip from "../CustomTooltip/CustomTooltip";

const locales = {
    "pt-BR": ptBR,
    "es": es,
    "en-US": enUS
}

export default class DatePickerRangeInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
            startDate: null,
            endDate: null,
        }
    }

    componentDidMount() {
        document.get
    }

    handleChangeDelete = () => {
        this.setState({ startDate: null, endDate: null, disabled: true })
    }

    onDatepickerRef = (el) => {
        if (el && el.input) {
            el.input.readOnly = true;
        }
    }

    render() {
        return (
            <div className={`generic-datepicker ${this.props.className}`}>
                <div className="generic-datepicker-start">
                    <DatePicker
                        selected={this.state.startDate}
                        dateFormat="dd/MM/yyyy"
                        id={`generic-${this.props.id}_start`}
                        onChange={date => this.setState({ startDate: date, disabled: false }, () => this.props.onChange ? this.props.onChange(date, "start") : "" )}
                        selectsStart
                        locale={locales[navigator.language || navigator.userLanguage]}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        placeholderText={getMessage("label.dateStart")}
                    />
                </div>
                <div className={`generic-datepicker-separator${this.state.endDate || this.state.startDate ? "-active" : ""}`} onClick={this.handleChangeDelete}>
                    <CustomTooltip posicao={"bottom"} value={'Limpar datas'}><FaCalendarTimes /></CustomTooltip>
                </div>
                <div className="generic-datepicker-end">
                    <DatePicker
                        selected={this.state.endDate}
                        dateFormat="dd/MM/yyyy"
                        id={`generic-${this.props.id}_end`}
                        onChange={date => {
                            this.setState({ endDate: date }, () => this.props.onChange ? this.props.onChange(date, "end") : "" )
                        }}
                        selectsEnd
                        locale={locales[navigator.language || navigator.userLanguage]}
                        startDate={this.state.startDate}
                        ref={el => this.onDatepickerRef(el)}
                        endDate={this.state.endDate}
                        minDate={this.state.startDate}
                        placeholderText={getMessage("label.dateEnd")}
                        disabled={this.state.disabled}
                    />
                </div>
                
            </div>
        );
    }
}

export function transformDataToServer(data){
    let newData = data.split("/")
    return `${newData[2]}-${newData[1]}-${newData[0]}`
}