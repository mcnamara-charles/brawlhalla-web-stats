import "./DotRing.css";
import useMousePosition from "../../hooks/mousePosition.js";

const DotRing = ({mouseOut}) => {
    // 1.
  const { x, y } = useMousePosition();
  return (
    <>
            {/* 3. */}
      <div
        className={mouseOut ? "dot hidden" : "dot"}
        style={{ left: `${x}px`, top: `${y}px` }}
      ></div>
    </>
  );
};

export default DotRing;