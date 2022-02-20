
import React from 'react'
import Button from './Button'

const Reset = () => {

function resetProduct() {
  	document.getElementById('productLogo').src='dist/img/DPW_Skull_Logo_Mask.jpg';

	document.getElementById("eyesBlue").checked = false;
	document.getElementById("eyesGreen").checked = false;
	document.getElementById("eyesGrey").checked = false;
		
}

return (
	<Button onClick={resetProduct}>Reset to original</Button>
	);
}


export default Reset