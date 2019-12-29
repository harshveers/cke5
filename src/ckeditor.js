/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import InlineEditorBase from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor';
import DocumentEditorBase from '@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor';

import PendingActions from '@ckeditor/ckeditor5-core/src/pendingactions';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Autosave from '@ckeditor/ckeditor5-autosave/src/autosave';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
import Font from '@ckeditor/ckeditor5-font/src/font';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Title from '@ckeditor/ckeditor5-heading/src/title';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import TodoList from '@ckeditor/ckeditor5-list/src/todolist';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';

import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';

class ClassicEditor extends ClassicEditorBase {}
class InlineEditor extends InlineEditorBase {}
class DocumentEditor extends DocumentEditorBase {}

const plugins = [
	Essentials,
	PasteFromOffice,
	Title,
	UploadAdapter,
	Autoformat,
	Autosave,
	PendingActions,
	Bold,
	Italic,
	Underline,
	Strikethrough,
	Code,
	Subscript,
	Font,
	Superscript,
	Highlight,
	HorizontalLine,
	BlockQuote,
	CKFinder,
	EasyImage,
	Heading,
	Image,
	ImageCaption,
	ImageStyle,
	PageBreak,
	RemoveFormat,
	ImageToolbar,
	ImageUpload,
	ImageResize,
	Indent,
	IndentBlock,
	Link,
	List,
	TodoList,
	MediaEmbed,
	Paragraph,
	Table,
	TableToolbar,
	Alignment,
	CodeBlock
];

// Plugins to include in the build.
ClassicEditor.builtinPlugins = plugins;
InlineEditor.builtinPlugins = plugins;
DocumentEditor.builtinPlugins = plugins;

