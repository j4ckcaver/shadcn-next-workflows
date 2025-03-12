// Fixed DesktopSidebarFragment.tsx
import { useEffect } from "react";
import { SwitchSidebarPanel } from "../components/sidebar-switch-panel";
import SidebarButtonItem from "../components/sidebar-button-item";
import { Icon } from "@iconify/react";

type DesktopSidebarFragmentProps = Readonly<{
  activePanel: "node-properties" | "available-nodes" | "none";
  setActivePanel: (
    panel: "node-properties" | "available-nodes" | "none"
  ) => void;
  isShowing: boolean;
  setShowPanel: (isShowing: boolean) => void;
}>;

export function DesktopSidebarFragment({
  activePanel,
  setActivePanel,
  isShowing,
  setShowPanel,
}: DesktopSidebarFragmentProps) {
  const effectiveIsShowing = isShowing ?? true;

  useEffect(() => {
    if (activePanel === "none") {
      setActivePanel("available-nodes");
    }

    if (isShowing === undefined) {
      setShowPanel(true);
    }
  }, [activePanel, setActivePanel, isShowing, setShowPanel]);

  return (
    <div className="relative max-w-sm w-fit flex shrink-0 divide-x divide-card-foreground/10">
      {effectiveIsShowing && (
        <div className="min-w-xs grow bg-card">
          <SwitchSidebarPanel active={activePanel} />
        </div>
      )}

      <div className="shrink-0 bg-card flex flex-col items-center">
        <SidebarButtonItem
          className="h-[55px] hover:bg-transparent"
          onClick={() => {
            console.log(
              "Toggle button clicked, current isShowing:",
              isShowing,
              "effectiveIsShowing:",
              effectiveIsShowing
            );
            setShowPanel(!effectiveIsShowing);
          }}
        >
          {effectiveIsShowing ? (
            <Icon icon="mdi:chevron-left" className="size-5" />
          ) : (
            <Icon icon="mdi:chevron-right" className="size-5" />
          )}
        </SidebarButtonItem>
        <div className="mx-auto h-px w-full bg-card-foreground/10" />
        <div className="flex flex-col gap-2 p-1.5">
          <SidebarButtonItem
            active={activePanel === "available-nodes"}
            onClick={() => {
              setShowPanel(true);
              setActivePanel("available-nodes");
            }}
          >
            <Icon icon="mynaui:grid" className="size-5" />
          </SidebarButtonItem>

          <SidebarButtonItem
            active={activePanel === "node-properties"}
            onClick={() => {
              setShowPanel(true);
              setActivePanel("node-properties");
            }}
          >
            <Icon icon="mynaui:layers-three" className="size-5" />
          </SidebarButtonItem>
        </div>
      </div>
    </div>
  );
}
