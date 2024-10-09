import { BuilderNode } from "@/components/flow-builder/nodes/types";
import { createNodeWithDefaultData } from "@/components/flow-builder/nodes/utils";
import { nanoid } from "nanoid";

const startNode = createNodeWithDefaultData(BuilderNode.START, {
  position: { x: 0, y: 267 },
});
const endNode = createNodeWithDefaultData(BuilderNode.END, {
  position: { x: 800, y: 267 },
});

const nodes = [startNode, endNode];

const edges = [
  { id: nanoid(), source: startNode.id, target: endNode.id, type: "deletable" },
  { id: nanoid(), source: startNode.id, target: endNode.id, type: "deletable" },
];

export { nodes as defaultNodes, edges as defaultEdges };
