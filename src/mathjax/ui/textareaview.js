import View from '@ckeditor/ckeditor5-ui/src/view';

export default class TextAreaView extends View {
    constructor( locale ) {
        super( locale );

        /**
		 * The value of the input.
		 *
		 * @observable
		 * @member {String} #value
		 */
		this.set( 'value' );

		/**
		 * The `id` attribute of the textarea (i.e. to pair with a `<label>` element).
		 *
		 * @observable
		 * @member {String} #id
		 */
		this.set( 'id' );

		/**
		 * The `placeholder` attribute of the textarea.
		 *
		 * @observable
		 * @member {String} #placeholder
		 */
		this.set( 'placeholder' );

		/**
		 * Controls whether the textarea view is in read-only mode.
		 *
		 * @observable
		 * @member {Boolean} #isReadOnly
		 */
		this.set( 'isReadOnly', false );

		/**
		 * Set to `true` when the field has some error. Usually controlled via
		 * {@link module:ui/labeledinput/labeledinputview~LabeledInputView#errorText}.
		 *
		 * @observable
		 * @member {Boolean} #hasError
		 */
		this.set( 'hasError', false );

		/**
		 * The `id` of the element describing this field, e.g. when it has
		 * some error, it helps screen readers read the error text.
		 *
		 * @observable
		 * @member {Boolean} #ariaDescribedById
		 */
		this.set( 'ariaDescribedById' );

		const bind = this.bindTemplate;

        this.setTemplate( {
            tag: 'textarea',
            attributes: {
                class: [
					'ck',
					'ck-input',
					'ck-input-text',
					bind.if( 'hasError', 'ck-error' )
				],
                id: bind.to( 'id' ),
				placeholder: bind.to( 'placeholder' ),
				readonly: bind.to( 'isReadOnly' ),
				'aria-invalid': bind.if( 'hasError', true ),
				'aria-describedby': bind.to( 'ariaDescribedById' )
            },
            on: {
                // DOM keydown events will fire the view#input event.
                keydown: bind.to( 'input' )
            }
        } );
    }

    /**
	 * @inheritDoc
	 */
	render() {
		super.render();

		const setValue = value => {
			this.element.value = ( !value && value !== 0 ) ? '' : value;
		};

		setValue( this.value );

		// Bind `this.value` to the DOM element's value.
		// We cannot use `value` DOM attribute because removing it on Edge does not clear the DOM element's value property.
		this.on( 'change:value', ( evt, name, value ) => {
			setValue( value );
		} );
	}

    /**
	 * Moves the focus to the textarea and selects the value.
	 */
	select() {
		this.element.select();
	}

	/**
	 * Focuses the textarea.
	 */
	focus() {
		this.element.focus();
	}
}