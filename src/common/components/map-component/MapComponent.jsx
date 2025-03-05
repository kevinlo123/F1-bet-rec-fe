import { ReactSVG } from "react-svg";
import { useState, useRef, useEffect } from "react";
import { SectionTitleOne } from "../../elements/sectionTitle/SectionTitle";

const MapComponent = () => {
  const [scale, setScale] = useState(1); // Initial scale
  const [isDragging, setIsDragging] = useState(false); // Dragging state
  const [startPos, setStartPos] = useState(null); // Initial touch/mouse position
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // Current offset
  const mapRef = useRef(null); // Reference to the map container

  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.3, 6)); // Max scale
  };

  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.3, 0.5)); // Min scale
  };

  const handleStart = (e) => {
    e.preventDefault();
    const pos = e.touches
      ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
      : { x: e.clientX, y: e.clientY };

    setStartPos(pos);
    setIsDragging(true);
    document.body.style.cursor = "grabbing";
  };

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

    setStartPos(pos); 
  };

  const handleEnd = () => {
    setIsDragging(false);
    document.body.style.cursor = "";
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      const flags = document.querySelectorAll(".clickable-flag");
  
      if (flags.length === 0) return;
  
      flags.forEach((flag) => {
        if (!flag.getAttribute("data-listener-attached")) {
          const handleClick = (e) => {
            if (isDragging) return; 
            e.preventDefault();
            const target = e.currentTarget; 
            alert(`Flag clicked: ${target}`);
          };
  
          const handleTouch = (e) => {
            if (isDragging) return; 
            e.preventDefault();
            const target = e.currentTarget; 
            console.log("Flag touched:", target);
          };
  
          flag.addEventListener("click", handleClick);
          flag.addEventListener("touchstart", handleTouch, { passive: false });
  
          flag.setAttribute("data-listener-attached", "true");
        }
      });
  
      clearInterval(intervalId); 
    }, 200);
  
    return () => clearInterval(intervalId); 
  }, [isDragging]);
  

  return (
    <>
      <div className=" bg-color-grey pb--40">
        <div className="plr--135 plr_lg--30 plr_md--30 plr_sm--30">
          <SectionTitleOne title="2025 Formula 1 world championship season overview" />
          <div>
            <span>Explore the Formula 1 season like never before with our interactive map! Follow the journey race to race as the season unfolds in real time race after race.</span>  
          </div>
          <div>
            <span style={{color: "#e10600"}}>Current: R1 - Australian Grand Prix on <span style={{textDecoration: 'underline'}}>Sun, Mar 16, 12:00 AM</span></span>
          </div>
          <div>
            <span style={{color: "#e10600"}}>Next: R2 - Chinese Grand Prix on <span style={{textDecoration: 'underline'}}>Sun, Mar 23, 3:00 AM</span></span>
          </div>
        </div>
      </div>
      <div
        className="map-component bg-color-grey pt--60 pb--60"
        style={{ position: "relative", overflow: "hidden", touchAction: "none" }}
      >
      <div className="map-buttons">
        <button
          onClick={zoomIn}
          style={{
            zIndex: 10,
            padding: "10px 10px",
            borderRadius: "5px",
          }}
        >
        <i className="fal fa-plus"></i>
        </button>
        <button
          onClick={zoomOut}
          style={{
            zIndex: 10,
            padding: "10px 10px",
            borderRadius: "5px",
          }}
        >
        <i className="fal fa-minus"></i>
        </button>
      </div>

      <div
        ref={mapRef}
        style={{
            transform: `scale(${scale}) translate(${offset.x}px, ${offset.y}px)`,
            transformOrigin: "center center",
            cursor: isDragging ? "grabbing" : "grab", 
            transition: isDragging ? "none" : "transform 0.2s ease", 
        }}
        onMouseDown={handleStart} 
        onMouseMove={handleMove} 
        onMouseUp={handleEnd} 
        onMouseLeave={handleEnd} 
        >
          <ReactSVG src="/images/others/map.svg" />
        </div>
      </div>
    </>
  );
};

export default MapComponent;
