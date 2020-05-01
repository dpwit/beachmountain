
import React from 'react';

const Button = (props) => {
	//list multiple props here
	const { type = '',
	propTwo,
	propThree,
	propFour } = props

	return (
		<button type={type} propTwo={propTwo} propThree={propThree} propFour={propFour}>This is a button</button>
		)
}

function resetProduct() {
  document.getElementById('productLogo').src='img/DPW_Skull_Logo_Mask.jpg';
}

const resetProductAction = (
  <button onClick={resetProduct}>Reset to original</button>
);


export default Button