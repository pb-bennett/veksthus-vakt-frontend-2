import { LogOut as LogOutIcon } from "lucide-react";

import { useExpanded } from "../../hooks/useExpanded";
import { useData } from "../../hooks/useData";
import { useSelected } from "../../hooks/useSelected";

export default function LogOut() {
  const { expanded, enabled, setExpanded, setOverlayMenu } = useExpanded();
  const { setSelected } = useSelected();

  const { setUser, setTempReadingsData, setTempReadingsStats } = useData();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setUser(null);
    setTempReadingsData({});
    setTempReadingsStats({});
    setExpanded(false);
    setOverlayMenu(false);
    setSelected(null);
  };

  return (
    <div
      onClick={() => {
        if (!enabled) return;
        logoutHandler();
      }}
      className={`group relative my-1 ml-2 flex cursor-pointer items-center rounded-md px-3 py-2 font-medium transition-colors ${enabled && "text-gray-600 hover:bg-emerald-50"} ${!enabled && "pointer-events-none opacity-50"} `}
    >
      {<LogOutIcon size={20} />}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "ml-3 w-52" : "w-0"
        }`}
      >
        Logout
      </span>

      {!expanded && (
        <div
          className={`invisible absolute left-full ml-6 -translate-x-3 rounded-md bg-emerald-100 px-2 py-1 text-sm text-emerald-800 opacity-20 transition-all group-hover:visible group-hover:translate-x-0 group-hover:bg-emerald-100 group-hover:opacity-100`}
        >
          Logout
        </div>
      )}
    </div>
  );
}
