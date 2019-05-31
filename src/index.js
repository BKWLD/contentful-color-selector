// Reactness
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

// Contentful deps
import { init } from 'contentful-ui-extensions-sdk';

// Forma 36 components CSS
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';
import { 
	TextInput, 
	Button, 
	Dropdown, 
	DropdownList, 
	DropdownListItem 
} from '@contentful/forma-36-react-components';

// Create UI Extension component
class App extends React.Component {
	static propTypes = {
		sdk: PropTypes.object.isRequired,
	};

	detachExternalChangeHandler = null;

	constructor(props) {
		super(props);
		this.state = {
			open: false,
			value: props.sdk.field.getValue(),
		};
	}

	componentDidMount() {
		this.props.sdk.window.startAutoResizer();

		// Handler for external field value changes (e.g. when multiple authors are working on the same entry).
		this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(
			this.onExternalChange
		);
	}

	componentWillUnmount() {
		if (this.detachExternalChangeHandler) {
			this.detachExternalChangeHandler();
		}
	}

	onExternalChange = value => {
		this.setState({ value });
	};

	onChange = e => {
		const value = e.currentTarget.value;
		this.setState({ value });
		if (value) {
			this.props.sdk.field.setValue(value);
		} else {
			this.props.sdk.field.removeValue();
		}
	};

	render() {
		return (
			<div>
				<h1>Test</h1>
				<TextInput
					width="large"
					type="text"
					id="my-field"
					value={this.state.value}
					onChange={this.onChange}
				/>
			</div>
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
