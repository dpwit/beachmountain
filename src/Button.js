
import React from 'react';

const Button = (props) => {
	//list props here
	const { type = '' } = props
	
	return (
		<button type={type}>This is a button</button>
		)
}

export default Button