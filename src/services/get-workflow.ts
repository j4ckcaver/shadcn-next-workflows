import type { IFlowState } from "@/stores/flow-store";

export const getWorkflow = async (id: string): Promise<IFlowState["workflow"]> => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + "/workflow/" + id).then((res) => res.json());
}