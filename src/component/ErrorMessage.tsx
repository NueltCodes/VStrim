// import { GreenHorn, GreenPeople, GreenPlay } from "./Icons/Icons";
import animationData from "../../public/loading-animation3.json";
import Lottie, { useLottie } from "lottie-react";
import { GreenHorn, GreenPeople, GreenPlay } from "./icons/GreenIcons";
import AnimatePlayVideo from "../../public/Animation-play.json";
import AnimateHorn from "../../public/hornAnimate.json";

export function ErrorMessage({
  children,
  message,
  description,
  icon,
}: {
  children?: React.ReactNode;
  icon?: string;
  message: string;
  description?: string;
}) {
  const IconSelection = ({
    icon,
    className,
  }: {
    icon?: string;
    className: string;
  }) => {
    if (icon === "GreenHorn") {
      return (
        <Lottie
          animationData={AnimateHorn}
          loop
          autoplay
          style={{ height: 70, width: 70 }}
        />
      );
    } else if (icon === "GreenPeople") {
      return <GreenPeople className={className} />;
    } else {
      // return <GreenPlay className={className} />;
      return (
        <Lottie
          animationData={AnimatePlayVideo}
          loop
          autoplay
          style={{ height: 70, width: 70 }}
        />
      );
    }
  };

  return (
    <div className="relative mt-16 flex w-full flex-col items-center justify-center gap-2 text-center">
      <IconSelection className="center items-center" icon={icon} />
      <h1 className="text-2xl font-semibold text-gray-900">{message}</h1>
      <p className="max-w-xs text-gray-600">{description}</p>
      {children}
    </div>
  );
}

export function LoadingMessage() {
  const options = {
    animationData: animationData,
    loop: true,
    // autoplay: true,
  };

  const { View } = useLottie(options);

  return (
    <div className="relative mt-16 flex w-full flex-col items-center justify-center gap-2  text-center">
      <div className="animation-container">{View}</div>
      {/* <h1 className="text-2xl font-semibold text-gray-900">Loading</h1> */}
    </div>
  );
}
