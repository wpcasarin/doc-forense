import { type Component, useContext } from 'solid-js';
import { EditorContext } from '../context/EditorProvider';
import { saveTemplate } from '../config/pocketbase';

export const SaveTemplateButton: Component = () => {
  const { documentStore, setDocumentStore } = useContext(EditorContext)!;

  const handleSaveTemplate = async () => {
    const savedTemplate = await saveTemplate(documentStore);
    if (savedTemplate) {
      setDocumentStore(savedTemplate);
    }
  };

  return (
    <button
      disabled={documentStore.templateName === ''}
      type="button"
      class="btn btn-sm btn-neutral  btn-ghost flex flex-row justify-start"
      onclick={handleSaveTemplate}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="size-4"
      >
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <polyline points="17 21 17 13 7 13 7 21" />
        <polyline points="7 3 7 8 15 8" />
      </svg>
      Save Template
    </button>
  );
};
