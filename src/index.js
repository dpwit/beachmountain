
//import React from 'react';
//import ReactDOM from 'react-dom';

//ReactDOM.render(
//	<h1>Hello World</h1>,
//	document.getElementById('app')
//	);

import React from 'react';
import { render } from 'react-dom';

import Button from './Button';

const rootElement = document.getElementById('appButton')

render(<Button>Reset to original</Button>, rootElement)
