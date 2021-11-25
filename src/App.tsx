import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 100,
  strokeWidth: 6,
};

const renderTime = (dimension: any, time: any) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time:any) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time: any) =>
  ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time: any) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time: any) => (time / daySeconds) | 0;

export default function App() {
  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  console.log('startTime: ', stratTime);
  const endTime = new Date(2022, 8, 7, 13).getTime() / 1000; // use UNIX timestamp in seconds
  console.log('endTime: ', endTime);

  const remainingTime = endTime - stratTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  return (
    <div
      className="container"
      style={{ maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}
    >
      <div
        className="row justify-content-md-center"
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          textAlign: "center",
        }}
      >
        <div
          className="col-sm-3"
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            textAlign: "center",
          }}
        >
          <CountdownCircleTimer
            {...timerProps}
            colors={"#a97c24"}
            duration={daysDuration}
            initialRemainingTime={remainingTime}
          >
            {({ elapsedTime }) =>
              renderTime("dni", getTimeDays(daysDuration - elapsedTime!))
            }
          </CountdownCircleTimer>
        </div>
        <div
          className="col-sm-3"
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            textAlign: "center",
          }}
        >
          <CountdownCircleTimer
            {...timerProps}
            colors={"#a97c24"}
            duration={daySeconds}
            initialRemainingTime={remainingTime % daySeconds}
            onComplete={(totalElapsedTime) => [
              remainingTime - totalElapsedTime > hourSeconds,
              0,
            ]}
          >
            {({ elapsedTime }) =>
              renderTime("godzin", getTimeHours(daySeconds - elapsedTime!))
            }
          </CountdownCircleTimer>
        </div>
        <div
          className="col-sm-3"
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            textAlign: "center",
          }}
        >
          <CountdownCircleTimer
            {...timerProps}
            colors={"#a97c24"}
            duration={hourSeconds}
            initialRemainingTime={remainingTime % hourSeconds}
            onComplete={(totalElapsedTime) => [
              remainingTime - totalElapsedTime > minuteSeconds,
              0,
            ]}
          >
            {({ elapsedTime }) =>
              renderTime("minut", getTimeMinutes(hourSeconds - elapsedTime!))
            }
          </CountdownCircleTimer>
        </div>
        <div
          className="col-sm-3"
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            textAlign: "center",
          }}
        >
          <CountdownCircleTimer
            {...timerProps}
            colors={"#a97c24"}
            duration={minuteSeconds}
            initialRemainingTime={remainingTime % minuteSeconds}
            onComplete={(totalElapsedTime) => [
              remainingTime - totalElapsedTime > 0,
              0,
            ]}
          >
            {({ elapsedTime }) =>
              renderTime("sekund", getTimeSeconds(elapsedTime))
            }
          </CountdownCircleTimer>
        </div>
      </div>
    </div>
  );
}
