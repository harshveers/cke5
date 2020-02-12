import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ManualSaveCommand from './manualsavecommand';
import checkIcon from '@ckeditor/ckeditor5-core/theme/icons/check.svg';
import cancelIcon from '@ckeditor/ckeditor5-core/theme/icons/cancel.svg';
import './theme.css';

export default class MathJaxUI extends Plugin {
    init() {
		const editor = this.editor;

		this._createToolbarButtons();

		this.editor.commands.add( 'manualSave', new ManualSaveCommand( this.editor ) );
	}

    _createToolbarButtons() {
        const editor = this.editor;
        const t = editor.t;
        
        editor.ui.componentFactory.add( 'manualSaveSaveButton', locale => {
            const command = editor.commands.get( 'manualSave' );
            const buttonView = new ButtonView( locale );

            buttonView.set( {
                label: t( 'Save and Close' ),
                withText: false,
				tooltip: true,
				icon: checkIcon,
				class: 'ck-button-manual-save ck-button-save'
            } );
            buttonView.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );
			this.listenTo( buttonView, 'execute', () => editor.execute( 'manualSave', true ) );
			
            return buttonView;
		} );
		
		editor.ui.componentFactory.add( 'manualSaveCancelButton', locale => {
            const command = editor.commands.get( 'manualSave' );
            const buttonView = new ButtonView( locale );

            buttonView.set( {
                label: t( 'Discard and Close' ),
                withText: false,
				tooltip: true,
				icon: cancelIcon,
				class: 'ck-button-manual-cancel ck-button-cancel'
            } );
            buttonView.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );
			this.listenTo( buttonView, 'execute', () => editor.execute( 'manualSave', false ) );
			
            return buttonView;
        } );
    }
}