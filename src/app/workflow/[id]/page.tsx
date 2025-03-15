import { getWorkflowById } from "@/services/workflow";
import { FlowBuilderPage } from "../_components/flow-builder";

export default async function Workflow({ params }: { params: { id: string } }) {
  const workflow = await getWorkflowById(params.id);

  return <FlowBuilderPage workflow={workflow} />;
}
