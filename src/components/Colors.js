import React from 'react'

const Colors = () => ([
  <section key="section1" className="section">
    <h2>Colors</h2>
    Preview the colors using in <code>Helenae.scss</code>
  </section>,
  <section key="section2" className="section">
    <div className="columns">
      { new Array(7).fill('').map((_, idx) => <div key={idx} className="color"></div>) }
    </div>
    <p>
      More description about how to use... <br/>
      更多关于使用场景的描述
    </p>
  </section>
])

export default Colors
