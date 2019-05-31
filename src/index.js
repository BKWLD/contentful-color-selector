// Reactness
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

// Contentful deps
import { init } from 'contentful-ui-extensions-sdk';

// Forma 36 components
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';
import { 
	FieldGroup,
	RadioButtonField, 
} from '@contentful/forma-36-react-components';

// Create UI Extension component
class App extends React.Component {
	static propTypes = {
		sdk: PropTypes.object.isRequired,
	};

	detachExternalChangeHandler = null;

	constructor(props) {
		super(props);
		console.log(props.sdk.parameters.installation);
		
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
		this.props.sdk.field.setValue(value);
	};

	// Generate the list of radio fields
	render() {
		return (
			<FieldGroup>
	      <RadioButtonField
	        labelText={'Color 1'}
	        checked={this.state.value == 'yes'}
	        value="yes"
					labelIsLight={true}
	        onChange={this.onChange}
	        id="termsCheckbox"
	      />
	      <RadioButtonField
	        labelText={'Color 2'}
	        value="no"
	        checked={this.state.value == 'no'}
					labelIsLight={true}
	        onChange={this.onChange}
	        id="termsCheckboxOption2"
	      />
	    </FieldGroup>
		);
	}
}

init(sdk => {
	ReactDOM.render(<App sdk={sdk} />, document.getElementById('root'));
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
