import { ReactSVG } from "react-svg";
import { useState, useRef, useEffect } from "react";

const MapComponent = () => {
  const [scale, setScale] = useState(1); 
  const [isDragging, setIsDragging] = useState(false); 
  const [offset, setOffset] = useState({ x: 0, y: 0 }); 
  const mapRef = useRef(null); 

  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 3));  
  };

  // Zoom out function
  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.5));  
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    document.body.style.cursor = "grabbing"; 
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setOffset({
        x: offset.x + e.movementX,
        y: offset.y + e.movementY,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.cursor = "grab";
  };

  const handleMouseOver = () => {
    if (!isDragging) {
      document.body.style.cursor = "grab"; 
    }
  };

  const handleMouseOut = () => {
    if (!isDragging) {
      document.body.style.cursor = "default"; 
    }
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    document.body.style.cursor = "grabbing"; 
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      const touch = e.touches[0];
      setOffset({
        x: offset.x + touch.clientX - (offset.x || touch.clientX),
        y: offset.y + touch.clientY - (offset.y || touch.clientY),
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    document.body.style.cursor = "grab"; 
  };

  useEffect(() => {
    const mapElement = mapRef.current;

    mapElement.addEventListener("touchstart", handleTouchStart);
    mapElement.addEventListener("touchmove", handleTouchMove);
    mapElement.addEventListener("touchend", handleTouchEnd);

    return () => {
      mapElement.removeEventListener("touchstart", handleTouchStart);
      mapElement.removeEventListener("touchmove", handleTouchMove);
      mapElement.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, offset]);

  return (
    <div className="map-component bg-color-grey pt--60 pb--60" style={{ position: "relative", overflow: "hidden" }}>
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
                -
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
                +
            </button>
        </div>
        <div
            ref={mapRef}
            style={{
                transform: `scale(${scale}) translate(${offset.x}px, ${offset.y}px)`,
                cursor: isDragging ? "grabbing" : "grab",
                transition: "transform 0.2s ease", 
            }}
            onMouseDown={handleMouseDown}  
            onMouseMove={handleMouseMove}  
            onMouseUp={handleMouseUp}      
            onMouseLeave={handleMouseOut} 
            onMouseOver={handleMouseOver} 
        >
            <ReactSVG src="/images/others/map.svg" />
        </div>
    </div>
  );
};

export default MapComponent;
