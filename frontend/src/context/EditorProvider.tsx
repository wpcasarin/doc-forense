import { initDocument, initPage } from '../config/utils';
import { createStore, type SetStoreFunction } from 'solid-js/store';
import {
  type DocumentData,
  type TemplatesRecord,
} from '../types/pocketbase-types';

import {
  type Accessor,
  createContext,
  createSignal,
  type Setter,
  type ParentProps,
} from 'solid-js';

export type EditorDocumentType = TemplatesRecord & {
  reload: boolean;
};

type EditorContextType = {
  documentStore: EditorDocumentType;
  setDocumentStore: SetStoreFunction<EditorDocumentType>;
  currentDocument: Accessor<DocumentData>;
  setCurrentDocument: Setter<DocumentData>;
};

export const EditorContext = createContext<EditorContextType>();

export const EditorProvider = (props: ParentProps) => {
  const [documentStore, setDocumentStore] = createStore<EditorDocumentType>(
    initDocument()
  );
  const [currentDocument, setCurrentDocument] = createSignal<DocumentData>(
    initPage(1)
  );

  return (
    <EditorContext.Provider
      value={{
        documentStore,
        setDocumentStore,
        currentDocument,
        setCurrentDocument,
      }}
    >
      {props.children}
    </EditorContext.Provider>
  );
};
