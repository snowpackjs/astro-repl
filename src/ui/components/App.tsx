import type { FunctionalComponent } from 'preact';
import type { TabName } from '../const';
import { h, Fragment } from 'preact';
import { useRef, useCallback, useState, useEffect } from 'preact/hooks';
import { Uri } from 'monaco-editor';

import Editor from './Editor';
import JS from './JS';
import HTML from './HTML';
import Menu from './Menu';
import Preview from './Preview';
import StatusBar from './StatusBar';
import Share from './Share';
import useMonaco from '../hooks/useMonaco';
import useEsbuildWorker from '../hooks/useEsbuildWorker';
import useAstroWorker from '../hooks/useAstroWorker';
import useHtmlWorker from '../hooks/useHtmlWorker';
import { TABS } from '../const';
import useWindowSize from '../hooks/useWindowSize';

export interface Props {
  Monaco: typeof import('../../editor/modules/monaco');
  esbuildWorker: Worker;
  astroWorker: Worker;
  htmlWorker: Worker;
  initialModels?: Record<string, string>
}

const App: FunctionalComponent<Props> = ({ Monaco, esbuildWorker, astroWorker, htmlWorker, initialModels = {} }) => {
  const editorRef = useRef<HTMLElement | null>(null);
  const { editor, models, currentModel, value, setTab, addTab, removeTab } = useMonaco(Monaco, editorRef, initialModels);
  const { html, error } = useEsbuildWorker(esbuildWorker, editor, models, [value]);
  const { js, duration } = useAstroWorker(astroWorker, editor, [value]);
  const { html: formattedHtml } = useHtmlWorker(htmlWorker, html);
  const { isDesktop } = useWindowSize();
  const [currentTab, setCurrentTab] = useState<TabName>(isDesktop ? TABS.PREVIEW : TABS.CODE);

  const onAddTab = useCallback(() => {
    const basenames = models
      .map((model) =>
        model.uri.path
          .split('/')
          .pop()
          .slice(0, '.astro'.length * -1)
      )
      .filter((c) => c.startsWith('Component'));
    let filename = 'Component';
    for (const basename of basenames) {
      if (basename === filename) {
        if (filename === 'Component') {
          filename = 'Component1';
        } else {
          const number = Number.parseInt(filename.replace(/^Component/, '')) + 1;
          filename = `Component${number}`;
        }
      }
    }
    addTab(
      `---
const name = "Component"
---

<h1>Hello {name}</h1>`,
      'astro',
      Uri.parse(`inmemory://model/src/components/${filename}.astro`)
    );
  }, [models]);

  const onSetTab = (model) => {
    setTab(model);
  };

  // confirm exit before navigating
  useEffect(() => {
    window.onbeforeunload = () => confirm(`Exit Astro Play? Your work will be lost!`);
  }, []);

  return (
    <>
      <Menu currentTab={currentTab} setCurrentTab={setCurrentTab}>
        <Share models={models} />
      </Menu>
      <Editor
        currentModel={currentModel}
        currentTab={currentTab}
        models={models}
        onAddTab={onAddTab}
        onRemoveTab={removeTab}
        onSetTab={onSetTab}
        ref={editorRef}
      />
      <Preview currentTab={currentTab} hasError={!!error} html={html} />
      <HTML currentTab={currentTab} hasError={!!error} html={formattedHtml} />
      <JS currentTab={currentTab} hasError={!!error} code={js} />
      <StatusBar error={error} duration={duration} />
    </>
  );
};

export default App;
