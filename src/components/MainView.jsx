import { useSelected } from "../hooks/useSelected";

import Overview from "../components/Overview/Overview";
import Statistics from "../components/Statistics/Statistics";
import Sensors from "./Sensors/Sensors";
import Admin from "../components/Admin/Admin";
import About from "../components/About/About";
import MainHeader from "../components/MainHeader";
import Weather from "./Weather/Weather";

function MainView() {
  const { selected } = useSelected();

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col">
      <MainHeader />
      {selected === "Overview" && <Overview />}
      {selected === "Weather" && <Weather />}
      {selected === "Statistics" && <Statistics />}
      {selected === "Sensors" && <Sensors />}
      {selected === "Admin" && <Admin />}
      {selected === "About" && <About />}
    </div>
  );
}
export default MainView;
