import { useRef, type ReactNode } from "react";

import { useInView } from "framer-motion";

interface InViewData {
  isInView: boolean;
}

interface InViewWrapperProps {
  children?: (inViewData: InViewData) => ReactNode;
	className?: string
}

const InViewWrapper: React.FC<InViewWrapperProps> = ({ children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const renderChildren = () => (typeof children === "function" ? children({ isInView }) : children);

  return <div ref={ref} className={className}>{renderChildren()}</div>;
};

export default InViewWrapper;
