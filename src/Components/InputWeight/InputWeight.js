import React, { Component } from "react"

export default class InputWeight extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        
    }

    componentDidMount() {
        let weightInput = document.getElementById(this.props.id)
        weightInput.onkeyup = function () {
            var v = this.value, integer = v.split(',')[0];
            v = v.replace(/\D/, "");
            v = v.replace(/^[0]+/, "");
            if (v.length <= 2 || !integer) {
                if (v.length === 1) v = '0,0' + v;
                if (v.length === 2) v = '0,' + v;
            } else {
                v = v.replace(/^(\d{1,})(\d{2})$/, "$1,$2");
            }
            this.value = v;
        }
    }

    render() {
        let valueToShow = this.props.value && this.props.value > 0 ? this.props.value.split(".") : ""
        let value = valueToShow.length > 1 ? `${valueToShow[0]},${valueToShow[1]}` : valueToShow[0]
        return (
            <>
                <input type="text" id={this.props.id} maxlength="7" data-validation-schema={this.props.validation} defaultValue={value} placeholder={this.props.placeholder} onChange={(e)=> this.props.onChange ? this.props.onChange(e, this.props.field) : ""} />
            </>
        )
    }
}