import React, { Component } from "react"

import "./CustomRadio.css"

export default class CustomRadio extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div class="funkyradio custom-radio-button">
                {this.props.radios && this.props.radios.map(radio => {
                    return (
                        <div class="funkyradio-check">
                            <input type="radio" id={this.props.field.control} name="radio" defaultChecked={this.props.entity[this.props.field.control] || radio.default} value={radio.label} id={radio.id} onClick={(event) => radio.onFunction ? radio.onFunction(event) : ()=> {}}/>
                            <label for={radio.id}>{radio.label}</label>
                        </div>
                    )
                })
                }
            </div>
        )
    }
}