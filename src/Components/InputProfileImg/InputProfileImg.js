import React, { Component } from 'react';
import './style.css';
import { getImagem } from "../../../Tools/storageImageTools";

export default class InputProfileImg extends Component {
    constructor(props) {
        super(props)
        this.state = {
            icone : props.icone,
            adicionar : props.adicionar,
            imageToShow : null,
            imageToSend : null,
            isImageFromEntity : false,
            value : props.value,
            field : props.field
        };
    }

    handlerChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        this.getBase64(file);
    }

    setImage = (imagePath, imageFromEntity) => {
        this.setState({isImageFromEntity : imageFromEntity, imageToShow : imagePath, imageToSend : !imageFromEntity ? imagePath : ""});
    }

    getImageFromEntity() {
        if (!this.state.foto) {
            getImagem(this.props.value)
                .then((result) => {
                    this.setImage(result, true);
                });
        }
    }

    getBase64 = (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.setImage(reader.result, false);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    render() {
        if (this.props.value && !this.state.imageToShow) {
            this.getImageFromEntity();
        }
        if (this.state.icone && this.state.adicionar){
            return (
                <div className={"caixa-foto"}>
                    <img alt="" className={"foto"} id={"image_view"} src={this.state.imageToShow} />
                    {
                        !this.state.imageToShow ?
                            <div className={"icone-usuario"}>{ this.state.icone }</div>
                            :
                            <></>
                    }
                    <div className={"icone-camera"} onClick={() => {
                        document.getElementsByClassName("selecionar-arquivo")[0].click();
                    }}
                    >
                    <span >{ this.state.adicionar }
                        <input accept="image/*" className={"selecionar-arquivo"} onChange={this.handlerChange} style={{width: "8px", height: "8px", display: "none"}}  type="file" />
                        {
                            this.state.imageToSend ?
                                <input id={this.state.field.control} style={{width: "8px", height: "8px", display: "none"}}  value={this.state.imageToSend} />
                            :
                                <></>
                        }

                    </span>
                    </div>
                </div>
            )
        }

    }
}