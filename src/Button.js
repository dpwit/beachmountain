
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
		onClick = resetProduct
	} = props

	return (
		<button type={type} onClick={onClick} propThree={propThree} propFour={propFour}>Reset to original</button>
		)
}

export default Button