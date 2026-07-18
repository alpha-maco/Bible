import type { GenesisNode, GenesisNodeId } from '../data/genesis_1_3';
import FlowNode from './FlowNode';

type GenealogyFlowProps = {
  nodes: GenesisNode[];
  selectedNodeId: GenesisNodeId | null;
  onSelectNode: (nodeId: GenesisNodeId, clientX: number, clientY: number) => void;
};

function GenealogyFlow({ nodes, selectedNodeId, onSelectNode }: GenealogyFlowProps) {
  const nodeById = new Map(nodes.map((node) => [node.id, node]));

  return (
    <div className="flow-wrap">
      <div className="flow-canvas">
        <svg className="flow-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="currentColor" />
            </marker>
          </defs>
          {nodes.flatMap((node) =>
            node.connections.map((targetId) => {
              const target = nodeById.get(targetId);
              if (!target) return null;

              return (
                <line
                  key={`${node.id}-${target.id}`}
                  x1={node.x}
                  y1={node.y}
                  x2={target.x}
                  y2={target.y}
                  markerEnd="url(#arrowhead)"
                />
              );
            }),
          )}
        </svg>

        {nodes.map((node) => (
          <FlowNode
            key={node.id}
            node={node}
            isSelected={node.id === selectedNodeId}
            onSelect={(clientX, clientY) => onSelectNode(node.id, clientX, clientY)}
          />
        ))}
      </div>
    </div>
  );
}

export default GenealogyFlow;
