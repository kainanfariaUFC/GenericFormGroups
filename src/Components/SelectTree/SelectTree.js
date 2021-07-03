import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { TreeSelect } from 'antd';
import "./style.css"

// const treeData = [
//     {
//         title: 'Node1',
//         value: '0-0',
//         children: [
//             {
//                 title: 'Child Node1',
//                 value: '0-0-1',
//             },
//             {
//                 title: 'Child Node2',
//                 value: '0-0-2',
//             },
//         ],
//     },
//     {
//         title: 'Node2',
//         value: '0-1',
//     },
// ];

export default class SelectTree extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: undefined
        }
    }

    componentDidUpdate(){
        if(!this.state.value && this.props.entity[this.props.field.control]){
            this.setState({
                value: this.props.entity[this.props.field.control]
            })
        }
    }

    onChange = (value) => {
        if(this.props.field.onChange){
            this.props.field.onChange(value)
        }
        this.setState({ value });
    };

    render() {
        return (
            <div className="generic-select-tree">
                <TreeSelect
                    value={this.state.value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={this.props.field.options}
                    disabled={this.props.field.disabled}
                    placeholder={this.props.field.placeholder}
                    treeDefaultExpandAll
                    onChange={this.onChange}
                />
            </div>
        )
    }
}
