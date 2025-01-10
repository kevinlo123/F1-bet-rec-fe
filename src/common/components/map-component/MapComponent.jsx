import { ReactSVG } from "react-svg";
import { useState, useRef, useEffect } from "react";

const MapComponent = () => {
  const [scale, setScale] = useState(1); // Initial scale
  const [isDragging, setIsDragging] = useState(false); // Dragging state
  const [startPos, setStartPos] = useState(null); // Initial touch/mouse position
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // Current offset
  const mapRef = useRef(null); // Reference to the map container

  // Zoom In
  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 3)); // Max scale
  };

  // Zoom Out
  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.5)); // Min scale
  };

  // Handle drag start
  const handleStart = (e) => {
    e.preventDefault();
    const pos = e.touches
      ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
      : { x: e.clientX, y: e.clientY };

    setStartPos(pos);
    setIsDragging(true);
    document.body.style.cursor = "grabbing";
  };

  // Handle drag move
  const handleMove = (e) => {
    if (!isDragging || !startPos) return;

    const pos = e.touches
      ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
      : { x: e.clientX, y: e.clientY };

    const deltaX = pos.x - startPos.x;
    const deltaY = pos.y - startPos.y;

    setOffset((prevOffset) => ({
      x: prevOffset.x + deltaX,
      y: prevOffset.y + deltaY,
    }));

    setStartPos(pos); // Update start position for smooth drag
  };

  // Handle drag end
  const handleEnd = () => {
    setIsDragging(false);
    document.body.style.cursor = "grab";
  };

  useEffect(() => {
    const mapElement = mapRef.current;

    if (!mapElement) return;

    mapElement.addEventListener("touchstart", handleStart, { passive: false });
    mapElement.addEventListener("touchmove", handleMove, { passive: false });
    mapElement.addEventListener("touchend", handleEnd);

    return () => {
      mapElement.removeEventListener("touchstart", handleStart);
      mapElement.removeEventListener("touchmove", handleMove);
      mapElement.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, startPos]);

  return (
    <div
      className="map-component bg-color-grey pt--60 pb--60"
      style={{ position: "relative", overflow: "hidden", touchAction: "none" }}
    >
      {/* Zoom Buttons */}
      <div className="map-buttons">
        <button
          onClick={zoomIn}
          style={{
            zIndex: 10,
            padding: "10px 20px",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          +
        </button>
        <button
          onClick={zoomOut}
          style={{
            zIndex: 10,
            padding: "10px 20px",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          -
        </button>
      </div>

      {/* SVG Map */}
      <div
        ref={mapRef}
        style={{
          transform: `scale(${scale}) translate(${offset.x}px, ${offset.y}px)`,
          transformOrigin: "center center",
          cursor: isDragging ? "grabbing" : "grab",
          transition: isDragging ? "none" : "transform 0.2s ease", // Smooth zoom
        }}
        onMouseDown={handleStart} // Start dragging
        onMouseMove={handleMove} // Dragging
        onMouseUp={handleEnd} // End dragging
        onMouseLeave={handleEnd} // Reset on leave
      >
        <ReactSVG src="/images/others/map.svg" />
      </div>
    </div>
  );
};

export default MapComponent;
