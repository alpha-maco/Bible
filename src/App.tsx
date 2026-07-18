import { useCallback, useMemo, useState } from 'react';
import { genesisNodes } from './data/genesis_1_3';
import DetailPanel from './components/DetailPanel';
import GenealogyFlow from './components/GenealogyFlow';
import type { GenesisNodeId } from './data/genesis_1_3';

const POPUP_WIDTH = 680;
const POPUP_HEIGHT = 640;
const VIEWPORT_MARGIN = 20;

type PopupState = {
  openKey: number;
  nodeId: GenesisNodeId;
  x: number;
  y: number;
  originX: number;
  originY: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getPopupPlacement(clientX: number, clientY: number) {
  const maxX = Math.max(VIEWPORT_MARGIN, window.innerWidth - POPUP_WIDTH - VIEWPORT_MARGIN);
  const maxY = Math.max(VIEWPORT_MARGIN, window.innerHeight - POPUP_HEIGHT - VIEWPORT_MARGIN);
  const x = clamp(clientX - POPUP_WIDTH / 2, VIEWPORT_MARGIN, maxX);
  const y = clamp(clientY - 72, VIEWPORT_MARGIN, maxY);

  return {
    x,
    y,
    originX: clientX - x,
    originY: clientY - y,
  };
}

function App() {
  const [popup, setPopup] = useState<PopupState | null>(null);

  const selectedNode = useMemo(
    () => genesisNodes.find((node) => node.id === popup?.nodeId) ?? null,
    [popup?.nodeId],
  );

  const handleSelectNode = (nodeId: GenesisNodeId, clientX: number, clientY: number) => {
    setPopup((current) => ({
      openKey: (current?.openKey ?? 0) + 1,
      nodeId,
      ...getPopupPlacement(clientX, clientY),
    }));
  };

  const handleMovePopup = useCallback((x: number, y: number) => {
    setPopup((current) => {
      if (!current) return current;

      const maxX = Math.max(VIEWPORT_MARGIN, window.innerWidth - POPUP_WIDTH - VIEWPORT_MARGIN);
      const maxY = Math.max(VIEWPORT_MARGIN, window.innerHeight - POPUP_HEIGHT - VIEWPORT_MARGIN);

      return {
        ...current,
        x: clamp(x, VIEWPORT_MARGIN, maxX),
        y: clamp(y, VIEWPORT_MARGIN, maxY),
      };
    });
  }, []);

  return (
    <main className="app-shell">
      <section className="canvas-area" aria-label="창세기 전체 계보도">
        <header className="topbar">
          <div>
            <h1>창세기 전체 계보도</h1>
            <p>창조에서 애굽 정착까지 이어지는 약속과 계보의 흐름</p>
          </div>
          <span className="chapter-chip">Genesis 1-50</span>
        </header>

        <GenealogyFlow
          nodes={genesisNodes}
          selectedNodeId={popup?.nodeId ?? null}
          onSelectNode={handleSelectNode}
        />
      </section>

      {popup && selectedNode ? (
        <DetailPanel
          key={popup.openKey}
          node={selectedNode}
          position={{ x: popup.x, y: popup.y }}
          origin={{ x: popup.originX, y: popup.originY }}
          onMove={handleMovePopup}
          onClose={() => setPopup(null)}
        />
      ) : null}
    </main>
  );
}

export default App;
