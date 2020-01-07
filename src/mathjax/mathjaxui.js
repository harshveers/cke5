import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ClickObserver from '@ckeditor/ckeditor5-engine/src/view/observer/clickobserver';
import ContextualBalloon from '@ckeditor/ckeditor5-ui/src/panel/balloon/contextualballoon';
import clickOutsideHandler from '@ckeditor/ckeditor5-ui/src/bindings/clickoutsidehandler';
import MathJaxFormView from './ui/mathjaxformview';
import functionIcon from '../theme/function.svg';

export default class MathJaxUI extends Plugin {
    static get requires() {
		return [ ContextualBalloon ];
	}
    
    init() {
		const editor = this.editor;
		
		this.originalSelection = null;

        editor.editing.view.addObserver( ClickObserver );

        this.formView = this._createFormView();

        this._balloon = editor.plugins.get( ContextualBalloon );

		this._createToolbarLinkButton();
		
		this._setupMathJaxBaloonInteraction();
	}
	
	_setupMathJaxBaloonInteraction() {
		const viewDocument = this.editor.editing.view.document;

		// Handle click on view document and show panel when selection is placed inside the link element.
		// Keep panel open until selection will be inside the same link element.
		this.listenTo( viewDocument, 'click', () => {
			const equationSelection = this._getSelectedEquationWrapperElement();

			// if (this._isFormInPanel) {
			// 	console.log(this.originalSelection);
			// 	this.editor.editing.view.document.selection = this.originalSelection;
			// 	this.editor.model.change( writer => {
			// 		writer.setSelection(this.originalSelection.getFirstRange());
			// 	});
			// 	return;
			// }

			if (this.editor.isReadOnly) {
				return;
			}

			if (this.editor.commands.get( 'insertMathJax' ).isEnabled) {
				if ( equationSelection || this._isFormInPanel ) {
					// Then show panel but keep focus inside editor editable.
					this._showUI();
				}
			} else {
				if (this._isFormInPanel) {
					this._closeFormView();
				}
			}
			
		} );

		// Close on click outside of balloon panel element.
		// clickOutsideHandler( {
		// 	emitter: this.formView,
		// 	activator: () => this._isFormInPanel,
		// 	contextElements: [ this._balloon.view.element ],
		// 	callback: () => this._closeFormView()
		// } );
	}

	_getSelectedEquationWrapperElement() {
		const view = this.editor.editing.view;
		const selection = view.document.selection;

		if ( !selection.isCollapsed ) {
			const selectedElement = selection.getSelectedElement();
			if (selectedElement && selectedElement.getCustomProperty( 'widget' ) && selectedElement.getCustomProperty( 'widgetLabel' ) == 'mathJaxEquationWidget') {
				return selection;
			}
		}
		return null;
	}

    _createToolbarLinkButton() {
        const editor = this.editor;
        const t = editor.t;
        
        // The "simpleBox" button must be registered among the UI components of the editor
        // to be displayed in the toolbar.
        editor.ui.componentFactory.add( 'mathJax', locale => {
            // The state of the button will be bound to the widget command.
            const command = editor.commands.get( 'insertMathJax' );

            // The button will be an instance of ButtonView.
            const buttonView = new ButtonView( locale );

            buttonView.set( {
                // The t() function helps localize the editor. All strings enclosed in t() can be
                // translated and change when the language of the editor changes.
                label: t( 'Equation Editor' ),
                withText: false,
				tooltip: true,
				icon: functionIcon
            } );

            // Bind the state of the button to the command.
            buttonView.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

            // Execute the command when the button is clicked (executed).
            // this.listenTo( buttonView, 'execute', () => editor.execute( 'insertMathJax' ) );
            this.listenTo( buttonView, 'execute', () => this._showUI() );

            return buttonView;
        } );
    }

    _showUI(forceVisible = false) {
        // Be sure panel with link is visible.
        if ( forceVisible ) {
            this._balloon.showStack( 'main' );
        }

        this._addFormView();
    }

    _addFormView() {
		const editor = this.editor;
		const mathJaxCommand = editor.commands.get( 'insertMathJax' );

		if ( this._isFormInPanel ) {
			this._balloon.updatePosition(this._getBalloonPositionData());
		} else {
			this._balloon.add( {
				view: this.formView,
				position: this._getBalloonPositionData()
			} );
			this.originalSelection = this.editor.editing.view.document.selection;
		}

		// Select input when form view is currently visible.
		//if ( this._balloon.visibleView === this.formView ) {
		//	this.formView.equationInputView.select();
		//}

		this.formView.equationInputView.select();

		// Make sure that each time the panel shows up, the URL field remains in sync with the value of
		// the command. If the user typed in the input, then canceled the balloon (`equationInputView#value` stays
		// unaltered) and re-opened it without changing the value of the link command (e.g. because they
		// clicked the same link), they would see the old value instead of the actual value of the command.
		// https://github.com/ckeditor/ckeditor5-link/issues/78
		// https://github.com/ckeditor/ckeditor5-link/issues/123
		this.formView.equationInputView.inputView.element.value = mathJaxCommand.value || '';
    }
    
    _getBalloonPositionData() {
		const view = this.editor.editing.view;
		const viewDocument = view.document;
		const targetLink = null; // this._getSelectedLinkElement();

		const target = targetLink ?
			// When selection is inside link element, then attach panel to this element.
			view.domConverter.mapViewToDom( targetLink ) :
			// Otherwise attach panel to the selection.
			view.domConverter.viewRangeToDom( viewDocument.selection.getFirstRange() );

		return { target };
	}

    _createFormView() {
		const editor = this.editor;
		const mathJaxCommand = editor.commands.get( 'insertMathJax' );

		const formView = new MathJaxFormView( editor.locale );

		// formView.equationInputView.bind( 'value' ).to( mathJaxCommand, 'value' );

		// Form elements should be read-only when corresponding commands are disabled.
		formView.equationInputView.bind( 'isReadOnly' ).to( mathJaxCommand, 'isEnabled', value => !value );
		formView.saveButtonView.bind( 'isEnabled' ).to( mathJaxCommand );

		// Execute link command after clicking the "Save" button.
		this.listenTo( formView, 'submit', () => {
            // editor.execute( 'insertMathJax', formView.equationInputView.inputView.element.value, formView.getDecoratorSwitchesState() );
            editor.execute( 'insertMathJax', formView.equationInputView.inputView.element.value );
			this._closeFormView();
		} );

		// Hide the panel after clicking the "Cancel" button.
		this.listenTo( formView, 'cancel', () => {
			this._closeFormView();
		} );

		// Close the panel on esc key press when the **form has focus**.
		formView.keystrokes.set( 'Esc', ( data, cancel ) => {
			this._closeFormView();
			cancel();
		} );

		return formView;
    }
    
    _closeFormView() {        
        this._removeFormView();
    }
    
    _removeFormView() {
		if ( this._isFormInPanel ) {
            const editor = this.editor;

		    this.stopListening( editor.ui, 'update' );
            this.stopListening( this._balloon, 'change:visibleView' );
        
			// Blur the input element before removing it from DOM to prevent issues in some browsers.
			// See https://github.com/ckeditor/ckeditor5/issues/1501.
			this.formView.saveButtonView.focus();

			this._balloon.remove( this.formView );

			// Because the form has an input which has focus, the focus must be brought back
			// to the editor. Otherwise, it would be lost.
			this.editor.editing.view.focus();
		}
    }

    get _isFormInPanel() {
		return this._balloon.hasView( this.formView );
	}
}