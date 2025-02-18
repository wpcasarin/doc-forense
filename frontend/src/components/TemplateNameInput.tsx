import { EditorContext } from '../context/EditorProvider';
import { type Component, useContext } from 'solid-js';

export const TemplateNameInput: Component = () => {
  const { documentStore, setDocumentStore } = useContext(EditorContext)!;

  const handleTemplateNameChange = (e: InputEvent) => {
    const value = (e.currentTarget as HTMLInputElement).value;
    setDocumentStore((prev) => ({
      ...prev,
      templateName: value,
    }));
  };

  return (
    <input
      type="text"
      placeholder="Template name"
      class="font-bold border-none focus:outline-none text-xl"
      value={documentStore.templateName}
      onInput={handleTemplateNameChange}
    />
  );
};
