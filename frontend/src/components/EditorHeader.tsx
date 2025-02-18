import { AddEvidence } from './AddEvidence';
import { AddMapImage } from './AddMapImage';
import { DownloadTemplateButton } from './DownloadTemplateButton';
import { NewTemplateButton } from './NewTemplateButton';
import { PageNavigation } from './PageNavigation';
import { SaveTemplateButton } from './SaveTemplateButton';
import { TemplateListModal } from './TemplateListModal';
import { TemplateNameInput } from './TemplateNameInput';
import { type Component } from 'solid-js';

export const EditorHeader: Component = () => {
  return (
    <header class="bg-white mt-10 rounded-t-lg border-b-2 w-full max-w-[8.27in] grid grid-cols-3 grid-rows-1 p-4">
      <TemplateNameInput />
      <PageNavigation />
      <div class="flex flex-row gap-2 relative justify-self-end">
        <AddEvidence />
        <details class="dropdown dropdown-end">
          <summary class="btn btn-square btn-sm">
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
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </summary>
          <ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm flex flex-col gap-1">
            <li>
              <NewTemplateButton />
            </li>
            <li>
              <SaveTemplateButton />
            </li>
            <li>
              <TemplateListModal />
            </li>
            <li>
              <AddMapImage />
            </li>
            <li>
              <DownloadTemplateButton />
            </li>
          </ul>
        </details>
      </div>
    </header>
  );
};
