import { type Component, createSignal, useContext } from 'solid-js';
import { Portal } from 'solid-js/web';
import { EditorContext } from '../context/EditorProvider';
import { OutputBlockData } from '@editorjs/editorjs';

export const AddMapImage: Component = () => {
  // Create signals to manage input values
  const [longitude, setLongitude] = createSignal('-48.311074');
  const [latitude, setLatitude] = createSignal('-10.199453');
  const [zoomLevel, setZoomLevel] = createSignal('16.0');
  const [error, setError] = createSignal('');

  const {
    documentStore,
    setDocumentStore,
    setCurrentDocument,
    currentDocument,
  } = useContext(EditorContext)!;

  const handleSubmit = async () => {
    const long = parseFloat(longitude());
    const lat = parseFloat(latitude());
    const zoom = parseFloat(zoomLevel());

    // Validate input fields
    if (
      long >= -180 &&
      long <= 180 &&
      lat >= -85.0511 &&
      lat <= 85.0511 &&
      zoom >= 0 &&
      zoom <= 22
    ) {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_FASTAPI_URL
          }/mapbox/?lon=${long}&lat=${lat}&zoom=${zoom}`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          const block: OutputBlockData = {
            type: 'image',
            data: {
              file: {
                url: data.url,
              },
              caption: '',
              withBorder: false,
              withBackground: false,
              stretched: false,
            },
          };
          setCurrentDocument((prev) => ({
            ...prev,
            pageData: {
              blocks: [...prev.pageData.blocks, block],
            },
          }));

          setDocumentStore(
            'data',
            documentStore.data.map((pg) =>
              pg.pageNum === currentDocument().pageNum
                ? { ...pg, pageData: currentDocument().pageData }
                : pg
            )
          );
          setDocumentStore('reload', true);
          console.log(currentDocument());
        } else {
          const errorMessage = await response.text();
          alert(`Error: ${errorMessage}`);
        }
      } catch (err) {
        alert('Failed to submit the request. Please try again.');
        console.error(err);
      }
    } else {
      setError('Please ensure all values are within the valid ranges.');
    }
  };

  const openDialog = () => {
    const dialog = document.getElementById('map_modal') as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
    }
  };

  return (
    <>
      <button
        class="btn btn-sm btn-neutral btn-ghost flex flex-row justify-start"
        onClick={openDialog}
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
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        Add Map Image
      </button>
      <Portal mount={document.getElementById('root') as HTMLElement}>
        <dialog id="map_modal" class="modal">
          <div class="modal-box">
            <fieldset class="fieldset w-full">
              <legend class="fieldset-legend">Add Coordinates</legend>
              <div class="form-group">
                <input
                  type="number"
                  class="input w-full validator"
                  placeholder="Longitude"
                  max="180.00"
                  min="-180.00"
                  step="any"
                  value={longitude()}
                  onInput={(e) => setLongitude(e.currentTarget.value)}
                />
                <p class="validator-hint">Must be between -180 to 180</p>
              </div>
              <div class="form-group">
                <input
                  type="number"
                  class="input w-full validator"
                  placeholder="Latitude"
                  max="85.0511"
                  min="-85.0511"
                  step="any"
                  value={latitude()}
                  onInput={(e) => setLatitude(e.currentTarget.value)}
                />
                <p class="validator-hint">
                  Must be between -85.0511 to 85.0511
                </p>
              </div>
              <div class="form-group">
                <input
                  type="number"
                  class="input w-full validator"
                  placeholder="Zoom Level"
                  min="0"
                  max="22"
                  step="any"
                  value={zoomLevel()}
                  onInput={(e) => setZoomLevel(e.currentTarget.value)}
                />
                <p class="validator-hint">Must be between 0 to 22</p>
              </div>
              {error() && <p class="text-red-500">{error()}</p>}
              <button class="btn btn-neutral mt-4" onClick={handleSubmit}>
                Submit
              </button>
            </fieldset>
          </div>
          <form method="dialog" class="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </Portal>
    </>
  );
};
