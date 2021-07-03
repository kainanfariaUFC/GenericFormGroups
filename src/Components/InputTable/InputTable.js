import React, { Component } from "react"
import "./InputTable.css"

export default class InputTable extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    getValue = (id, month) => {
        let gtp = this.props.entities.growing_type_projections
        let result = 0;
        if (gtp) {
            gtp.map(g => {
                if (g.type_id === id && month === g.month) {
                    result = g.expected_gains
                }
            })
        }
        return result

    }

    createRows = (size, label, gender, id) => {
        let arr = Array.from(Array(size).keys())
        return (
            arr.map(a => {
                if (a === 0) {
                    return <span className="span-legend-input-table"> {label} </span>
                } else if (label === "" || !label) {
                    return <span className="span-title-input-table"> {`${a} ${this.props.unit ? this.props.unit : "°"}`} </span>
                } else {
                    let val = this.getValue(id, a)
                    return (
                        <input class={`input-table-item-${label}-${gender}`} type="number" id={`input-table-item-${a}-${label}-${gender}`} defaultValue={val} />
                    )
                }
            })
        )
    }

    createTable = () => {
        let gender = this.props.gender ? this.props.gender : "female"
        let size = this.props.size ? this.props.size : [4, 7]
        let arr = Array.from(Array(size[0]).keys())
        let labels = this.props.labels ? this.props.labels : ["bezerro", "garrote", "boi"]
        return (
            arr.map(a => {
                let label = a !== 0 ? labels[a - 1] : ""
                if (label) {
                    return (
                        <div className={a === 0 ? "generic-input-table-head" : "generic-input-table"} >
                            {
                                this.createRows(size[1], label.name, gender, label.id)
                            }
                        </div>
                    )
                }

            })
        )
    }

    render() {
        return (
            <div className="input-table">
                {this.props.labels.length && this.createTable()}
            </div>
        )
    }
}
