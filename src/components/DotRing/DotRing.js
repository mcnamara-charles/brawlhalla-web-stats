import "./DotRing.css";
import useMousePosition from "../../hooks/mousePosition.js";

const DotRing = ({mouseOut, clicked}) => {
    // 1.
  const { x, y } = useMousePosition();
  return (
    <>
      <div
        className={mouseOut ? "dot hidden" : clicked ? "dot clicked" : "dot"}
        style={{ left: `${x}px`, top: `${y}px` }}
      ></div>
    </>
  );
};

export default DotRing;