import React from 'react';
import { SectionTitleOne } from "../../elements/sectionTitle/SectionTitle";

const raceResults = [
  { position: 1, driver: "VER", team: "1:29:08.289", color: "#00017d", points: 25 }, // Red Bull Racing
  { position: 2, driver: "HAM", team: "+2.070s", color: "#E8002D", points: 18 }, // Ferrari
  { position: 3, driver: "LEC", team: "+2.241s", color: "#E8002D", points: 15 }, // Ferrari
  { position: 4, driver: "NOR", team:"+4.241s", color: "#FF8000", points: 12 }, // McLaren
  { position: 5, driver: "LAW", team: "+8.141s", color: "#00017d", points: 10 }, // Red Bull Racing
  { position: 6, driver: "SAI", team: "+8.141s", color: "#64C4FF", points: 8 }, // Williams
  { position: 7, driver: "RUS", team: "+8.141s", color: "#27F4D2", points: 6 }, // Mercedes
  { position: 8, driver: "ALO", team: "+8.141s", color: "#229971", points: 4 }, // Aston Martin
  { position: 9, driver: "GAS", team: "+8.141s", color: "#FF87BC", points: 2 }, // Alpine Renault
  { position: 10, driver: "PIA", team: "+8.141s", color: "#FF8000", points: 1 }, // McLaren
  { position: 11, driver: "BEA", team: "+8.141s", color: "#B6BABD", points: 0 }, // Haas F1 Team
  { position: 12, driver: "OCO", team: "+8.141s", color: "#B6BABD", points: 0 }, // Haas F1 Team
  { position: 13, driver: "TSU", team: "+8.141s", color: "#6692FF", points: 0 }, // Visa Cashapp RB
  { position: 14, driver: "HAD", team: "+8.141s", color: "#6692FF", points: 0 }, // Visa Cashapp RB
  { position: 15, driver: "BOR", team: "+8.141s", color: "#52e252", points: 0 }, // Stake F1 Team
  { position: 16, driver: "DOO", team: "+8.141s", color: "#FF87BC", points: 0 }, // Alpine Renault
  { position: 17, driver: "ANT", team: "+8.141s", color: "#27F4D2", points: 0 }, // Mercedes
  { position: 18, driver: "ALB", team: "+8.141s", color: "#64C4FF", points: 0 }, // Williams Racing
  { position: 19, driver: "STR", team: "+8.141s", color: "#229971", points: 0 }, // Aston Martin
  { position: 20, driver: "HUL", team: "+8.141s", color: "#52e252", points: 0 }  // Stake F1 Team
];

const Leaderboard = () => {
  return (
    <div className="leaderboard bg-color-grey driver-standings-wrapper axil-section-gap pb--20">
      <div className="container" style={{textAlign: 'center', marginBottom: '5rem'}}>
        <SectionTitleOne title="Latest Grand Prix Race Results" />
        <p>Australian Grand Prix&nbsp;&nbsp;<span className="fi fi-au fi"></span></p>
      </div>
      <div className="container">
        {/* Top 3 */}
        <div className="driver-row top-three">
          {/* P1 in its own div */}
          <div className="podium first-place">
            {raceResults
              .filter((data) => data.position === 1)
              .map((data) => (
                <div className="inner driver-container" key={data.position}>
                  <div className="driver-teamColor" style={{ backgroundColor: data.color }}></div>
                  <span className="driver-position">P{data.position}</span>
                  <span className="driver">{data.driver}</span>
                  <span>{data.team}</span>
                  <span>+{data.points}pts</span>
                </div>
              ))}
          </div>

          {/* P2 & P3 in another div */}
          <div className="podium second-third-place">
            {raceResults
              .filter((data) => data.position === 2 || data.position === 3)
              .map((data) => (
                <div className="inner driver-container" key={data.position}>
                  <div className="driver-teamColor" style={{ backgroundColor: data.color }}></div>
                  <span className="driver-position">P{data.position}</span>
                  <span className="driver">{data.driver}</span>
                  <span>{data.team}</span>
                  <span>+{data.points}pts</span>
                </div>
              ))}
          </div>
        </div>

        {/* Positions 4 - 10 */}
        <div className="driver-row midfield">
          {raceResults
            .filter((data) => data.position >= 4 && data.position <= 10)
            .map((data) => (
              <div className="inner driver-container" key={data.position}>
                <div className="driver-teamColor" style={{ backgroundColor: data.color }}></div>
                <span className="driver-position">P{data.position}</span>
                <span className="driver">{data.driver}</span>
                <span>{data.team}</span>
                <span>+{data.points}pts</span>
              </div>
            ))}
        </div>

        {/* Positions 11 - 20 */}
        <div className="driver-row backmarkers">
          {raceResults
            .filter((data) => data.position > 10)
            .map((data) => (
              <div className="inner driver-container" key={data.position}>
                <div className="driver-teamColor" style={{ backgroundColor: data.color }}></div>
                <span className="driver-position">P{data.position}</span>
                <span className="driver">{data.driver}</span>
                <span>{data.team}</span>
                <span>+{data.points}pts</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};


export default Leaderboard;
