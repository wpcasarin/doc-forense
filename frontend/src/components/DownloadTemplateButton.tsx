import { EditorContext } from '../context/EditorProvider';
import { useContext, type Component } from 'solid-js';

export const DownloadTemplateButton: Component = () => {
  const { documentStore } = useContext(EditorContext)!;

  const sendToExternalAPI = async () => {
    const apiUrl = `${import.meta.env.VITE_FASTAPI_URL}/templates/`;
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(documentStore),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Error response:', error);
        alert('Failed to send content: ' + JSON.stringify(error));
        return;
      }

      const blob = await response.blob();
      const fileName = `${documentStore.templateName}.docx`;

      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = fileName;
      downloadLink.click();

      URL.revokeObjectURL(downloadLink.href);
    } catch (error) {
      console.error('Error sending template to external API:', error);
    }
  };

  return (
    <button
      class="btn btn-sm btn-neutral btn-ghost flex flex-row justify-start"
      onClick={sendToExternalAPI}
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
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      Download
    </button>
  );
};
