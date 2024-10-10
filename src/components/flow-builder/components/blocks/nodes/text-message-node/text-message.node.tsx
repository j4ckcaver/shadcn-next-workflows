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
  MessageChannelDetail,
  MessageChannelType,
} from "./constants/channels";
import { getNodeDetail } from "../../utils";
import { useFlowStore } from "@/stores/flow-store";
import { useDeleteNode } from "@/hooks/use-delete-node";
import CustomHandle from "@/components/flow-builder/components/handles/custom-handler";
import TextMessageNodePropertyPanel from "../../sidebar/panels/node-properties/property-panels/text-message-property-panel";
import { useShallow } from "zustand/shallow";
import { MessageChannelSelector } from "./components/message-channel-selector";
import { Icon } from "@iconify/react";
import { produce } from "immer";
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

  const onMessageChannelSelect = useCallback(
    (channel: MessageChannelDetail & { type: MessageChannelType }) => {
      setNodes((nodes) =>
        produce(nodes, (draft) => {
          const node = draft.find((node) => node.id === id);

          if (node) node.data.channel = channel.type;
        })
      );
    },

    [id, setNodes]
  );

  const showNodeProperties = useCallback(() => {
    showNodePropertiesOf({ id, type: NODE_TYPE });
  }, [id, showNodePropertiesOf]);

  return (
    <>
      <div
        data-selected={selected}
        className="w-72 overflow-clip border border-card-foreground/10 rounded-xl bg-card/50 shadow-sm backdrop-blur-xl transition divide-y divide-card-foreground/10 data-[selected=true]:border-primary"
        onDoubleClick={showNodeProperties}
      >
        <div className="relative bg-card/50">
          <div className="absolute inset-0">
            <div className="absolute h-full w-3/5 from-primary/40 to-transparent bg-gradient-to-r" />
          </div>

          <div className="relative h-9 flex items-center justify-between gap-x-4 px-0.5 py-0.5">
            <div className="flex grow items-center pl-0.5">
              <div className="size-7 flex items-center justify-center">
                <div className="size-6 flex items-center justify-center rounded-lg">
                  <Icon
                    icon={meta.icon}
                    className={"size-4 text-card-foreground"}
                  />
                </div>
              </div>

              <div className="ml-1 text-xs text-card-foreground font-medium leading-none tracking-wide uppercase op-80">
                <span className="translate-y-px">{meta.title}</span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-x-0.5 pr-0.5">
              <MessageChannelSelector
                detail={messageChannelDetail}
                onSelect={onMessageChannelSelect}
              />

              <div className="mx-1 h-4 w-px bg-card-foreground/10" />

              <button
                type="button"
                className="size-7 flex items-center justify-center border border-transparent rounded-lg bg-transparent outline-none transition active:border-card active:bg-card/50 hover:bg-card"
                onClick={() => showNodeProperties()}
              >
                <Icon
                  icon={"mynaui:cog-solid"}
                  className={"size-4 text-card-foreground"}
                />
              </button>

              <button
                type="button"
                className="size-7 flex items-center justify-center border border-transparent rounded-lg bg-transparent text-red-400 outline-none transition active:(border-zinc-200 bg-zinc-400/50) hover:(bg-zinc-100)"
                onClick={() => deleteNode(id)}
              >
                <Icon icon={"basil:trash-solid"} className={"size-4"} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col divide-y divide-card-foreground/10">
          <div className="flex flex-col p-4">
            <div className="text-xs font-medium text-card-foreground">
              Message Content
            </div>

            <div className="line-clamp-4 mt-2 text-sm leading-snug">
              {isEmpty(data.message) ? (
                <span className="text-card-foreground italic">
                  No message yet...
                </span>
              ) : (
                data.message
              )}
            </div>
          </div>

          <div className="px-4 py-2">
            <div className="text-xs text-card-foreground">
              This message will be sent to the user using the{" "}
              <b className="text-card-foreground font-semibold">
                {messageChannelDetail.name}
              </b>{" "}
              channel.
            </div>
          </div>

          <div className="bg-card-foreground/10 px-4 py-2 text-[10px] text-card-foreground/50">
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
    icon: "mynaui:message-solid",
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
