import type { GenesisNode } from '../data/genesis_1_3';

type FlowNodeProps = {
  node: GenesisNode;
  isSelected: boolean;
  onSelect: (clientX: number, clientY: number) => void;
};

function FlowNode({ node, isSelected, onSelect }: FlowNodeProps) {
  return (
    <button
      className={`flow-node flow-node--${node.kind}${isSelected ? ' is-selected' : ''}`}
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
      type="button"
      onClick={(event) => onSelect(event.clientX, event.clientY)}
      aria-pressed={isSelected}
    >
      <span className="node-label">{node.label}</span>
      <span className="node-subtitle">{node.subtitle}</span>
    </button>
  );
}

export default FlowNode;
