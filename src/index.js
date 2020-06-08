
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

function resetProduct() {
  	document.getElementById('productLogo').src='img/DPW_Skull_Logo_Mask.jpg';

	document.getElementById("eyesBlue").checked = false;
	document.getElementById("eyesGreen").checked = false;
	document.getElementById("eyesGrey").checked = false;
		
}

render(<Button onClick={resetProduct}>Reset to original</Button>, rootElement)
