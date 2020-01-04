import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import InsertMathJaxCommand from './insertmathjaxcommand';

export default class MathJaxEditing extends Plugin {
    static get requires() {
        return [ Widget ];
    }
    
    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add( 'insertMathJax', new InsertMathJaxCommand( this.editor ) );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'mathJaxEquationWrapper', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,

            // The placeholder will act as an inline node:
            isInline: true,

            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$text',

            allowAttributes: [ 'style', 'data_equation_type', 'data_equation_value' ]

            // Allowed Attributes
            // allowAttributes: [  ]
        } );

        schema.register( 'mathJaxEquationSvg', {
            isLimit: true,

            //isObject: true,

            allowIn: 'mathJaxEquationWrapper',

            allowAttributes: [ 'src', 'alt', 'style' ]
        } );
    }

    _defineConverters() {
        const conversion = this.editor.conversion;

        // <mathJaxEquationWrapper> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'mathJaxEquationWrapper',
            view: {
                name: 'span',
                classes: 'mathjax-equation-wrapper'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'mathJaxEquationWrapper',
            view: {
                name: 'span',
                classes: 'mathjax-equation-wrapper'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'mathJaxEquationWrapper',
            view: ( modelElement, viewWriter ) => {
                const span = viewWriter.createContainerElement( 'span', { class: 'mathjax-equation-wrapper' } );
                viewWriter.setAttribute('style', modelElement.getAttribute('style'), span);
                viewWriter.setAttribute('data_equation_type', modelElement.getAttribute('data_equation_type'), span);
                viewWriter.setAttribute('data_equation_value', modelElement.getAttribute('data_equation_value'), span);
                return toWidget( span, viewWriter, { label: 'mathJaxEquationWidget' } );
            }
        } );

        // <mathJaxEquationSvg> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'mathJaxEquationSvg',
            view: {
                name: 'img',
                classes: 'mathjax-equation-svg'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'mathJaxEquationSvg',
            view: {
                name: 'img',
                classes: 'mathjax-equation-svg'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'mathJaxEquationSvg',
            view: ( modelElement, viewWriter ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const svg = viewWriter.createEmptyElement( 'img', { class: 'mathjax-equation-svg' } );
                viewWriter.setAttribute('src', modelElement.getAttribute('src'), svg);
                viewWriter.setAttribute('style', modelElement.getAttribute('style'), svg);
                return toWidgetEditable( svg, viewWriter );
            }
        } );
    }
}