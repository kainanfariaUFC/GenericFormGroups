import React, {useEffect, useState} from "react"
import "./CheckBox.css"

export default function RenderCheckBox({column, check, index=null, callbackFunction=null, disabled=false, noLabel=false, extraClass=null, noTranslate=false, value=null}) {
    const [stateCheck, setStateCheck] = useState(false);

    useEffect(() => {
        setStateCheck(check)
    }, [check]);

    function handleClick(e) {
        setStateCheck(e.target.checked);
        if(callbackFunction){
            callbackFunction(e)
        }
    }

    return (
        <label className={`checkbox bounce ${noLabel ? "checkbox-nolabel" : ""}`}>
            <input
                checked={stateCheck}
                className={`checkbox bounce checkbox-check_${extraClass ? `${extraClass}_${index}` : index}`}
                defaultChecked={check}
                disabled={disabled}
                id={`form-basic-checkbox-check_${extraClass ? `${extraClass}_${index}` : index}`}
                name={column['control']}
                onChange={handleClick}
                type="checkbox"
                value={value}
            />
            <svg viewBox="0 0 21 21">
                <polyline points="5 10.75 8.5 14.25 16 6" />
                {/* <polyline points="6 10 15 10 10 10" style={{strokeWidth: "4px"}}></polyline> */}
            </svg>
            {!noLabel && <label className={`generic-checkbox-label`} htmlFor={`form-basic-checkbox-check_${index}`}> {noTranslate ? column["control"] : column['control'] }</label>}
        </label>
    )
}
