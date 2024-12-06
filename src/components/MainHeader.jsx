import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { useExpanded } from "../hooks/useExpanded";

function MainHeader() {
  const { setOverlayMenu } = useExpanded();
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [date, setDate] = useState();
  const dateFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const formattedDate = new Date().toLocaleDateString(
        "en-GB",
        dateFormatOptions,
      ); // Outputs: "Thursday 14 November, 2024"

      setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }));
      setDate(formattedDate);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="z-20 flex w-full select-none bg-stone-100 px-4 py-1 shadow lg:pb-4 lg:pt-5">
      <button
        className="mr-2 flex size-10 items-center justify-center rounded-md border-2 hover:bg-stone-200 lg:hidden"
        onClick={() => setOverlayMenu(true)}
      >
        <Menu className="h-8 w-8 text-stone-600" />
      </button>
      <div className="flex items-center">
        <h1 className="text-md md:text-lg">{time}</h1>
        <h1 className="text-md ml-2 border-l-2 border-stone-400 pl-2 md:text-lg">
          {date}
        </h1>
      </div>
    </div>
  );
}
export default MainHeader;
