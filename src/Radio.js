import React from 'react'
import { TextLink } from '@contentful/forma-36-react-components'

// Export compoent
export default function Radio (props) {
	return (
		<div className='radio'>
			<span className='description' onClick={() => props.onClick(props.name) }>
		
				{/* Radio input */}
				<input type='radio' checked={ props.checked } readOnly />
				
				{/* Color name */}
				<span className='name'>{ props.name }</span>
				
				{/* Color swatch */}
				{ props.color 
					? <span className='swatch' style={{ background: props.color }} /> 
					: null }
			</span>
				
			{/* Clear link */}
			{ props.checked 
				? <TextLink onClick={() => props.onClick()}>Clear</TextLink> 
				: null }
		</div>
	)
}