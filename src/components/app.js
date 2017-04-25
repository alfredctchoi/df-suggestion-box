import React from 'react'
import Row from './row'
import Column from './column'

const App = () => (
	<div className="container">
		<Row className="text-center">
      <Column cols={6} offset={3}>
        <h1>DF Suggestion Box</h1>
      </Column>
		</Row>
    <Row>
      <Column cols={6} offset={3} className="text-center">
        <p>Enter your suggestion box id below.</p>
      </Column>
    </Row>
    <Row>
      <Column cols={6} offset={3} className="text-center">
        <input type="text" className="form-control" placeholder="Box Identifier"/>
      </Column>
    </Row>
	</div>
);

export default App