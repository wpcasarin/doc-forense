import AlignmentTune from 'editor-js-alignment-tune';
// @ts-ignore
import BreakLine from 'editorjs-break-line';
import Header from '@editorjs/header';
import Image from '@editorjs/image';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Table from '@editorjs/table';
import Underline from '@editorjs/underline';

import { type ToolConfig } from '@editorjs/editorjs';
import {
  uploadFileToPocketBase,
  uploadImageUrlToPocketBase,
} from './pocketbase';

export const EDITOR_JS_TOOLS: ToolConfig = {
  alignmentTune: {
    class: AlignmentTune,
  },
  paragraph: {
    class: Paragraph,
    shortcut: 'CMD+SHIFT+P',
    inlineToolbar: true,
    tunes: ['alignmentTune'],
  },
  header: {
    class: Header,
    shortcut: 'CMD+SHIFT+H',
    inlineToolbar: ['underline', 'bold', 'italic'],
    config: {
      placeholder: 'Enter a header',
      levels: [1, 2, 3],
      defaultLevel: 3,
    },
    tunes: ['alignmentTune'],
  },
  list: {
    class: List,
    shortcut: 'CMD+SHIFT+L',
    inlineToolbar: ['underline', 'bold', 'italic'],
    tunes: ['alignmentTune'],
  },
  table: {
    class: Table,
    shortcut: 'CMD+SHIFT+T',
  },
  underline: Underline,
  breakLine: {
    class: BreakLine,
    inlineToolbar: true,
    shortcut: 'CMD+SHIFT+ENTER',
  },
  image: {
    class: Image,
    shortcut: 'CMD+SHIFT+I',
    config: {
      uploader: {
        uploadByFile: uploadFileToPocketBase,
        uploadByUrl: uploadImageUrlToPocketBase,
      },
      field: 'file',
      types: 'image/*',
      features: {
        caption: 'optional',
        stretch: false,
        background: false,
        border: false,
      },
      // additionalRequestHeaders: {
      //   Authorization: "Bearer YOUR_TOKEN",
      // },
    },
  },
};
