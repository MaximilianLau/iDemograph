import React from 'react';
import './Logo.css'

const Logo = () => {
    return (
      <div className="ma4 mt0">
        <h1 className="tc f-subheadline white center">iDemograph</h1>
        <h2 className="tc f3 white center pt3 pb3">Place image URLs; the app will detect the people in the photos, and then guess their age, ethnic group, and sex</h2>
        <h3 className="tc f4 white center">*working on beta 2.0 with ability to upload photos, responsiveness</h3>
      </div>
    )
}

export default Logo;