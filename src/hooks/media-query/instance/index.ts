import useMediaQuery, { MediaList } from "../useMediaQuery";

const useMobile = () => {
  const { result } = useMediaQuery(MediaList.mobile);

  return result;
};

const useTablet = () => {
  const { result } = useMediaQuery(MediaList.tablet);

  return result;
};

const useLaptop = () => {
  const { result } = useMediaQuery(MediaList.laptop);

  return result;
};

/**
 * Retrieves the device information from the useMediaQuery hook.
 *
 * @returns {string} The device information. (mobile | tablet | laptop | ...)
 */
const useDevice = () => {
  const { device } = useMediaQuery(MediaList.tablet);

  return device;
};

export { useMobile, useTablet, useLaptop, useDevice };
