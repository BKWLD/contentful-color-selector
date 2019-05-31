import React from 'react'
export default function Radio (props) {
	return (
		<div className='radio'>
			<input type='radio' />
			<span className='name'>{ props.name }</span>
			{ props.color ? <span 
				className='swatch' 
				style={{ background: props.color }} /> : null }
		</div>
	)
}