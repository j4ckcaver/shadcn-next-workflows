import { TextMessageNodeData } from "@/components/flow-builder/components/blocks/nodes/text-message-node/text-message.node";
import { BuilderNode } from "@/components/flow-builder/components/blocks/types";
import {
  createNodeWithData,
  createNodeWithDefaultData,
} from "@/components/flow-builder/components/blocks/utils";
import { nanoid } from "nanoid";

const startNode = createNodeWithDefaultData(BuilderNode.START, {
  position: { x: 0, y: 267 },
  deletable: false,
});
const textMessageNode = createNodeWithData<TextMessageNodeData>(
  BuilderNode.TEXT_MESSAGE,
  {
    message:"Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    deletable: true,
  },
  { position: { x: 300, y: -140 } }
);
const textMessageNode1 =
  createNodeWithData<TextMessageNodeData>(
    BuilderNode.TEXT_MESSAGE,
    {
      message:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      deletable: true,
    },
    { position: { x: 300, y: 180 } }
  );
const textMessageNode2 =
  createNodeWithData<TextMessageNodeData>(
    BuilderNode.TEXT_MESSAGE,
    {
      message: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      deletable: true,
    },
    { position: { x: 300, y: 460 } }
  );
const endNode = createNodeWithDefaultData(BuilderNode.END, {
  position: { x: 800, y: 267 },
});

const nodes = [
  startNode,
  textMessageNode,
  textMessageNode1,
  textMessageNode2,
  endNode,
];

const edges = [
  {
    id: nanoid(),
    source: startNode.id,
    target: textMessageNode.id,
    type: "deletable",
  },
  {
    id: nanoid(),
    source: startNode.id,
    target: textMessageNode1.id,
    type: "deletable",
  },
  {
    id: nanoid(),
    source: startNode.id,
    target: textMessageNode2.id,
    type: "deletable",
  },
  {
    id: nanoid(),
    source: textMessageNode1.id,
    target: endNode.id,
    type: "deletable",
  },
  {
    id: nanoid(),
    source: textMessageNode.id,
    target: endNode.id,
    type: "deletable",
  },
];

export { nodes as defaultNodes, edges as defaultEdges };
