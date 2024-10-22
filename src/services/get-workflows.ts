import type { IFlowState } from "@/stores/flow-store";

export const getWorkflows = async (): Promise<IFlowState["workflow"][]> => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + "/workflow").then((res) => res.json());
};