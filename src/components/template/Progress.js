import React from 'react'

function ProgressLoad({ text }) {
    return (
        <button className="btn btn-info" type="button" disabled>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
            {text}
        </button>


    )
}

export default ProgressLoad