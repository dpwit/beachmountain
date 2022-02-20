
import React from 'react'

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