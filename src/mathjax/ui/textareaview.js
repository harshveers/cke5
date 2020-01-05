import View from '@ckeditor/ckeditor5-ui/src/view';

export default class TextAreaView extends View {
    constructor( locale ) {
        super( locale );

		this.set( 'value' );
		this.set( 'id' );
		this.set( 'placeholder' );
		this.set( 'isReadOnly', false );
		this.set( 'hasError', false );
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

	select() {
		this.element.select();
	}

	focus() {
		this.element.focus();
	}
}