import { App, Gtk } from "astal/gtk3";
import AstalHyprland from "gi://AstalHyprland";
import { bind, Variable } from "astal";
import { ButtonProps } from "astal/gtk3/widget";

type WsButtonProps = ButtonProps & {
  ws: AstalHyprland.Workspace;
};

function range(max: number) {
  return Array.from({ length: max - 1 }, (_, i) => i);
}

function WorkspaceButton({ ws, ...props }: WsButtonProps) {
  const hypr = AstalHyprland.get_default();

  return (
    <button
      valign={Gtk.Align.CENTER}
      css={`
        border-radius: 100px;
      `}
      className={bind(hypr, "focusedWorkspace").as((fw) =>
        ws.id === fw.id ? "workspace-focused" : "workspace-button",
      )}
      onClicked={() => ws.focus()}
      {...props}
    />
  );
}

export default function Workspaces() {
  return (
    <box className="workspace-container" spacing={4}>
      {range(7).map((i) => (
        <WorkspaceButton ws={AstalHyprland.Workspace.dummy(i + 1, null)} />
      ))}
    </box>
  );
}
