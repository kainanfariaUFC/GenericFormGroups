import React, { Component } from "react"
import "./CardDash.css"

export default class CardDash extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    
    render() {
        return (
            <>
                <div className={"generic-card-dash"}>
                    <div className={"icon-col"}>
                        <i className={this.props.icon+" generic-card-dash-icon"} />
                    </div>

                    <div className={"linhas-col"}>
                        <p className={"valor"}>{this.props.value}</p>
                        <p className={"descricao"}>{this.props.description}</p>
                    </div>

                </div>
            </>
        )
    }
}