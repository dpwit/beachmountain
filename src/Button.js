
import React from 'react';

function resetProduct() {
  document.getElementById('productLogo').src='../img/DPW_Skull_Logo_Mask.jpg';
}

const Button = (props) => {
	//list multiple props here
	const { type = '',
	onClick,
	propThree,
	propFour } = props

	return (
		<button type={type} onClick={resetProduct} propThree={propThree} propFour={propFour}>Reset to original</button>
		)
}

export default Button