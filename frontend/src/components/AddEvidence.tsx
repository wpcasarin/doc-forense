import { EditorContext } from '../context/EditorProvider';
import { GalileuData, Vestigio } from '../types/galileu.types';
import { normalizeEvidenceType, toRegularCase } from '../config/utils';
import { OutputData } from '@editorjs/editorjs';
import {
  createSignal,
  onCleanup,
  onMount,
  useContext,
  type Component,
} from 'solid-js';

type TableType = {
  type: string;
  data: {
    content: string[][];
    stretched: boolean;
    withHeadings: boolean;
  };
};

const getGalileuData = async (laudo: number | string): Promise<GalileuData> => {
  const url = `${import.meta.env.VITE_FASTAPI_URL}/galileu/${laudo}`;
  console.log(url);
  const response = await fetch(url, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  return await response.json();
};

const buildEvidenceTable = (vestigio: Vestigio): TableType => {
  const headerRow = [
    'Tipo de Vestígio',
    normalizeEvidenceType(vestigio.tipoEvidencia),
  ];

  const rows = Object.entries(vestigio.dadosVestigio).reduce<string[][]>(
    (acc, [key, value]) => {
      if (!key.toLowerCase().startsWith('id')) {
        acc.push([toRegularCase(key), value === null ? '' : String(value)]);
      }
      return acc;
    },
    [headerRow]
  );

  return {
    type: 'table',
    data: {
      content: rows,
      stretched: false,
      withHeadings: true,
    },
  };
};

export const AddEvidence: Component = () => {
  const {
    documentStore,
    setDocumentStore,
    currentDocument,
    setCurrentDocument,
  } = useContext(EditorContext)!;
  const [galileuData, setGalileuData] = createSignal<GalileuData | null>(null);
  const [dropDownOpen, setDropDownOpen] = createSignal<boolean>(false);
  const [protocol, setProtocol] = createSignal<number | ''>('');

  let detailsRef: HTMLDetailsElement | undefined;

  const getEvidenceData = (): TableType[] => {
    const data = galileuData();
    if (!data) return [];

    return data.listaVestigio.map(buildEvidenceTable);
  };

  const handleAddEvidence = async () => {
    try {
      if (parseInt(protocol().toString()) > 0) {
        const data = await getGalileuData(protocol());
        setGalileuData(data);
      } else {
        throw Error('Invalid protocol');
      }
    } catch (error) {
      console.error('Error fetching Galileu data:', error);
    }

    const newTables = getEvidenceData();
    if (newTables.length === 0) return;

    console.log('New evidence tables:', newTables);

    const currentData = currentDocument().pageData;
    const updatedData: OutputData = {
      ...currentData,
      blocks: [...currentData.blocks, ...newTables],
    };

    setCurrentDocument((prev) => ({ ...prev, pageData: updatedData }));

    setDocumentStore(
      'data',
      documentStore.data.map((pg) =>
        pg.pageNum === currentDocument().pageNum
          ? { ...pg, pageData: updatedData }
          : pg
      )
    );

    setDocumentStore({
      ...documentStore,
      reload: true,
    });

    setDropDownOpen(false);
  };

  const handleInputChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const value = input.value;

    setProtocol(value === '' ? '' : parseFloat(value));
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (detailsRef && !detailsRef.contains(e.target as Node)) {
      setDropDownOpen(false);
    }
  };

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
  });

  onCleanup(() => {
    document.removeEventListener('click', handleClickOutside);
  });

  return (
    <details
      ref={detailsRef}
      open={dropDownOpen()}
      onToggle={(e) => setDropDownOpen(e.currentTarget.open)}
      class="dropdown"
    >
      <summary class="btn btn-sm btn-neutral btn-ghost text-nowrap">
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
          <polyline points="8 17 12 21 16 17" />
          <line x1="12" y1="12" x2="12" y2="21" />
          <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29" />
        </svg>
        Add Evidence
      </summary>
      <div class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm mt-1">
        <div class="join">
          <div>
            <label class="input input-sm validator join-item">
              <input
                value={protocol() === '' ? '' : protocol()}
                onInput={handleInputChange}
                type="number"
                placeholder="protocol number"
                min="1"
                required
              />
            </label>
            <div class="validator-hint hidden">Invalid protocol</div>
          </div>
          <button
            type="button"
            class="btn btn-neutral btn-sm join-item"
            onClick={handleAddEvidence}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="size-4 text-white"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </details>
  );
};
