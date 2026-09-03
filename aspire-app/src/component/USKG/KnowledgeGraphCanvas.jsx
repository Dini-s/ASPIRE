import React, { useCallback } from "react";

import { Background, Controls, MiniMap, ReactFlow } from "@xyflow/react";

import KnowledgeNode from "./KnowledgeNode";

const nodeTypes = {
  knowledge: KnowledgeNode,
};

const KnowledgeGraphCanvas = ({ nodes, edges, onNodeSelect }) => {
  const handleNodeClick = useCallback(
    (_, node) => {
      onNodeSelect?.(node);
    },
    [onNodeSelect],
  );

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick}
        fitView
        fitViewOptions={{
          padding: 0.2,
        }}
        minZoom={0.35}
        maxZoom={2}
        proOptions={{
          hideAttribution: true,
        }}
      >
        <Background gap={18} size={3} color="#cbd5e1" />

        <Controls />

        <MiniMap pannable zoomable />
      </ReactFlow>
    </div>
  );
};

export default KnowledgeGraphCanvas;
