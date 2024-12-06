import {
  BarChart3,
  LayoutDashboard,
  Settings,
  Eye,
  BookOpenText,
  CloudSun,
} from "lucide-react";

import { useExpanded } from "../../hooks/useExpanded";

import VvLogo from "../VvLogo";
import ModalMenuItem from "./ModalMenuItem";
import LogOut from "../SideBar/LogOut";

function ModalMenu() {
  const { overlayMenu, setOverlayMenu } = useExpanded();
  return (
    <nav
      onClick={() => setOverlayMenu(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
    >
      <div
        className="relative w-80 rounded-md bg-stone-100 p-6 pt-10 shadow-xl"
        onClick={(e) => e.stopPropagation()} // Prevent click propagation
      >
        <button
          onClick={() => setOverlayMenu(false)}
          className="absolute right-2 top-2 z-20 size-10 rounded-full bg-stone-200 text-4xl font-bold text-stone-600 hover:bg-stone-300 hover:text-stone-500"
        >
          &times;
        </button>
        <div className="flex items-center border-b pb-2">
          <div>
            <VvLogo classes={"h-12 w-12 text-stone-600"} />
          </div>
          <div className={`pl-2 tracking-wider text-stone-600`}>
            Veksthus Vakt
          </div>
        </div>
        <ul className="mt-2">
          <ModalMenuItem icon={<Eye size={20} />} text="Overview" />
          <ModalMenuItem icon={<CloudSun size={20} />} text="Weather" />
          <ModalMenuItem icon={<LayoutDashboard size={20} />} text="Sensors" />
          <ModalMenuItem icon={<BarChart3 size={20} />} text="Statistics" />
          <ModalMenuItem icon={<Settings size={20} />} text="Admin" />
          <ModalMenuItem icon={<BookOpenText size={20} />} text="About" />
        </ul>
        <LogOut />
      </div>
    </nav>
  );
}

export default ModalMenu;
