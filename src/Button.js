
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

export default Button