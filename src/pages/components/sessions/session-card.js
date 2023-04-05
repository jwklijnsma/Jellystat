import React from "react";
import { Link } from 'react-router-dom';

import AccountCircleFillIcon from "remixicon-react/AccountCircleFillIcon";
import PlayFillIcon from "remixicon-react/PlayFillIcon";
import PauseFillIcon from "remixicon-react/PauseFillIcon";

import { clientData } from "../../../lib/devices";

function ticksToTimeString(ticks) {
  // Convert ticks to seconds
  const seconds = Math.floor(ticks / 10000000);

  // Calculate hours, minutes, and remaining seconds
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // Format the time string as hh:MM:ss
  const timeString = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;

  return timeString;
}

function sessionCard(props) {
  // Access data passed in as a prop using `props.data`

  if (props.data.session.NowPlayingItem === undefined) {
    return (
      <div key={props.data.session.Id} className="session-card">
        <div className="card-banner"></div>

        <div className="card-details">
          <div className="card-device">
            <img
              className="card-device-image"
              src={
                props.data.base_url +
                "/web/assets/img/devices/" +
                +
                (props.data.session.Client.toLowerCase().includes("web") ? 
                ( clientData.find(item => props.data.session.DeviceName.toLowerCase().includes(item)) || "other")
                :
                ( clientData.find(item => props.data.session.Client.toLowerCase().includes(item)) || "other")
                )
                +
                ".svg"
              }
              alt=""
            ></img>
            <div className="card-device-name">
              {props.data.session.DeviceName}
            </div>
            <div className="card-client">
              {props.data.session.Client +
                " " +
                props.data.session.ApplicationVersion}
            </div>
          </div>

          <div className="card-user">
            {props.data.session.UserPrimaryImageTag !== undefined ? (
              <img
                className="card-user-image"
                src={
                  props.data.base_url +
                  "/Users/" +
                  props.data.session.UserId +
                  "/Images/Primary?tag=" +
                  props.data.session.UserPrimaryImageTag +
                  "&quality=50"
                }
                alt=""
              />
            ) : (
              <AccountCircleFillIcon />
            )}
            <div className="card-username"> {props.data.session.UserName}</div>
          </div>

          <div className="card-play-state"></div>
          <div className="card-item-name"> </div>

          <div className="card-playback-position"> </div>
        </div>

        <div className="progress-bar">
          <div className="progress" style={{ width: `0%` }}></div>
        </div>
      </div>
    );
  }

  return (
    <div

      className="session-card"
      style={{
        backgroundImage: `url(${
          props.data.base_url +
          "/Items/" +
          (props.data.session.NowPlayingItem.SeriesId
            ? props.data.session.NowPlayingItem.SeriesId
            : props.data.session.NowPlayingItem.Id) +
          "/Images/Backdrop?fillHeight=320&fillWidth=213&quality=80"
        })`,
      }}
    >
      <div className="card-banner">
        <img
          className="card-banner-image"
          src={
            props.data.base_url +
              "/Items/" +
              (props.data.session.NowPlayingItem.SeriesId
                ? props.data.session.NowPlayingItem.SeriesId
                : props.data.session.NowPlayingItem.Id) +
                "/Images/Primary?fillHeight=320&fillWidth=213&quality=50"
          }
          alt=""
        ></img>
      </div>

      <div className="card-details">
        <div className="card-device">
          <img
            className="card-device-image"
            src={
              props.data.base_url +
              "/web/assets/img/devices/" 
              +
              (props.data.session.Client.toLowerCase().includes("web") ? 
              ( clientData.find(item => props.data.session.DeviceName.toLowerCase().includes(item)) || "other")
              :
              ( clientData.find(item => props.data.session.Client.toLowerCase().includes(item)) || "other")
              )
              +
              ".svg"
            }
            alt=""
          ></img>
          <div className="card-device-name">
            {" "}
            {props.data.session.DeviceName}
          </div>
          <div className="card-client">
            {props.data.session.Client +
              " " +
              props.data.session.ApplicationVersion}
          </div>
        </div>

        <div className="card-user">
          {props.data.session.UserPrimaryImageTag !== undefined ? (
            <img
              className="card-user-image"
              src={
                props.data.base_url +
                "/Users/" +
                props.data.session.UserId +
                "/Images/Primary?tag=" +
                props.data.session.UserPrimaryImageTag +
                "&quality=50"
              }
              alt=""
            />
          ) : (
            <AccountCircleFillIcon />
          )}
          <div className="card-username"><Link to={`/users/${props.data.session.UserId}`}>{props.data.session.UserName}</Link> </div>
        </div>

        <div className="card-play-state">
          {props.data.session.PlayState.IsPaused ? (
            <PauseFillIcon />
          ) : (
            <PlayFillIcon />
          )}
        </div>
        <div className="card-item-name">
          {" "}
          {props.data.session.NowPlayingItem.Name}
        </div>

        <div className="card-playback-position">
          {" "}
          {ticksToTimeString(props.data.session.PlayState.PositionTicks)} /{" "}
          {ticksToTimeString(props.data.session.NowPlayingItem.RunTimeTicks)}
        </div>
      </div>

      <div className="progress-bar">
        <div
          className="progress"
          style={{
            width: `${
              (props.data.session.PlayState.PositionTicks /
                props.data.session.NowPlayingItem.RunTimeTicks) *
              100
            }%`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default sessionCard;