import React from 'react'
import './Demographics.css';

const BoundingBox = ({ top, right, bottom, left, i }) => {
    console.log(i)
    const v = "styleBox"+i + " boundingBox";
    return (
        <div className={v} style={{ top, right, bottom, left }}>
            <p className="boundingNumber">{i}</p>
        </div>
    )
}

export default BoundingBox