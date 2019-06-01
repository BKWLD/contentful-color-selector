import React from 'react'
import { TextLink, Tooltip } from '@contentful/forma-36-react-components'

// Export compoent
export default function Radio (props) {
	return (
		<div className='radio'>
			<Tooltip place='right' content={ props.color }>
				<span className='description' onClick={() => props.onClick(props.name) }>
			
					{/* Radio input */}
					<input type='radio' checked={ props.checked } readOnly />
					
					{/* Color name */}
					<span className='name'>{ props.name }</span>
					
					{/* Color swatch */}
					<span className='swatch' style={{ background: props.color }}/>
			
				</span>
			</Tooltip>
				
			{/* Clear link */}
			{ props.checked 
				? <TextLink 
					className='clear' 
					onClick={() => props.onClick()}>
						Clear
					</TextLink> 
				: null }
		</div>
	)
}