import MathJaxEditing from './mathjaxediting';
import MathJaxUI from './mathjaxui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class MathJax extends Plugin {
    static get requires() {
        return [ MathJaxEditing, MathJaxUI ];
    }
}