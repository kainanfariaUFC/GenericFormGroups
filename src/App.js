import React, { Component } from "react"
import FormGroups from "../src/Components/FormGroups/FormGroups"
import { Row, Col } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <Row>
                <Col md={3}>
                    <FormGroups entity={{}} field={{ control: "text", type: "text", fieldLabel: "Insert data", placeholder: "data" }} />
                </Col>
                <Col md={3}>
                    <FormGroups entity={{}} field={{ control: "date", type: "date", fieldLabel: "Insert date" }} />
                </Col>
                <Col md={3}>
                    <FormGroups entity={{}} field={{ control: "check", type: "check", options: [{ control: "check1" }], fieldLabel: "Insert data", placeholder: "data" }} />
                </Col>
                <Col md={3}>
                    <FormGroups entity={{}} field={{ control: "currency", type: "currency", prefix: "R$", fieldLabel: "Insert data", placeholder: "data" }} />
                </Col>
            </Row>
        )
    }
}