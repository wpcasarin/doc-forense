import { createEffect, onCleanup, onMount, useContext } from 'solid-js';
import { EDITOR_JS_TOOLS } from '../config/tools';
import { EditorContext } from '../context/EditorProvider';
import EditorJS, { type OutputData } from '@editorjs/editorjs';

type EditorProps = {
  editorBlock: string;
};

export const Editor = (props: EditorProps) => {
  const {
    documentStore,
    setDocumentStore,
    currentDocument,
    setCurrentDocument,
  } = useContext(EditorContext)!;

  let editorInstance: EditorJS | null = null;

  const initEditor = (data: OutputData) => {
    editorInstance = new EditorJS({
      autofocus: true,
      holder: props.editorBlock,
      data,
      tools: EDITOR_JS_TOOLS,
      async onChange(api) {
        const newData = await api.saver.save();
        setCurrentDocument((prev) => ({
          ...prev,
          pageData: newData,
        }));
        setDocumentStore(
          'data',
          documentStore.data.map((pg) =>
            pg.pageNum === currentDocument().pageNum
              ? { ...pg, pageData: newData }
              : pg
          )
        );
      },
    });
  };

  onMount(() => {
    initEditor(currentDocument().pageData);
    console.log(import.meta.env.VITE_POCKETBASE_URL);
    console.log(import.meta.env.VITE_FASTAPI_URL);
  });

  createEffect(() => {
    if (documentStore.reload === true) {
      setDocumentStore('reload', false);
      if (editorInstance) {
        editorInstance.destroy();
        editorInstance = null;
      }
      initEditor(currentDocument().pageData);
    }
  });

  onCleanup(() => {
    if (editorInstance) {
      editorInstance.destroy();
      editorInstance = null;
    }
  });

  return (
    <div
      class="bg-white py-5 mb-10 w-[8.27in] h-[11.69in] max-h-[11.69in] max-w-[8.27in] overflow-hidden overscroll-y-none"
      id={props.editorBlock}
    ></div>
  );
};
