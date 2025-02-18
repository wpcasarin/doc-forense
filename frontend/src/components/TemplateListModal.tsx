import { EditorContext } from '../context/EditorProvider';
import { TemplatesRecord } from '../types/pocketbase-types';
import {
  createEffect,
  createSignal,
  For,
  Match,
  onMount,
  Switch,
  useContext,
  type Component,
} from 'solid-js';
import {
  getTemplateList,
  getTemplate,
  deleteTemplate,
} from '../config/pocketbase';
import img from '../assets/file-icon.png';
import { formatToBrazilianDate } from '../config/utils';
import { Portal } from 'solid-js/web';

export const TemplateListModal: Component = () => {
  const { setDocumentStore, setCurrentDocument } = useContext(EditorContext)!;
  const [modalOpen, setModalOpen] = createSignal(false);
  const [templateList, setTemplateList] = createSignal<TemplatesRecord[]>([]);

  const handleDeleteTemplate = async (templateId: string) => {
    await deleteTemplate(templateId);
    await refreshTemplateList();
  };

  const refreshTemplateList = async () => {
    const templatesList = await getTemplateList();
    setTemplateList(templatesList.items);
  };

  onMount(async () => {
    await refreshTemplateList();
  });

  createEffect(() => {
    if (modalOpen()) {
      refreshTemplateList();
    }
  });

  const handleSelect = async (templateId: string) => {
    const template = await getTemplate(templateId);
    if (template) {
      setCurrentDocument(template.data[0]);
      setDocumentStore({ ...template, reload: true });
      setModalOpen(false);
    }
  };

  return (
    <>
      <button
        class="btn btn-sm btn-neutral  btn-ghost flex flex-row justify-start"
        onClick={() => setModalOpen(true)}
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
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        Load Template
      </button>
      <Portal mount={document.getElementById('root') as HTMLElement}>
        <div class={`modal ${modalOpen() ? 'modal-open' : ''}`}>
          <div class="modal-box max-w-5xl">
            <div class="flex justify-between items-center mb-4">
              <h3 class="font-bold text-lg">Select a Template</h3>
            </div>
            <Switch>
              <Match when={templateList().length <= 0}>
                <p>No template saved yet</p>
              </Match>
              <Match when={templateList().length > 0}>
                <ul class="list bg-base-100 rounded-box">
                  <For each={templateList()}>
                    {(template, index) => (
                      <li class="list-row">
                        <div class="text-4xl font-thin opacity-30 tabular-nums">
                          {(index() + 1).toString().padStart(2, '0')}
                        </div>
                        <div>
                          <img class="size-10 rounded-box" src={img} />
                        </div>
                        <div class="list-col-grow">
                          <div>{template.templateName}</div>
                          <div class="text-xs uppercase font-semibold opacity-60">
                            {formatToBrazilianDate(
                              template.updated ? template.updated : ''
                            )}
                          </div>
                        </div>
                        <button
                          class="btn btn-square btn-ghost"
                          onClick={() => handleSelect(template.templateId)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="size-[1.2em]"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button
                          class="btn btn-square btn-ghost"
                          onClick={() => handleDeleteTemplate(template.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="size-[1.2em] text-red-700"
                          >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </li>
                    )}
                  </For>
                </ul>
              </Match>
            </Switch>

            <div class="modal-action">
              <button class="btn" onClick={() => setModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      </Portal>
    </>
  );
};
