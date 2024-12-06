import PropTypes from "prop-types";
import { createAvatar } from "@dicebear/core";
import { initials } from "@dicebear/collection";
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";

import { useExpanded } from "../../hooks/useExpanded";
import { useSelected } from "../../hooks/useSelected";
import { useData } from "../../hooks/useData";

import VvLogo from "../VvLogo";
import LogOut from "./LogOut";

export default function Sidebar({ children }) {
  const { expanded, setExpanded } = useExpanded();
  const { user } = useData();
  const avatar = createAvatar(initials, {
    seed: user?.username,
    backgroundColor: ["00897b"],
  }).toDataUri();

  return (
    <aside className="z-20 h-screen select-none">
      <nav className="flex h-full flex-col bg-stone-100 shadow">
        <div className="flex items-center justify-between border-b p-4 pb-2 text-gray-700">
          <div className="flex items-center">
            <div>
              <VvLogo
                classes={`overflow-hidden transition-all ${expanded ? "w-10" : "w-0"}`}
              />
            </div>
            <div
              className={`overflow-hidden pl-2 tracking-wider transition-all ${expanded ? "" : "hidden"}`}
            >
              Veksthus Vakt
            </div>
          </div>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="rounded-lg border bg-gray-50 p-2 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <ul className="mt-1 flex-1 px-3">{children}</ul>
        <LogOut />
        <div className="flex border-t p-3">
          <img className="m-1 size-10 rounded-full" src={avatar} alt="Avatar" />
          <div
            className={`flex items-center justify-between overflow-hidden text-gray-700 transition-all ${expanded ? "ml-3 w-52" : "w-0"} `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{user?.username}</h4>
              <span className="text-xs text-gray-600">{user?.email}</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text }) {
  const { expanded, enabled, setOverlayMenu } = useExpanded();
  const { selected, setSelected } = useSelected();

  const isActive = selected === text;

  return (
    <li
      onClick={() => {
        if (!enabled) return;
        setSelected(text);
        setOverlayMenu(false);
      }}
      className={`group relative my-1 flex cursor-pointer items-center rounded-md px-3 py-2 font-medium transition-colors ${
        isActive
          ? "bg-gradient-to-tr from-emerald-200 to-emerald-100 text-emerald-800"
          : "text-gray-600 hover:bg-emerald-50"
      } ${!enabled && "pointer-events-none opacity-50"} `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "ml-3 w-52" : "w-0"
        }`}
      >
        {text}
      </span>

      {!expanded && (
        <div
          className={`invisible absolute left-full ml-6 -translate-x-3 rounded-md bg-emerald-100 px-2 py-1 text-sm text-emerald-800 opacity-20 transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100`}
        >
          {text}
        </div>
      )}
    </li>
  );
}

SidebarItem.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool,
  alert: PropTypes.bool,
};

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};
