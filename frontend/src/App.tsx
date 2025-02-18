import { EditorPage } from './pages/EditorPage';
import { EditorProvider } from './context/EditorProvider';
import { type Component } from 'solid-js';

export const App: Component<{}> = () => {
  return (
    <EditorProvider>
      <EditorPage />
    </EditorProvider>
  );
};
