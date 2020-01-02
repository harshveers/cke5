import Command from '@ckeditor/ckeditor5-core/src/command';
const mathjax2 = require('mathjax-full/js/mathjax.js').mathjax;
const TeX = require('mathjax-full/js/input/tex.js').TeX;
const SVG = require('mathjax-full/js/output/svg.js').SVG;
const liteAdaptor = require('mathjax-full/js/adaptors/liteAdaptor.js').liteAdaptor;
const RegisterHTMLHandler = require('mathjax-full/js/handlers/html.js').RegisterHTMLHandler;
const AllPackages = require('mathjax-full/js/input/tex/AllPackages.js').AllPackages;

export default class InsertMathJaxCommand extends Command {
    execute(mathExpression) {
        var mathJaxConfig = this.editor.config.get ( 'mathJax' );
        this.editor.model.change( writer => {

            class myLiteAdaptor extends liteAdaptor {
                setAttribute(node, name, value, ns) {
                  if (ns) name = name.replace(/^.*:/, '');
                  return super.setAttribute(node, name, value, ns);
                }
              }
    
            const adaptor = new myLiteAdaptor();
            RegisterHTMLHandler(adaptor);
    
            const tex = new TeX({
                packages: AllPackages.sort().join(', ').split(/\s*,\s*/)
            });
            const svg = new SVG();
            console.log(mathjax2);
            const html = mathjax2.document('', {InputJax: tex, OutputJax: svg});
    
            const node = html.convert(mathExpression, {
                display: false
            });
            
            var outerHtml = adaptor.innerHTML(node);
            console.log(outerHtml);
            console.log(outerHtml.toString().replace(/xlink:xlink:href/g, "href"));

            this.editor.model.insertContent( this.createSimpleBox( writer ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'simpleBox' );

        this.isEnabled = allowedIn !== null;
    }

    createSimpleBox( writer ) {
        const simpleBox = writer.createElement( 'simpleBox' );
        const simpleBoxTitle = writer.createElement( 'simpleBoxTitle' );
        const simpleBoxDescription = writer.createElement( 'simpleBoxDescription' );
    
        writer.append( simpleBoxTitle, simpleBox );
        writer.append( simpleBoxDescription, simpleBox );
    
        // There must be at least one paragraph for the description to be editable.
        // See https://github.com/ckeditor/ckeditor5/issues/1464.
        writer.appendElement( 'paragraph', simpleBoxDescription );
    
        return simpleBox;
    }
}
