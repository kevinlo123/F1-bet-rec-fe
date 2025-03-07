import React from 'react';
import { SectionTitleOne } from "../../elements/sectionTitle/SectionTitle";

const raceResults = [
  { position: 1, driver: "VER", team: "1:29:08.289", color: "#1E41FF", points: 25 },
  { position: 2, driver: "HAM", team: "+2.070s", color: "#00D2BE", points: 18 },
  { position: 3, driver: "LEC", team: "+2.241s", color: "#DC0000", points: 15 },
  { position: 4, driver: "NOR", team:"+4.241s", color: "#FF8700", points: 12 },
  { position: 5, driver: "PER", team: "+8.141s", color: "#1E41FF", points: 10 },
  { position: 6, driver: "SAI", team: "+8.141s", color: "#DC0000", points: 8 },
  { position: 7, driver: "RUS", team: "+8.141s", color: "#00D2BE", points: 6 },
  { position: 8, driver: "ALO", team: "+8.141s", color: "#006F62", points: 4 },
  { position: 9, driver: "GAS", team: "+8.141s", color: "#0090FF", points: 2 },
  { position: 10, driver: "PIA", team: "+8.141s", color: "#FF8700", points: 1 },
  { position: 11, driver: "MAG", team: "+8.141s", color: "#FFFFFF", points: 0 },
  { position: 12, driver: "OCO", team: "+8.141s", color: "#0090FF", points: 0 },
  { position: 13, driver: "TSU", team: "+8.141s", color: "#5E8FAA", points: 0 },
  { position: 14, driver: "HUL", team: "+8.141s", color: "#FFFFFF", points: 0 },
  { position: 15, driver: "ZHO", team: "+8.141s", color: "#900000", points: 0 },
  { position: 16, driver: "RIC", team: "+8.141s", color: "#5E8FAA", points: 0 },
  { position: 17, driver: "SAR", team: "+8.141s", color: "#005AFF", points: 0 },
  { position: 18, driver: "ALB", team: "+8.141s", color: "#005AFF", points: 0 },
  { position: 19, driver: "STR", team: "+8.141s", color: "#006F62", points: 0 },
  { position: 20, driver: "BOT", team: "+8.141s", color: "#900000", points: 0 }
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
