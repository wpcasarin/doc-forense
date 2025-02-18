import { EditorContext } from '../context/EditorProvider';
import { initPage } from '../config/utils';
import { useContext, type Component } from 'solid-js';

export const PageNavigation: Component = () => {
  const {
    documentStore,
    setDocumentStore,
    setCurrentDocument,
    currentDocument,
  } = useContext(EditorContext)!;

  const nextPage = () => {
    if (currentDocument().pageData.blocks.length > 0) {
      const nextPageNum = currentDocument().pageNum + 1;
      const nextDocument = documentStore.data.find(
        (pg) => pg.pageNum === nextPageNum
      );
      if (nextDocument) {
        setCurrentDocument(nextDocument);
      } else {
        const newPage = initPage(nextPageNum);
        setCurrentDocument(newPage);
        setDocumentStore('data', [...documentStore.data, newPage]);
      }
      setDocumentStore('reload', true);
    }
  };

  const prevPage = () => {
    if (currentDocument().pageNum > 1) {
      const nextPageNum = currentDocument().pageNum - 1;
      const nextDocument = documentStore.data.find(
        (pg) => pg.pageNum === nextPageNum
      );
      if (nextDocument) {
        setCurrentDocument(nextDocument);
      }
      setDocumentStore('reload', true);
    }
  };

  return (
    <div class="join m-0 p-0">
      <button
        disabled={currentDocument().pageNum <= 1}
        onclick={prevPage}
        class="join-item btn btn-sm"
      >
        «
      </button>
      <button class="join-item btn btn-sm">
        Page {currentDocument().pageNum}
      </button>
      <button
        disabled={currentDocument().pageData.blocks.length <= 0}
        onClick={nextPage}
        class="join-item btn btn-sm"
      >
        »
      </button>
    </div>
  );
};
