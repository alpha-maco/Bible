import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { GenesisNode } from '../data/genesis_1_3';
import { openKoreanGenesis, openKoreanGenesisMeta } from '../data/bible/open_korean_genesis';

type DetailPanelProps = {
  node: GenesisNode;
  position: { x: number; y: number };
  origin: { x: number; y: number };
  onMove: (x: number, y: number) => void;
  onClose: () => void;
};

function getOpenKoreanGenesisText(reference: string) {
  const match = reference.match(/^창세기\s+(\d+):(\d+)(?:-(\d+))?$/);
  if (!match) return [];

  const [, chapter, startVerse, endVerse] = match;
  const chapterVerses = (openKoreanGenesis as Record<string, Record<string, string>>)[chapter];
  if (!chapterVerses) return [];

  const start = Number(startVerse);
  const end = Number(endVerse ?? startVerse);

  return Array.from({ length: end - start + 1 }, (_, index) => {
    const verseNumber = String(start + index);
    return {
      verseNumber,
      text: chapterVerses[verseNumber],
    };
  }).filter((verse) => Boolean(verse.text));
}

function VerseContent({ reference }: { reference: string }) {
  const verseText = getOpenKoreanGenesisText(reference);

  return (
    <article className="verse-content">
      <h4>{reference}</h4>
      {verseText.length > 0 ? (
        <div className="verse-lines">
          {verseText.map((verse) => (
            <p key={verse.verseNumber}>
              <strong>{verse.verseNumber}</strong>
              {verse.text}
            </p>
          ))}
        </div>
      ) : (
        <p>이 구절은 아직 공개 한국어 창세기 본문 데이터 범위에 없습니다.</p>
      )}
      <small>{openKoreanGenesisMeta.license}</small>
    </article>
  );
}

function renderCommaList(items: string[]) {
  return items.length > 0 ? items.join(', ') : '해당 없음';
}

function splitKeyValue(text: string) {
  const separatorIndex = text.indexOf(':');
  if (separatorIndex === -1) {
    return { key: '항목', value: text };
  }

  return {
    key: text.slice(0, separatorIndex).trim(),
    value: text.slice(separatorIndex + 1).trim(),
  };
}

