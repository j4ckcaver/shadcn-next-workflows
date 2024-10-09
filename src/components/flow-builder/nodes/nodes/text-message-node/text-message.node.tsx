import {
  type Node,
  type NodeProps,
  Position,
  useReactFlow,
} from "@xyflow/react";
import { nanoid } from "nanoid";
import { isEmpty } from "radash";
import { memo, useCallback, useMemo, useState } from "react";
import { BaseNodeData, BuilderNode, RegisterNodeMetadata } from "../../types";
import {
  getMessageChannelDetails,
  MessageChannelType,
} from "./constants/channels";
import { getNodeDetail } from "../../utils";
import { useFlowStore } from "@/stores/flow-store";
import { useDeleteNode } from "@/hooks/use-delete-node";
import CustomHandle from "@/components/flow-builder/components/handles/custom-handler";
import TextMessageNodePropertyPanel from "../../sidebar/panels/node-properties/property-panels/text-message-property-panel";
import { useShallow } from "zustand/shallow";
import Icon from "@/components/ui/lucide-icon";
import { icons } from "lucide-react";

const NODE_TYPE = BuilderNode.TEXT_MESSAGE;

export interface TextMessageNodeData extends BaseNodeData {
  channel: MessageChannelType;
  message: string;
}

type TextMessageNodeProps = NodeProps<
  Node<TextMessageNodeData, typeof NODE_TYPE>
>;

export function TextMessageNode({
  id,
  isConnectable,
  selected,
  data,
}: TextMessageNodeProps) {
  const meta = useMemo(() => getNodeDetail(NODE_TYPE), []);

  const [showNodePropertiesOf] = useFlowStore(
    useShallow((s) => [s.actions.sidebar.showNodePropertiesOf])
  );
  const [sourceHandleId] = useState<string>(nanoid());

  const { setNodes } = useReactFlow();
  const deleteNode = useDeleteNode();

  const messageChannelDetail = useMemo(() => {
    return getMessageChannelDetails(data.channel);
  }, [data.channel]);

  // const onMessageChannelSelect = useCallback(
  //     (channel: MessageChannelDetail & { type: MessageChannelType }) => {

  //         setNodes(nodes => produce(nodes, (draft) => {
  //             const node = draft.find(node => node.id === id);

  //             if (node)
  //                 node.data.channel = channel.type;
  //         }));
  //     },
  //     [id, setNodes],
  // );

  const showNodeProperties = useCallback(() => {
    showNodePropertiesOf({ id, type: NODE_TYPE });
  }, [id, showNodePropertiesOf]);

  return (
    <>
      <div
        data-selected={selected}
        className="w-xs overflow-clip border border-zinc-700 rounded-xl bg-zinc-800/50 shadow-sm backdrop-blur-xl transition divide-y divide-zinc-700 data-[selected=true]:border-orange-600"
        onDoubleClick={showNodeProperties}
      >
        <div className="relative bg-zinc-900/50">
          <div className="absolute inset-0">
            <div className="absolute h-full w-3/5 from-orange-900/20 to-transparent bg-gradient-to-r" />
          </div>

          <div className="relative h-9 flex items-center justify-between gap-x-4 px-0.5 py-0.5">
            <div className="flex grow items-center pl-0.5">
              <div className="size-7 flex items-center justify-center">
                <div className="size-6 flex items-center justify-center rounded-lg">
                  <Icon
                    name={meta.icon as keyof typeof icons}
                    className={"size-4"}
                  />
                </div>
              </div>

              <div className="ml-1 text-xs font-medium leading-none tracking-wide uppercase op-80">
                <span className="translate-y-px">{meta.title}</span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-x-0.5 pr-0.5">
              {/* <MessageChannelSelector detail={messageChannelDetail} onSelect={onMessageChannelSelect} /> */}

              <div className="mx-1 h-4 w-px bg-zinc-100" />

              <button
                type="button"
                className="size-7 flex items-center justify-center border border-transparent rounded-lg bg-transparent outline-none transition active:border-zinc-200 active:bg-zinc-400/50 hover:bg-zinc-100"
                onClick={() => showNodeProperties()}
              >
                <Icon name={"Cog"} className={"size-4"} />
              </button>

              <button
                type="button"
                className="size-7 flex items-center justify-center border border-transparent rounded-lg bg-transparent text-red-400 outline-none transition active:(border-zinc-200 bg-zinc-400/50) hover:(bg-zinc-100)"
                onClick={() => deleteNode(id)}
              >
                <Icon name={"Trash"} className={"size-4"} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col divide-y divide-zinc-700">
          <div className="flex flex-col p-4">
            <div className="text-xs font-medium">Message Content</div>

            <div className="line-clamp-4 mt-2 text-sm leading-snug">
              {isEmpty(data.message) ? (
                <span className="text-white italic">No message yet...</span>
              ) : (
                data.message
              )}
            </div>
          </div>

          <div className="px-4 py-2">
            <div className="text-xs text-white">
              This message will be sent to the user using the{" "}
              <b className="text-white font-semibold">
                {messageChannelDetail.name}
              </b>{" "}
              channel.
            </div>
          </div>

          <div className="bg-zinc-700/30 px-4 py-2 text-[10px] text-zinc-400">
            Node: <span className="font-semibold">#{id}</span>
          </div>
        </div>
      </div>

      <CustomHandle
        type="target"
        id={sourceHandleId}
        position={Position.Left}
        isConnectable={isConnectable}
      />

      <CustomHandle
        type="source"
        id={sourceHandleId}
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </>
  );
}

export const metadata: RegisterNodeMetadata<TextMessageNodeData> = {
  type: NODE_TYPE,
  node: memo(TextMessageNode),
  detail: {
    icon: "MessageCircleMore",
    title: "Text Message",
    description:
      "Send a text message to the user using different messaging platforms like WhatsApp, Messenger, etc.",
  },
  connection: {
    inputs: 1,
    outputs: 1,
  },
  defaultData: {
    channel: "whatsapp",
    message: "",
  },
  propertyPanel: TextMessageNodePropertyPanel,
};
