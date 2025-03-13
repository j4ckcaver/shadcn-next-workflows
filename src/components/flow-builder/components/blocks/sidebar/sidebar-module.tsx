import { useFlowStore } from "@/stores/flow-store";
import { useShallow } from "zustand/shallow";
import { DesktopSidebarFragment } from "./fragments/desktop-sidebar-fragment";

export function SidebarModule() {
  const [activePanel, setActivePanel, isShowing, setShowPanel] = useFlowStore(
    useShallow((s) => [
      s.workflow.sidebar.active,
      s.actions.sidebar.setActivePanel,
      s.workflow.sidebar.isShowing,
      s.actions.sidebar.setShowPanel,
    ])
  );

  return (
    <DesktopSidebarFragment
      activePanel={activePanel}
      setActivePanel={setActivePanel}
      isShowing={isShowing}
      setShowPanel={setShowPanel}
    />
  );
}
