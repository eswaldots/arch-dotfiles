import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Variable } from "astal";
import Workspaces from "./components/Workspaces";
import Profile, { ProfileMenu } from "./components/Profile";
import StatusControls from "./components/StatusControls";

const time = Variable("").poll(1000, "date");

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

  return (
    <window
      className="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={App}
    >
      <centerbox>
        <box valign={Gtk.Align.CENTER} halign={Gtk.Align.START}>
          <Profile />
        </box>

        <box hexpand valign={Gtk.Align.CENTER} halign={Gtk.Align.CENTER}>
          <Workspaces />
        </box>

        <box hexpand halign={Gtk.Align.END}>
          <StatusControls />
        </box>
      </centerbox>
    </window>
  );
}
