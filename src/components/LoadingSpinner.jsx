import { ThreeCircles } from "react-loader-spinner";

function LoadingSpinner() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <ThreeCircles
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor="#6EE7B7"
        innerCircleColor="#10B981"
        middleCircleColor="#34D399"
      />
    </div>
  );
}
export default LoadingSpinner;
