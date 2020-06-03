import React from 'react'
import './Demographics.css';

const DemoResults = ({ resultAll }) => {
    if (resultAll) {
    return (
        <div className="demographicGrid">
            { resultAll.map((data, i) => {
                const v = 'style'+i+ " demographicResults";
                    return (
                        <div className={v}>
                            <p> {(() => {
                                switch (data.demograph.name) {
                                    case "hispanic, latino, or spanish origin": return `Latino / Spanish`;
                                    case "black or african american": return `black / AA`;
                                    default: return data.demograph.name;
                                }
                            })()} : {(data.demograph.value * 100).toFixed(2)}%</p>
                            <p><span>{data.age.name}</span> y/o : {(data.age.value * 100).toFixed(2)}%</p>
                            <p><span>{data.sex.name}</span> : {(data.sex.value * 100).toFixed(2)}%</p>
                        </div>
                    )
                })
            }
        </div>
    )
} else {
    return (
        <div>
            <p></p>
        </div>
    )
}
}
export default DemoResults;