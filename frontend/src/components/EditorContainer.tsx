import { Editor } from './Editor';
import { EditorContext } from '../context/EditorProvider';
import { EditorHeader } from './EditorHeader';
import { Show, type Component, useContext } from 'solid-js';

export const EditorContainer: Component = () => {
  const { currentDocument } = useContext(EditorContext)!;

  return (
    <div class="bg-gray-800 flex flex-col items-center min-h-dvh overflow-hidden ">
      <EditorHeader />
      <Show when={currentDocument()}>
        <Editor editorBlock="editorjs-container" />
      </Show>
    </div>
  );
};
