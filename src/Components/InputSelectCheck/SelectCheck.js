import React, { Component } from "react"
import RenderCheckBox from "../CheckBox/CheckBox"
import { Form, InputGroup, } from "react-bootstrap";
import "./SelectCheck.css"
import { RiArrowDownSLine } from "react-icons/ri"

export default class SelectCheck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectArea: false,
            placeholder: [],
            values: []
        }
    }

    componentDidMount() {
        this.bodyClickListener()
    }

    componentDidUpdate(){
        if(this.props.field.defaultValues && this.props.field.defaultValues.length > 0 && this.state.values.length === 0 && this.state.placeholder.length === 0){
            let data = this.props.field.defaultValues
            let values = []
            let placeholder = []
            data.map(d =>{
                values.push(d.value)
                placeholder.push(d.control)
            })
            this.setState({ placeholder: placeholder, values: values })
        }
    }

    bodyClickListener = () => {
        document.body.addEventListener("click", (e) => {
            let selectCheckLayer = document.getElementById("selectCheckLayer")

            if (selectCheckLayer) {
                let elem = e.target;
                var parents = [];
                while (elem.parentNode && elem.parentNode.nodeName.toLowerCase() != 'body') {
                    elem = elem.parentNode;
                    parents.push(elem);
                }
                let isParent = false;

                parents.forEach(item => {
                    if (item === selectCheckLayer)
                        isParent = true
                })
                if (!isParent && e.target != selectCheckLayer)
                    this.setState({ selectArea: false })
            }
        })
    }

    handleCheck = (e) => {
        let values = this.state.values
        let placeholder = this.state.placeholder
        if (e && e.target.value === "all") {
            if (values.length > 0) {
                values = []
                placeholder = []
            } else {
                let newPlaceholder = []
                let newValues = []
                this.props.field.options.map(o => {
                    newPlaceholder.push(o.control)
                    newValues.push(o.value)
                })
                values = newValues
                placeholder = newPlaceholder
            }

        } else {
            if (!placeholder.includes(e.target.name)) {
                placeholder.push(e.target.name)
                values.push(e.target.value)
            } else {
                let newPlaceholder = []
                let newValues = []
                placeholder.map(p => {
                    if (p !== e.target.name) {
                        newPlaceholder.push(p)
                    }
                })

                values.map(v => {
                    if (v !== e.target.value) {
                        newValues.push(v)
                    }
                })
                values = newValues
                placeholder = newPlaceholder
            }
        }

        this.props.validateFromClient(e.target, this.props.field.control)
        this.setState({ placeholder: placeholder, values: values })

    }

    showPlaceHolder = () => {
        let placeholder = this.state.placeholder
        let stringPlaceholder = ""
        placeholder.map(p => {
            if (stringPlaceholder === "") {
                stringPlaceholder += p
            } else {
                stringPlaceholder += `, ${p}`
            }

        })
        return stringPlaceholder
    }

    generateFormGroupSelect = () => {
        let all = [{ control: "Todos", value: "all" }]
        let options = all.concat(this.props.field.options)
        let names = this.state.placeholder
        return (
            <ul className="select-check-ul" >
                {options && options.map((option, index) => {
                    let check = names.includes(option.control)
                    if(option.value === "all"){
                        check = names.length === this.props.field.options.length
                    }
                    return <li style={{ listStyleType: "none", paddingInlineStart: "0px" }}>
                        <RenderCheckBox
                            check={check}
                            column={{ control: option.control }}
                            index={index}
                            disabled={false}
                            noTranslate={true}
                            value={option.value}
                            callbackFunction={this.handleCheck}
                        />
                    </li>
                })}
            </ul>);
    }


    render() {
        return (<>
            <Form.Group
                className={this.props.field.extraClass ? this.props.field.extraClass : ""}
                controlId={this.props.field.control}
                onClick={() => this.setState({ selectArea: true })}
            >
                <InputGroup>
                    <Form.Control readOnly data-validation-schema={this.props.field.validation} value={this.state.placeholder.length > 0 ? this.showPlaceHolder() : ""} as="input" className="input-select-check" placeholder={"Escolher opção"} />

                    <InputGroup.Prepend className={"input-select-check-prepend"}>
                        <RiArrowDownSLine />
                    </InputGroup.Prepend>
                </InputGroup>
                <input style={{ display: "none" }} value={this.state.values} id={this.props.field.control + "-values"} />
            </Form.Group>
            {this.state.selectArea &&
                <div style={{ position: 'relative' }}>
                    <div className={`checkbox-layer `} style={{ position: 'absolute', zIndex: "999" }}>
                        <div className={`card shadow  bg-white rounded ${this.props.field.overflowY ? " card-auto-overflow-y " : ""} ${this.props.field.selectClass ? `select-check-${this.props.field.selectClass}` : ""}`} id="selectCheckLayer">
                            {this.generateFormGroupSelect()}
                        </div>
                    </div>
                </div>}
        </>)
    }
}