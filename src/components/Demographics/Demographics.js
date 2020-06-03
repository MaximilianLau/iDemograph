import React from 'react';
import BoundingBox from './BoundingBox.js'
import DemoResults from './DemoResults.js'
import './Demographics.css'

const Demographics = ({imageUrl, boxAll, resultAll}) => {
    return (
        <div className='center ma demographicsWrapper'>
            <div className="absolute mt2">
                <img id="inputImage" src={imageUrl} alt=""/>
                {
                    boxAll.map((box, i) => {
                        return (
                            <BoundingBox
                                key={boxAll[i]}
                                top={boxAll[i].topRow}
                                right={boxAll[i].rightCol}
                                bottom={boxAll[i].bottomRow}
                                left={boxAll[i].leftCol}
                                i={i}
                            />
                        );
                    })
                }
            </div>
       <DemoResults resultAll={resultAll}/>
        </div>
    )
}

export default Demographics;