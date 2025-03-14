import { ReactSVG } from "react-svg";
import { useState, useRef, useEffect } from "react";
import { SectionTitleOne } from "../../elements/sectionTitle/SectionTitle";
import Modal from 'react-bootstrap/Modal';
import scheduleData from '../../../data/schedule/schedule-2024.json'
import Image from "next/image";
import Link from "next/link";

const MapComponent = () => {
  const [scale, setScale] = useState(1); // Initial scale
  const [isDragging, setIsDragging] = useState(false); // Dragging state
  const [startPos, setStartPos] = useState(null); // Initial touch/mouse position
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // Current offset
  const mapRef = useRef(null); // Reference to the map container
  const [modalContent, setModalContent] = useState(null); // To hold the modal content
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open/close state
  const [countdown, setCountdown] = useState(''); // Countdown state

  useEffect(() => {
    let interval;
    
    if (modalContent?.date) {
      interval = setInterval(() => {
        const newCountdown = countdownToEvent(modalContent?.date);
        setCountdown(newCountdown);
        
        if (newCountdown === 'Race has already happened!') {
          clearInterval(interval);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [modalContent?.date]);

  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.3, 6));
  };

  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.3, 0.5)); 
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
            const raceClicked = target.getAttribute('data-name')
            const raceData = scheduleData.schedule.find(race => race.ref === raceClicked);
            
            console.log(raceData);

            if (raceData) {
              setModalContent(raceData);
              setIsModalOpen(true);
            }
          };
  
          const handleTouch = (e) => {
            if (isDragging) return; 
            e.preventDefault();
            const target = e.currentTarget;
            const raceClicked = target.getAttribute('data-name')
            const raceData = scheduleData.schedule.find(race => race.ref === raceClicked);
            console.log(raceData);

            if (raceData) {
              setModalContent(raceData);
              setIsModalOpen(true);
            }
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

  function countdownToEvent(eventDate) {
    const targetDate = new Date(eventDate);
    
    const currentTime = new Date();
    
    const timeDifference = targetDate - currentTime;
  
    if (timeDifference <= 0) {
      return "Event has already passed!";
    }
  
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
  

  return (
    <>
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

      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header>
          <Modal.Title>
            <p><strong>Round:</strong> {modalContent?.round}</p>
            {modalContent?.raceName}&nbsp;&nbsp;&nbsp;<span dangerouslySetInnerHTML={{ __html: modalContent?.flag }} />
            <p style={{color: '#e10600'}}>Countdown: {countdown}</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Image 
              height={310}
              width={410}
              priority={true} 
              src={modalContent?.featureImg} alt={modalContent?.raceName} 
              style={{ width: "100%" }} 
            />
          </div>
          <div>
            <p><strong>Circuit:</strong> {modalContent?.circuitName}</p>
            <p><strong>Location:</strong> {modalContent?.location}</p>
            <p><strong>Date:</strong> {modalContent?.date}</p>
            <p><strong>Laps:</strong> {modalContent?.laps}</p>
            <p><strong>Circuit Length:</strong> {modalContent?.circuitLength}</p>
            <p><strong>Lap Record:</strong> {modalContent?.lapRecord}</p>
            <p><strong>Type:</strong> {modalContent?.type}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Link href={`/calendar#${modalContent?.ref}`}>
            <button className="axil-button button-rounded">View</button>
          </Link>
          <button className="axil-button button-rounded" onClick={() => setIsModalOpen(false)}>Close</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MapComponent;
