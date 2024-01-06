import { useState, useContext } from "react";

import mediaQueryContext from "@/src/context/instances/mediaQueryContext";

import useIsomorphicLayoutEffect from "../isomorphic-effect/useIsomorphicLayoutEffect";

export enum MediaList {
  mobile = "(max-width: 767px)",
  tablet = "(max-width: 1023px)",
  laptop = "(max-width: 1279px)",
}

const useMediaQuery = (mediaExpression: `${MediaList}`) => {
  const { device } = useContext(mediaQueryContext);

  const [result, setResult] = useState(() => {
    // if the device type is mobile, all media tests will be successful
    if (device === "mobile") {
      return true;
    }

    // if the device type is tablet, true will be returned for laptop and tablet
    if (
      device === "tablet" &&
      (mediaExpression === "(max-width: 1023px)" || mediaExpression === "(max-width: 1279px)")
    ) {
      return true;
    }

    // false will be returned for the laptop media and other devices
    return false;
  });

  useIsomorphicLayoutEffect(() => {
    const match = window.matchMedia(mediaExpression);

    const changeListener = () => {
      setResult(match.matches);
    };

    setResult(match.matches);

    if ("addEventListener" in match) {
      match.addEventListener("change", changeListener);
      return () => match.removeEventListener("change", changeListener);
    }

    (match as MediaQueryList).addListener(changeListener);
    return () => (match as MediaQueryList).removeListener(changeListener);
  }, []);

  return { device, result };
};

export default useMediaQuery;