function DetailPanel({ node, position, origin, onMove, onClose }: DetailPanelProps) {
  const [selectedVerse, setSelectedVerse] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState<{
    pointerX: number;
    pointerY: number;
    panelX: number;
    panelY: number;
  } | null>(null);
  const verseSectionRef = useRef<HTMLElement | null>(null);
  const didDragRef = useRef(false);
  const ignoreNextClickRef = useRef(false);

  useEffect(() => {
    setSelectedVerse(null);
  }, [node.id]);

  const visibleVerses =
    selectedVerse && !node.verses.includes(selectedVerse) ? [selectedVerse, ...node.verses] : node.verses;

  const pointToVerse = (reference: string) => {
    setSelectedVerse(reference);
    window.requestAnimationFrame(() => {
      verseSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const renderPropheticMeaning = () => {
    const parts = node.propheticMeaning.split(/(창세기\s+\d+:\d+(?:-\d+)?)/g);

    return (
      <>
        <p>
          {parts.map((part, index) => {
            if (!/^창세기\s+\d+:\d+(?:-\d+)?$/.test(part)) {
              return <span key={`${part}-${index}`}>{part}</span>;
            }

            return (
              <button
                className="reference-link"
                key={part}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  pointToVerse(part);
                }}
              >
                {part}
              </button>
            );
          })}
        </p>
      </>
    );
  };

  useEffect(() => {
    if (!dragStart) return undefined;

    const handlePointerMove = (event: PointerEvent) => {
      const deltaX = event.clientX - dragStart.pointerX;
      const deltaY = event.clientY - dragStart.pointerY;
      const nextX = dragStart.panelX + event.clientX - dragStart.pointerX;
      const nextY = dragStart.panelY + event.clientY - dragStart.pointerY;

      if (Math.hypot(deltaX, deltaY) > 4) {
        didDragRef.current = true;
      }

      onMove(nextX, nextY);
    };

    const handlePointerUp = () => {
      ignoreNextClickRef.current = didDragRef.current;
      setDragStart(null);
      window.setTimeout(() => {
        ignoreNextClickRef.current = false;
      }, 0);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [dragStart, onMove]);

  return (
    <aside
      className={`detail-panel${dragStart ? ' is-dragging' : ''}`}
      style={
        {
          left: `${position.x}px`,
          top: `${position.y}px`,
          '--popup-origin-x': `${origin.x}px`,
          '--popup-origin-y': `${origin.y}px`,
        } as CSSProperties
      }
      aria-label={`${node.label} 상세 정보`}
      onClick={() => {
        if (ignoreNextClickRef.current) return;
        onClose();
      }}
    >
      <div
        className="detail-heading"
        onPointerDown={(event) => {
          didDragRef.current = false;
          setDragStart({
            pointerX: event.clientX,
            pointerY: event.clientY,
            panelX: position.x,
            panelY: position.y,
          });
        }}
      >
        <div>
          <span className={`detail-kind detail-kind--${node.kind}`}>{node.chapterRange}</span>
          <h2>{node.label}</h2>
          <p>{node.subtitle}</p>
        </div>
      </div>

      <div className="detail-sections">
        <section
          ref={verseSectionRef}
          className="detail-section"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <h3>관련 구절</h3>
          <div className={`verse-browser${selectedVerse ? ' has-selection' : ''}`}>
            <ul className="verse-list">
              {visibleVerses.map((verse) => (
                <li key={verse}>
                  <button
                    className={`verse-button${selectedVerse === verse ? ' is-selected' : ''}${
                      !node.verses.includes(verse) ? ' is-linked-target' : ''
                    }`}
                    type="button"
                    onClick={() => {
                      setSelectedVerse((currentVerse) => (currentVerse === verse ? null : verse));
                    }}
                  >
                    {verse}
                  </button>
                </li>
              ))}
            </ul>

            {selectedVerse ? (
              <VerseContent reference={selectedVerse} />
            ) : null}
          </div>
        </section>

        <section className="detail-section">
          <h3>사건 요약</h3>
          <p>{node.summary}</p>
        </section>

        <section className="detail-section">
          <h3>관련 인물·민족·제국</h3>
          <dl className="kv-list">
            <div>
              <dt>관련인물</dt>
              <dd>{renderCommaList(node.relatedEntities.people)}</dd>
            </div>
            <div>
              <dt>민족</dt>
              <dd>{renderCommaList(node.relatedEntities.nations)}</dd>
            </div>
            <div>
              <dt>제국(현재 국가명)</dt>
              <dd>{renderCommaList(node.relatedEntities.empires)}</dd>
            </div>
          </dl>
        </section>

        <section className="detail-section">
          <h3>후대 해석·영향</h3>
          <dl className="kv-list">
            {node.historicalFulfillmentCandidates.map((item, index) => (
              <div key={item}>
                <dt>후보 {index + 1}</dt>
                <dd>{item}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          className="detail-section"
          onClick={(event) => {
            if ((event.target as HTMLElement).closest('button')) {
              event.stopPropagation();
            }
          }}
        >
          <h3>예언적 의미</h3>
          {renderPropheticMeaning()}
        </section>

        <section className="detail-section">
          <h3>고대 명칭 ↔ 현대 연결</h3>
          <dl className="kv-list">
            {node.ancientModernLinks.map((item) => {
              const { key, value } = splitKeyValue(item);

              return (
                <div key={item}>
                  <dt>{key}</dt>
                  <dd>{value}</dd>
                </div>
              );
            })}
          </dl>
        </section>

        <section className="detail-section">
          <h3>현재 사건과 연결 가능성</h3>
          <ul>
            {node.currentEventPossibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </aside>
  );
}

export default DetailPanel;
