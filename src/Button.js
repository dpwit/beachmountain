
import React from 'react';

function resetProduct() {
	var productImg = document.getElementById("productLogo").src;
  document.getElementById('productLogo').innerHTML = productImg;
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
