import View from '@ckeditor/ckeditor5-ui/src/view';
import ViewCollection from '@ckeditor/ckeditor5-ui/src/viewcollection';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import submitHandler from '@ckeditor/ckeditor5-ui/src/bindings/submithandler';
import FocusTracker from '@ckeditor/ckeditor5-utils/src/focustracker';
import FocusCycler from '@ckeditor/ckeditor5-ui/src/focuscycler';
import KeystrokeHandler from '@ckeditor/ckeditor5-utils/src/keystrokehandler';
import checkIcon from '@ckeditor/ckeditor5-core/theme/icons/check.svg';
import cancelIcon from '@ckeditor/ckeditor5-core/theme/icons/cancel.svg';
import previewIcon from '../../theme/preview.svg';
import '../../theme/mathjaxform.css';

import LabeledTextAreaView from './labeledtextareaview';

export default class MathJaxFormView extends View {
	constructor( locale ) {
		super( locale );

		const t = locale.t;

		this.focusTracker = new FocusTracker();
		this.keystrokes = new KeystrokeHandler();
		this.equationInputView = this._createEquationInput();
		this.saveButtonView = this._createButton( t( 'Save' ), checkIcon, 'ck-button-save' );
		this.saveButtonView.type = 'submit';
		this.cancelButtonView = this._createButton( t( 'Cancel' ), cancelIcon, 'ck-button-cancel', 'cancel' );
		// this.previewButtonView = this._createButton( t( 'Preview' ), previewIcon, 'ck-button-preview', 'preview' );
		this.children = this._createFormChildren();
		this._focusables = new ViewCollection();

		this._focusCycler = new FocusCycler( {
			focusables: this._focusables,
			focusTracker: this.focusTracker,
			keystrokeHandler: this.keystrokes,
			actions: {
				// Navigate form fields backwards using the Shift + Tab keystroke.
				focusPrevious: 'shift + tab',

				// Navigate form fields forwards using the Tab key.
				focusNext: 'tab'
			}
		} );

		const classList = [ 'ck', 'ck-equation-form', 'ck-link-form_layout-vertical' ];

		this.setTemplate( {
			tag: 'form',

			attributes: {
				class: classList,

				// https://github.com/ckeditor/ckeditor5-link/issues/90
				tabindex: '-1'
			},

			children: this.children
		} );
	}

	/**
	 * @inheritDoc
	 */
	render() {
		super.render();

		submitHandler( {
			view: this
		} );

		const childViews = [
			this.equationInputView,
			this.saveButtonView,
			this.cancelButtonView
		];

		childViews.forEach( v => {
			// Register the view as focusable.
			this._focusables.add( v );

			// Register the view in the focus tracker.
			this.focusTracker.add( v.element );
		} );

		// Start listening for the keystrokes coming from #element.
		this.keystrokes.listenTo( this.element );
	}

	focus() {
		this._focusCycler.focusFirst();
	}

	_createEquationInput() {
		const t = this.locale.t;

		const labeledInput = new LabeledTextAreaView( this.locale );

		labeledInput.inputView.extendTemplate({
			attributes: {
				rows: 5,
				cols: 50,
				style: 'resize: none'
			}
		});

		labeledInput.placeholder = "Put TeX Expression Here";
		labeledInput.label = 'TeX Expression';

		return labeledInput;
	}

	_createButton( label, icon, className, eventName ) {
		const button = new ButtonView( this.locale );

		button.set( {
			label,
			icon,
			tooltip: true
		} );

		button.extendTemplate( {
			attributes: {
				class: className
			}
		} );

		if ( eventName ) {
			button.delegate( 'execute' ).to( this, eventName );
		}

		return button;
	}

	_createFormChildren() {
		const children = this.createCollection();

		children.add( this.equationInputView );

		children.add( this.saveButtonView );
		// children.add( this.previewButtonView );
		children.add( this.cancelButtonView );

		return children;
	}
}