import { ReactSVG } from "react-svg";
import { useState, useRef, useEffect } from "react";
import { SectionTitleOne } from "../../elements/sectionTitle/SectionTitle";
import { useRouter } from "next/router";

const MapComponent = () => {
  const [scale, setScale] = useState(1); // Initial scale
  const [isDragging, setIsDragging] = useState(false); // Dragging state
  const [startPos, setStartPos] = useState(null); // Initial touch/mouse position
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // Current offset
  const mapRef = useRef(null); // Reference to the map container
  const router = useRouter();

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
      const testy = document.querySelectorAll(".clickable-flag");
  
      if (testy.length === 0) return; // Ensure elements exist
  
      testy.forEach((flag) => {
        // Ensure only one listener is added per element
        if (!flag.getAttribute("data-listener-attached")) {
          const handleClick = (e) => {
            e.preventDefault(); // Prevent default behavior for parent <g> click
  
            const target = e.currentTarget; // The clicked <g> element
  
            // Select the inner elements to show
            const rect = target.querySelector(".tooltip-bg");
            const text = target.querySelector(".tooltip-flag");
            const linkText = target.querySelector(".flag-link text");
  
            // Set the visibility to 'visible' for each of the elements inside the <g> element
            if (rect) rect.setAttribute("visibility", "visible");
            if (text) text.setAttribute("visibility", "visible");
            if (linkText) linkText.setAttribute("visibility", "visible");
  
            const handleOutsideClick = (e) => {
              if (!target.contains(e.target)) {
                // Reset visibility to hidden when clicking outside
                if (rect) rect.setAttribute("visibility", "hidden");
                if (text) text.setAttribute("visibility", "hidden");
                if (linkText) linkText.setAttribute("visibility", "hidden");
  
                // Remove the outside click event listener after hiding the tooltip
                document.removeEventListener("click", handleOutsideClick);
              }
            };
  
            // Attach the outside click event listener
            document.addEventListener("click", handleOutsideClick);
          };
  
          flag.addEventListener("click", handleClick);
          flag.setAttribute("data-listener-attached", "true");
  
          // Handle click on the anchor itself, allow it to navigate to the URL
          const linkText = flag.querySelector(".flag-link");
          if (linkText) {
            linkText.addEventListener("click", (e) => {
              // Allow the link to work as expected
              setTimeout(() => {
                router.push(e.target.parentElement.href.animVal);
              }, 100);
              return true
            });
          }
  
          // Cleanup function for this specific flag
          return () => {
            flag.removeEventListener("click", handleClick);
          };
        }
      });
  
      clearInterval(intervalId); // Stop polling once the elements are found
    }, 200); // Poll every 200ms
  }, []);
  

  return (
    <>
      <div className=" bg-color-grey  pb--30">
        <div className="container">
          <SectionTitleOne title="2025 season overview" />
        </div>
      </div>
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
