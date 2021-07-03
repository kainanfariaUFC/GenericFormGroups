import React, { Component } from "react"
import "./InputFile.css"
import { FaUpload } from "react-icons/fa"
import { getMessage } from "../../../Tools/messageHandler"
import Storage from "@aws-amplify/storage";

export default class InputFile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imageToShow: null,
            imageToSend: null,
            isImageFromEntity: false,
            filename: getMessage("label.chooseFile"),
            signedURL: null
        }
    }

    async componentDidMount() {
        const signedURL = await Storage.get(`${this.props.entity[this.props.field.control]}`)
        this.setState({
            imageToSend: this.props.entity[this.props.field.control],
            filename: this.props.entity["filename"] ? this.props.entity["filename"] : getMessage("label.chooseFile"),
            signedURL: signedURL
        })
    }

    handlerChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        this.getBase64(file);
    }

    setImage = (imagePath, imageFromEntity, filename) => {
        this.setState({ isImageFromEntity: imageFromEntity, imageToShow: imagePath, imageToSend: !imageFromEntity ? imagePath : "", filename: filename });
    }

    getBase64 = (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.setImage(reader.result, false, file.name);
        };
        reader.onerror = function (error) {
            console.error('Error: ', error);
        };
    }

    render() {
        return (
            <>
                <div className="button-wrap">
                   {!this.props.ShowJustlink && <>
                        <div className="container-upload-field">
                            <input class="new-button-value" type="text" id="id-button-upload" disabled value={this.state.filename} />
                            <label class="new-button" for="upload"> <FaUpload /> {getMessage("label.upload")} </label>
                        </div>

                        <input id="upload" type="file" onChange={this.handlerChange} style={{ width: "8px", height: "8px", display: "none" }} />
                        {
                            this.state.imageToSend ?
                                <input id={this.props.field.control} style={{ width: "8px", height: "8px", display: "none" }} value={this.state.imageToSend} />
                                :
                                <></>
                        }
                    </>}
                    {this.props.entity[this.props.field.control] && <a href={this.state.signedURL} download={this.state.filename} target="_blank" >{getMessage("label.visualize")}</a>}
                </div>
            </>
        )
    }
}
