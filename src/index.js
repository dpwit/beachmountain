
//import React from 'react';
//import ReactDOM from 'react-dom';

//ReactDOM.render(
//	<h1>Hello World</h1>,
//	document.getElementById('app')
//	);

import React from 'react';
import { render } from 'react-dom';

render(
	<h1>Hello World</h1>,
	document.getElementById('app')
)

const name = 'Darren';
const element = <h1>Hello {name}</h1>;

render(
	element,
	document.getElementById('helloName')
	);