import Lottie from "lottie-react";
import { useState } from "react";
import EyeUserFollow from "../../public/eye.json";

export default function Description({
  text,
  length,
  border,
}: {
  text: string;
  length: number;
  border?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (text?.length === 0 || text === null) {
    return null;
  } else if (text?.length < length) {
    return (
      <>
        {border ? <div className="border-b border-gray-200"></div> : ""}
        <p className="my-3 text-left text-sm font-semibold text-gray-600">
          {text}
        </p>
      </>
    );
  } else {
    return (
      <>
        {border ? <div className="border-b border-gray-200"></div> : ""}
        <div className="relative w-full ">
          <button onClick={toggleExpand} className=" ">
            <p
              className={`text-left text-sm font-semibold leading-7 text-gray-600 ${
                !isExpanded ? "line-clamp-2" : ""
              }`}
            >
              {text}
              {/* <span className="text-lg text-black ">
                {isExpanded ? "Show more" : "Show less"}
              </span> */}
            </p>
            <p className="flex items-center gap-2 text-left font-bold text-black">
              {isExpanded ? "Show less" : "Show more"}
              <Lottie
                animationData={EyeUserFollow}
                loop
                autoplay
                style={{ height: 28, width: 28 }}
              />
            </p>
          </button>
        </div>
      </>
    );
  }
}
