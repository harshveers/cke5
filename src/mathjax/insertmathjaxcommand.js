import Command from '@ckeditor/ckeditor5-core/src/command';
const mathjax2 = require('mathjax-full/js/mathjax.js').mathjax;
const TeX = require('mathjax-full/js/input/tex.js').TeX;
const SVG = require('mathjax-full/js/output/svg.js').SVG;
const liteAdaptor = require('mathjax-full/js/adaptors/liteAdaptor.js').liteAdaptor;
const RegisterHTMLHandler = require('mathjax-full/js/handlers/html.js').RegisterHTMLHandler;
const AllPackages = require('mathjax-full/js/input/tex/AllPackages.js').AllPackages;

const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);

const tex = new TeX({
    packages: AllPackages.sort().join(', ').split(/\s*,\s*/)
});
const svg = new SVG();

export default class InsertMathJaxCommand extends Command {
    execute(mathExpression) {
        var mathJaxConfig = this.editor.config.get ( 'mathJax' );
        this.editor.model.change( writer => {
            const html = mathjax2.document('', {InputJax: tex, OutputJax: svg});
    
            const node = html.convert(mathExpression, {
                display: true
            });
            
            var innerHtml = adaptor.innerHTML(node);
            var svgContent = innerHtml.toString().replace(/xlink:xlink:href/g, "href");

            this.editor.model.insertContent( this.createMathJaxEquation( writer, mathExpression, 'tex', svgContent ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'mathJaxEquationWrapper' );

        this.isEnabled = allowedIn !== null;
    }

    createMathJaxEquation( writer, mathExpression, expressionType, svg ) {
        const mathJaxEquationWrapper = writer.createElement( 'mathJaxEquationWrapper', {
            style: 'vertical-align: -webkit-baseline-middle;',
            data_equation_type: expressionType,
            data_equation_value: mathExpression
        } );

        const mathJaxEquationSvg = writer.createElement( 'mathJaxEquationSvg', { 
            src: 'data:image/svg+xml;base64,' + window.btoa(svg),
            style: 'zoom: 1;'
        } );
        
        writer.append( mathJaxEquationSvg, mathJaxEquationWrapper );
    
        return mathJaxEquationWrapper;
    }
}
