import { useEffect, useState } from "react";

const useHover = (ref: React.RefObject<HTMLElement>) => {
  const [hover, setHover] = useState(false);

  const handleMouseOver = () => setHover(true);
  const handleMouseOut = () => setHover(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);
    }

    return () => {
      if (node) {
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
      }
    };
  }, [ref.current]);

  return hover;
};

export default useHover;
