import { EditorContext } from '../context/EditorProvider';
import { initDocument } from '../config/utils';

import { useContext, type Component } from 'solid-js';

export const NewTemplateButton: Component = () => {
  const { setDocumentStore, setCurrentDocument } = useContext(EditorContext)!;

  const resetEditor = () => {
    const newDocument = initDocument();
    setCurrentDocument(newDocument.data[0]);
    setDocumentStore({ ...newDocument, reload: true });
  };

  return (
    <button
      class="btn btn-sm btn-neutral  btn-ghost flex flex-row justify-start"
      onClick={resetEditor}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="size-4"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
      New Template
    </button>
  );
};
