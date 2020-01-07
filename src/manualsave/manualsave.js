import ManualSaveUI from './manualsaveui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class ManualSave extends Plugin {
    static get requires() {
        return [ ManualSaveUI ];
    }
}