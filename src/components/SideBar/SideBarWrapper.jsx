import {
  BarChart3,
  LayoutDashboard,
  Settings,
  Eye,
  BookOpenText,
  CloudSun,
} from "lucide-react";
import SideBar from "./SideBar";
import { SidebarItem } from "./SideBar";
import { useExpanded } from "../../hooks/useExpanded";

function SideBarWrapper() {
  const { expanded, setExpanded } = useExpanded();

  return (
    <div className={`z-10 hidden shadow lg:block`}>
      <SideBar expanded={expanded} setExpanded={setExpanded}>
        <SidebarItem icon={<Eye size={20} />} text="Overview" />
        <SidebarItem icon={<CloudSun size={20} />} text="Weather" />
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Sensors" />
        <SidebarItem icon={<BarChart3 size={20} />} text="Statistics" />
        <SidebarItem icon={<Settings size={20} />} text="Admin" />
        <SidebarItem icon={<BookOpenText size={20} />} text="About" />
      </SideBar>
    </div>
  );
}
export default SideBarWrapper;
