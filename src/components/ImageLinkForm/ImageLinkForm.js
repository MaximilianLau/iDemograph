import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <div className="center">
                <div className="form center pa4 br3">
                    <input placeholder="Place Image URL HERE" className="f3 pa2 w-70 center" type="text" onChange={onInputChange} />
                    <button className="f4 w-30 grow link ph3 pv2 dib white buttonBackground" onClick={onButtonSubmit}>ANALYZE</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;