const config = {
	toolbar: {
		items: [
			'heading',
			'fontSize',
			'fontFamily',
			'fontColor',
			'fontBackgroundColor',
			'highlight',
			'|',
			'alignment',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'code',
			'subscript',
			'superscript',
			'link',
			'bulletedList',
			'numberedList',
			'todoList',
			'codeBlock',
			'removeFormat',
			'|',
			'indent',
			'outdent',
			'horizontalLine',
			'pageBreak',
			'|',
			'imageUpload',
			'blockQuote',
			'insertTable',
			'mediaEmbed',
			'undo',
			'redo'
		]
	},
	image: {
		toolbar: [
			'imageStyle:full',
			'imageStyle:side',
			'imageStyle:alignLeft',
			'imageStyle:alignCenter',
			'imageStyle:alignRight',
			'|',
			'imageTextAlternative'
		],
		styles: [
			'full',
			'side',
			'alignLeft',
			'alignCenter',
			'alignRight'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells'
		]
	},
	heading: {
		options: [
			{ model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
			{ model: 'heading2', view: 'h2', title: 'Heading 1', class: 'ck-heading_heading2' },
			{ model: 'heading3', view: 'h3', title: 'Heading 2', class: 'ck-heading_heading3' },
			{ model: 'heading4', view: 'h4', title: 'Heading 3', class: 'ck-heading_heading4' },
			{ model: 'heading5', view: 'h5', title: 'Heading 4', class: 'ck-heading_heading5' },
			{ model: 'heading6', view: 'h6', title: 'Heading 5', class: 'ck-heading_heading6' }
		]
	},
	fontFamily: {
		options: [
			'default',
			'Arial, Helvetica, sans-serif',
			'Courier New, Courier, monospace',
			'Georgia, serif',
			'Lucida Sans Unicode, Lucida Grande, sans-serif',
			'Tahoma, Geneva, sans-serif',
			'Times New Roman, Times, serif',
			'Trebuchet MS, Helvetica, sans-serif',
			'Verdana, Geneva, sans-serif',
			'Ubuntu, Arial, sans-serif',
			'Ubuntu Mono, Courier New, Courier, monospace'
		]
	},
	highlight: {
		options: [
			{
				model: 'yellowMarker',
				class: 'marker-yellow',
				title: 'Yellow marker',
				color: 'var(--ck-highlight-marker-yellow)',
				type: 'marker'
			},
			{
				model: 'greenMarker',
				class: 'marker-green',
				title: 'Green marker',
				color: 'var(--ck-highlight-marker-green)',
				type: 'marker'
			},
			{
				model: 'pinkMarker',
				class: 'marker-pink',
				title: 'Pink marker',
				color: 'var(--ck-highlight-marker-pink)',
				type: 'marker'
			},
			{
				model: 'blueMarker',
				class: 'marker-blue',
				title: 'Blue marker',
				color: 'var(--ck-highlight-marker-blue)',
				type: 'marker'
			},
			{
				model: 'redPen',
				class: 'pen-red',
				title: 'Red pen',
				color: 'var(--ck-highlight-pen-red)',
				type: 'pen'
			},
			{
				model: 'greenPen',
				class: 'pen-green',
				title: 'Green pen',
				color: 'var(--ck-highlight-pen-green)',
				type: 'pen'
			}
		]
	},
	fontSize: {
		options: [
			9,
			10,
			11,
			12,
			13,
			14,
			15,
			'default',
			17,
			19,
			21,
			25,
			27,
			30
		]
	},
	fontColor: {
		colors: [
			{ color: 'hsl(0, 0%, 0%)' },
			{ color: 'hsl(0, 100%, 10%)' },
			{ color: 'hsl(30, 100%, 10%)' },
			{ color: 'hsl(60, 100%, 10%)' },
			{ color: 'hsl(90, 100%, 10%)' },
			{ color: 'hsl(120, 100%, 10%)' },
			{ color: 'hsl(150, 100%, 10%)' },
			{ color: 'hsl(180, 100%, 10%)' },
			{ color: 'hsl(210, 100%, 10%)' },
			{ color: 'hsl(240, 100%, 10%)' },
			{ color: 'hsl(270, 100%, 10%)' },
			{ color: 'hsl(300, 100%, 10%)' },
			{ color: 'hsl(330, 100%, 10%)' },
			{ color: 'hsl(0, 0%, 12.5%)' },
			{ color: 'hsl(0, 100%, 20%)' },
			{ color: 'hsl(30, 100%, 20%)' },
			{ color: 'hsl(60, 100%, 20%)' },
			{ color: 'hsl(90, 100%, 20%)' },
			{ color: 'hsl(120, 100%, 20%)' },
			{ color: 'hsl(150, 100%, 20%)' },
			{ color: 'hsl(180, 100%, 20%)' },
			{ color: 'hsl(210, 100%, 20%)' },
			{ color: 'hsl(240, 100%, 20%)' },
			{ color: 'hsl(270, 100%, 20%)' },
			{ color: 'hsl(300, 100%, 20%)' },
			{ color: 'hsl(330, 100%, 20%)' },
			{ color: 'hsl(0, 0%, 25%)' },
			{ color: 'hsl(0, 100%, 30%)' },
			{ color: 'hsl(30, 100%, 30%)' },
			{ color: 'hsl(60, 100%, 30%)' },
			{ color: 'hsl(90, 100%, 30%)' },
			{ color: 'hsl(120, 100%, 30%)' },
			{ color: 'hsl(150, 100%, 30%)' },
			{ color: 'hsl(180, 100%, 30%)' },
			{ color: 'hsl(210, 100%, 30%)' },
			{ color: 'hsl(240, 100%, 30%)' },
			{ color: 'hsl(270, 100%, 30%)' },
			{ color: 'hsl(300, 100%, 30%)' },
			{ color: 'hsl(330, 100%, 30%)' },
			{ color: 'hsl(0, 0%, 37.5%)' },
			{ color: 'hsl(0, 100%, 40%)' },
			{ color: 'hsl(30, 100%, 40%)' },
			{ color: 'hsl(60, 100%, 40%)' },
			{ color: 'hsl(90, 100%, 40%)' },
			{ color: 'hsl(120, 100%, 40%)' },
			{ color: 'hsl(150, 100%, 40%)' },
			{ color: 'hsl(180, 100%, 40%)' },
			{ color: 'hsl(210, 100%, 40%)' },
			{ color: 'hsl(240, 100%, 40%)' },
			{ color: 'hsl(270, 100%, 40%)' },
			{ color: 'hsl(300, 100%, 40%)' },
			{ color: 'hsl(330, 100%, 40%)' },
			{ color: 'hsl(0, 0%, 50%)' },
			{ color: 'hsl(0, 100%, 50%)' },
			{ color: 'hsl(30, 100%, 50%)' },
			{ color: 'hsl(60, 100%, 50%)' },
			{ color: 'hsl(90, 100%, 50%)' },
			{ color: 'hsl(120, 100%, 50%)' },
			{ color: 'hsl(150, 100%, 50%)' },
			{ color: 'hsl(180, 100%, 50%)' },
			{ color: 'hsl(210, 100%, 50%)' },
			{ color: 'hsl(240, 100%, 50%)' },
			{ color: 'hsl(270, 100%, 50%)' },
			{ color: 'hsl(300, 100%, 50%)' },
			{ color: 'hsl(330, 100%, 50%)' },
			{ color: 'hsl(0, 0%, 62.5%)' },
			{ color: 'hsl(0, 100%, 60%)' },
			{ color: 'hsl(30, 100%, 60%)' },
			{ color: 'hsl(60, 100%, 60%)' },
			{ color: 'hsl(90, 100%, 60%)' },
			{ color: 'hsl(120, 100%, 60%)' },
			{ color: 'hsl(150, 100%, 60%)' },
			{ color: 'hsl(180, 100%, 60%)' },
			{ color: 'hsl(210, 100%, 60%)' },
			{ color: 'hsl(240, 100%, 60%)' },
			{ color: 'hsl(270, 100%, 60%)' },
			{ color: 'hsl(300, 100%, 60%)' },
			{ color: 'hsl(330, 100%, 60%)' },
			{ color: 'hsl(0, 0%, 75%)' },
			{ color: 'hsl(0, 100%, 70%)' },
			{ color: 'hsl(30, 100%, 70%)' },
			{ color: 'hsl(60, 100%, 70%)' },
			{ color: 'hsl(90, 100%, 70%)' },
			{ color: 'hsl(120, 100%, 70%)' },
			{ color: 'hsl(150, 100%, 70%)' },
			{ color: 'hsl(180, 100%, 70%)' },
			{ color: 'hsl(210, 100%, 70%)' },
			{ color: 'hsl(240, 100%, 70%)' },
			{ color: 'hsl(270, 100%, 70%)' },
			{ color: 'hsl(300, 100%, 70%)' },
			{ color: 'hsl(330, 100%, 70%)' },
			{ color: 'hsl(0, 0%, 87.5%)' },
			{ color: 'hsl(0, 100%, 80%)' },
			{ color: 'hsl(30, 100%, 80%)' },
			{ color: 'hsl(60, 100%, 80%)' },
			{ color: 'hsl(90, 100%, 80%)' },
			{ color: 'hsl(120, 100%, 80%)' },
			{ color: 'hsl(150, 100%, 80%)' },
			{ color: 'hsl(180, 100%, 80%)' },
			{ color: 'hsl(210, 100%, 80%)' },
			{ color: 'hsl(240, 100%, 80%)' },
			{ color: 'hsl(270, 100%, 80%)' },
			{ color: 'hsl(300, 100%, 80%)' },
			{ color: 'hsl(330, 100%, 80%)' },
			{ color: 'hsl(0, 0%, 100%)', hasBorder: true },
			{ color: 'hsl(0, 100%, 90%)', hasBorder: true },
			{ color: 'hsl(30, 100%, 90%)', hasBorder: true },
			{ color: 'hsl(60, 100%, 90%)', hasBorder: true },
			{ color: 'hsl(90, 100%, 90%)', hasBorder: true },
			{ color: 'hsl(120, 100%, 90%)', hasBorder: true },
			{ color: 'hsl(150, 100%, 90%)', hasBorder: true },
			{ color: 'hsl(180, 100%, 90%)', hasBorder: true },
			{ color: 'hsl(210, 100%, 90%)', hasBorder: true },
			{ color: 'hsl(240, 100%, 90%)', hasBorder: true },
			{ color: 'hsl(270, 100%, 90%)', hasBorder: true },
			{ color: 'hsl(300, 100%, 90%)', hasBorder: true },
			{ color: 'hsl(330, 100%, 90%)', hasBorder: true }
		],
		columns: 13,
		documentColors: 13
	},
	fontBackgroundColor: {
		colors: [
			{ color: 'hsl(0, 0%, 0%)' },
			{ color: 'hsl(0, 100%, 10%)' },
			{ color: 'hsl(30, 100%, 10%)' },
			{ color: 'hsl(60, 100%, 10%)' },
			{ color: 'hsl(90, 100%, 10%)' },
			{ color: 'hsl(120, 100%, 10%)' },
			{ color: 'hsl(150, 100%, 10%)' },
			{ color: 'hsl(180, 100%, 10%)' },
			{ color: 'hsl(210, 100%, 10%)' },
			{ color: 'hsl(240, 100%, 10%)' },
			{ color: 'hsl(270, 100%, 10%)' },
			{ color: 'hsl(300, 100%, 10%)' },
			{ color: 'hsl(330, 100%, 10%)' },
			{ color: 'hsl(0, 0%, 12.5%)' },
			{ color: 'hsl(0, 100%, 20%)' },
			{ color: 'hsl(30, 100%, 20%)' },
			{ color: 'hsl(60, 100%, 20%)' },
			{ color: 'hsl(90, 100%, 20%)' },
			{ color: 'hsl(120, 100%, 20%)' },
			{ color: 'hsl(150, 100%, 20%)' },
			{ color: 'hsl(180, 100%, 20%)' },
			{ color: 'hsl(210, 100%, 20%)' },
			{ color: 'hsl(240, 100%, 20%)' },
			{ color: 'hsl(270, 100%, 20%)' },
			{ color: 'hsl(300, 100%, 20%)' },
			{ color: 'hsl(330, 100%, 20%)' },
			{ color: 'hsl(0, 0%, 25%)' },
			{ color: 'hsl(0, 100%, 30%)' },
			{ color: 'hsl(30, 100%, 30%)' },
			{ color: 'hsl(60, 100%, 30%)' },
			{ color: 'hsl(90, 100%, 30%)' },
			{ color: 'hsl(120, 100%, 30%)' },
			{ color: 'hsl(150, 100%, 30%)' },
			{ color: 'hsl(180, 100%, 30%)' },
			{ color: 'hsl(210, 100%, 30%)' },
			{ color: 'hsl(240, 100%, 30%)' },
			{ color: 'hsl(270, 100%, 30%)' },
			{ color: 'hsl(300, 100%, 30%)' },
			{ color: 'hsl(330, 100%, 30%)' },
			{ color: 'hsl(0, 0%, 37.5%)' },
			{ color: 'hsl(0, 100%, 40%)' },
			{ color: 'hsl(30, 100%, 40%)' },
			{ color: 'hsl(60, 100%, 40%)' },
			{ color: 'hsl(90, 100%, 40%)' },
			{ color: 'hsl(120, 100%, 40%)' },
			{ color: 'hsl(150, 100%, 40%)' },
			{ color: 'hsl(180, 100%, 40%)' },
			{ color: 'hsl(210, 100%, 40%)' },
			{ color: 'hsl(240, 100%, 40%)' },
			{ color: 'hsl(270, 100%, 40%)' },
			{ color: 'hsl(300, 100%, 40%)' },
			{ color: 'hsl(330, 100%, 40%)' },
			{ color: 'hsl(0, 0%, 50%)' },
			{ color: 'hsl(0, 100%, 50%)' },
			{ color: 'hsl(30, 100%, 50%)' },
			{ color: 'hsl(60, 100%, 50%)' },
			{ color: 'hsl(90, 100%, 50%)' },
			{ color: 'hsl(120, 100%, 50%)' },
			{ color: 'hsl(150, 100%, 50%)' },
			{ color: 'hsl(180, 100%, 50%)' },
			{ color: 'hsl(210, 100%, 50%)' },
			{ color: 'hsl(240, 100%, 50%)' },
			{ color: 'hsl(270, 100%, 50%)' },
			{ color: 'hsl(300, 100%, 50%)' },
			{ color: 'hsl(330, 100%, 50%)' },
			{ color: 'hsl(0, 0%, 62.5%)' },
			{ color: 'hsl(0, 100%, 60%)' },
			{ color: 'hsl(30, 100%, 60%)' },
			{ color: 'hsl(60, 100%, 60%)' },
			{ color: 'hsl(90, 100%, 60%)' },
			{ color: 'hsl(120, 100%, 60%)' },
			{ color: 'hsl(150, 100%, 60%)' },
			{ color: 'hsl(180, 100%, 60%)' },
			{ color: 'hsl(210, 100%, 60%)' },
			{ color: 'hsl(240, 100%, 60%)' },
			{ color: 'hsl(270, 100%, 60%)' },
			{ color: 'hsl(300, 100%, 60%)' },
			{ color: 'hsl(330, 100%, 60%)' },
			{ color: 'hsl(0, 0%, 75%)' },
			{ color: 'hsl(0, 100%, 70%)' },
			{ color: 'hsl(30, 100%, 70%)' },
			{ color: 'hsl(60, 100%, 70%)' },
			{ color: 'hsl(90, 100%, 70%)' },
			{ color: 'hsl(120, 100%, 70%)' },
			{ color: 'hsl(150, 100%, 70%)' },
			{ color: 'hsl(180, 100%, 70%)' },
			{ color: 'hsl(210, 100%, 70%)' },
			{ color: 'hsl(240, 100%, 70%)' },
			{ color: 'hsl(270, 100%, 70%)' },
			{ color: 'hsl(300, 100%, 70%)' },
			{ color: 'hsl(330, 100%, 70%)' },
			{ color: 'hsl(0, 0%, 87.5%)' },
			{ color: 'hsl(0, 100%, 80%)' },
			{ color: 'hsl(30, 100%, 80%)' },
			{ color: 'hsl(60, 100%, 80%)' },
			{ color: 'hsl(90, 100%, 80%)' },
			{ color: 'hsl(120, 100%, 80%)' },
			{ color: 'hsl(150, 100%, 80%)' },
			{ color: 'hsl(180, 100%, 80%)' },
			{ color: 'hsl(210, 100%, 80%)' },
			{ color: 'hsl(240, 100%, 80%)' },
			{ color: 'hsl(270, 100%, 80%)' },
			{ color: 'hsl(300, 100%, 80%)' },
			{ color: 'hsl(330, 100%, 80%)' },
			{ color: 'hsl(0, 0%, 100%)', hasBorder: true },
			{ color: 'hsl(0, 100%, 90%)', hasBorder: true },
			{ color: 'hsl(30, 100%, 90%)', hasBorder: true },
			{ color: 'hsl(60, 100%, 90%)', hasBorder: true },
			{ color: 'hsl(90, 100%, 90%)', hasBorder: true },
			{ color: 'hsl(120, 100%, 90%)', hasBorder: true },
			{ color: 'hsl(150, 100%, 90%)', hasBorder: true },
			{ color: 'hsl(180, 100%, 90%)', hasBorder: true },
			{ color: 'hsl(210, 100%, 90%)', hasBorder: true },
			{ color: 'hsl(240, 100%, 90%)', hasBorder: true },
			{ color: 'hsl(270, 100%, 90%)', hasBorder: true },
			{ color: 'hsl(300, 100%, 90%)', hasBorder: true },
			{ color: 'hsl(330, 100%, 90%)', hasBorder: true }
		],
		columns: 13,
		documentColors: 13
	},
	placeholder: 'Project description goes here.',
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
};

// Editor configuration.
ClassicEditor.defaultConfig = config;
InlineEditor.defaultConfig = config;
DocumentEditor.defaultConfig = config;

export default {
	ClassicEditor, InlineEditor, DocumentEditor
};
