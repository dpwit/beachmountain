
import React from 'react';

function resetProduct() {
  	document.getElementById('productLogo').src='img/DPW_Skull_Logo_Mask.jpg';

	document.getElementById("eyesBlue").checked = false;
	document.getElementById("eyesGreen").checked = false;
	document.getElementById("eyesGrey").checked = false;
		
}

const Button = (props) => {
	//list multiple props here
	const { 
		type = 'button',
		onClick,
		children
	} = props

	return (
		<button type={type} onClick={onClick}>{children}</button>
		)
}

export default Button