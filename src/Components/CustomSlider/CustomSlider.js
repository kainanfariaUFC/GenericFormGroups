import React, { Component } from "react";
import Slider from "@material-ui/core/Slider";
import "./CustomSlider.css"
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { getMessage } from "../../../Tools/messageHandler"

let context = null
export default class CustomSlider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showTooltip: true,
            returnObject: {}
        }
        context = this
    }

    prepareValues = (arra) => {
        let returnObject = this.state.returnObject
        // let obj = {}
        // for(let i = 0; i < arra.length ; i++){
        //     obj[this.props.tooltiplesLabels[i].id] = arra[i]
        // }
        if(!returnObject[this.props.name] || returnObject[this.props.name] !== arra){
            returnObject[this.props.name] = arra
            context.setState({returnObject: returnObject}, ()=> {
                if(this.props.setData){
                    this.props.setData(returnObject)
                }
            })
        }
    }
    

    render() {
        if(this.props.tooltiplesLabels && this.props.marks && this.props.values && this.props.tooltiplesLabels.length){
            return (
                <div className="slider-generics">
                   <div className="slide-label"> <span>{getMessage(`label.${this.props.buttonLabel}`)}</span> <div>{ this.state.showTooltip ? <FaEye className="on-custom-slider-tooltip" onClick={() =>this.setState({showTooltip: false})}/> : <FaEyeSlash  className="off-custom-slider-tooltip" onClick={() => this.setState({showTooltip: true})} /> }</div> </div>
                    <Slider
                        track={false}
                        id={"akasjbda"}
                        aria-labelledby="track-false-range-slider"
                        defaultValue={this.props.values ? this.props.values : [20, 30, 50]}
                        marks={this.props.marks}
                        valueLabelDisplay={this.state.showTooltip ? "on" : "off"}
                        scale={this.props.scale ? this.props.scale : (x) => x}
                        getAriaValueText={(_, index) => this.props.tooltiplesLabels[index].id}
                        step={this.props.step ? this.props.step : 10}
                        valueLabelFormat={(x,index) =>  <div className={"slider-generics-label"}> <span className="label-type-spliders"> {`${(this.props.tooltiplesLabels[index][this.props.showOption])}:`} </span>  {`até ${`${x} ${this.props.unity}`}`} </div>}
                        onChange={(_, values) => {this.prepareValues(values)}}
                    />
                </div>
            )
        }
        return null
        
    }
}

export function getObjectValues(){
    if(context){
        return context.state.returnObject
    }
}