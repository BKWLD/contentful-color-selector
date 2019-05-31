// Reactness
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

// Contentful deps
import { init } from 'contentful-ui-extensions-sdk';

// Forma 36 components
import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss/dist/styles.css'
import '@contentful/forma-36-fcss/dist/styles.css'
import './index.css';
import { FieldGroup } from '@contentful/forma-36-react-components';

// Custom components
import Radio from './Radio'

// Create UI Extension component
class ColorSelector extends React.Component {
	static propTypes = {
		sdk: PropTypes.object.isRequired,
	};

	detachExternalChangeHandler = null;

	constructor(props) {
		super(props);
		
		// Check for colors to be defined
		let colors = props.sdk.parameters.installation.colors
		if (!colors) {
			return props.sdk.notifier.error(`Colors parameter is empty.  This needs to be set 
				in the UI Extension Settings for the Color Selector.`)
		}
		
		// Check if colors is valid JSON
		try {
			colors = JSON.parse(colors)
		} catch (e) {
			return props.sdk.notifier.error('The Color Selector "Colors" setting does not contain valid JSON.')
		}
		
		// Set initial state
		this.state = {
			colors: colors,
			value: props.sdk.field.getValue(),
		};
	}

	// On mount
	componentDidMount() {
		this.props.sdk.window.startAutoResizer();

		// Handler for external field value changes (e.g. when multiple authors are working on the same entry).
		this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(
			this.onExternalChange
		);
	}

	// On onmount
	componentWillUnmount() {
		if (this.detachExternalChangeHandler) {
			this.detachExternalChangeHandler();
		}
	}

	// Hadle external chages, like from other editors
	onExternalChange = value => {
		this.setState({ value });
	};

	// Handle choices in the radio fields
	onChange = e => {
		const value = e.currentTarget.value;
		this.setState({ value });
		if (value) {
			this.props.sdk.field.setValue(value);
		} else {
			this.props.sdk.field.removeValue();
		}
	};

/*
		{/*
			
		<RadioButtonField
			id='null'
			labelText='None'
			checked={!this.state.value}
			labelIsLight={true}
			onChange={this.onChange}
		/>
		

					
					<RadioButtonField
						key={name}
						id={name}
		        labelText={name + <div class='swatch'></div>}
		        checked={this.state.value == name}
		        value={name}
						labelIsLight={true}
		        onChange={this.onChange}
		      />
			
*/
	// Generate the list of radio fields
	render() {
		return (
			<FieldGroup>
				<Radio name='None' />
				{ Object.entries(this.state.colors).map(([name, color]) => (
					<Radio 
						key={name}
						name={name}
						color={color}
						/>
				))}
	    </FieldGroup>
		)
	}
}

init(sdk => {
	ReactDOM.render(<ColorSelector sdk={sdk} />, document.getElementById('root'));
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
