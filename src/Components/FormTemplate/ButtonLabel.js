import React from 'react';
export function CustomButtonNewOnLabel({onClick}) {
    return (
        <>
            <button
                className={"buttom-new-in-label"}
                onClick={onClick}
                type={"button"}
            >
                {`Novo`}
            </button>
        </>
    );
}