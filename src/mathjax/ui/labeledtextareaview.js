import View from '@ckeditor/ckeditor5-ui/src/view';
import uid from '@ckeditor/ckeditor5-utils/src/uid';
import LabelView from '@ckeditor/ckeditor5-ui/src/label/labelview';

import TextAreaView from './textareaview';

export default class LabeledTextAreaView extends View {
	constructor( locale ) {
		super( locale );

		const inputUid = `ck-input-${ uid() }`;
		const statusUid = `ck-status-${ uid() }`;

        this.set( 'label' );
        this.set( 'placeholder' );
		this.set( 'value' );
		this.set( 'isReadOnly', false );
		this.set( 'errorText', null );
		this.set( 'infoText', null );

		this.labelView = this._createLabelView( inputUid );
		this.inputView = this._createInputView( inputUid, statusUid );
		this.statusView = this._createStatusView( statusUid );

		this.bind( '_statusText' ).to(
			this, 'errorText',
			this, 'infoText',
			( errorText, infoText ) => errorText || infoText
		);

		const bind = this.bindTemplate;

		this.setTemplate( {
			tag: 'div',
			attributes: {
				class: [
					'ck',
					'ck-labeled-input',
					bind.if( 'isReadOnly', 'ck-disabled' )
				]
			},
			children: [
				this.labelView,
				this.inputView,
				this.statusView
			]
		} );
	}

	_createLabelView( id ) {
		const labelView = new LabelView( this.locale );

		labelView.for = id;
		labelView.bind( 'text' ).to( this, 'label' );

		return labelView;
	}

	_createInputView( inputUid, statusUid ) {
		const inputView = new TextAreaView( this.locale, statusUid );

		inputView.id = inputUid;
		inputView.ariaDescribedById = statusUid;
		inputView.bind( 'value' ).to( this );
        inputView.bind( 'isReadOnly' ).to( this );
        inputView.bind( 'placeholder' ).to( this, 'placeholder' );
		inputView.bind( 'hasError' ).to( this, 'errorText', value => !!value );

		inputView.on( 'input', () => {
			// UX: Make the error text disappear and disable the error indicator as the user
			// starts fixing the errors.
			this.errorText = null;
		} );

		return inputView;
	}

	_createStatusView( statusUid ) {
		const statusView = new View( this.locale );
		const bind = this.bindTemplate;

		statusView.setTemplate( {
			tag: 'div',
			attributes: {
				class: [
					'ck',
					'ck-labeled-input__status',
					bind.if( 'errorText', 'ck-labeled-input__status_error' ),
					bind.if( '_statusText', 'ck-hidden', value => !value )
				],
				id: statusUid,
				role: bind.if( 'errorText', 'alert' )
			},
			children: [
				{
					text: bind.to( '_statusText' )
				}
			]
		} );

		return statusView;
	}

	select() {
		this.inputView.select();
	}

	focus() {
		this.inputView.focus();
	}
}
