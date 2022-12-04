import React, { Component } from "react";
import { Slide, VerticalCarousel } from "../components";
import content from "./HomeContent.json";
import { config } from "@react-spring/web";

interface Slide {
  key: number;
  title: string;
  text1: string;
  text2: string;
  label: string;
  link: string;
  reverse: boolean;
}

export default class Home extends Component {
  state = {
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true,
    config: config.gentle,
  };

  content = [
    {
      key: 1,
      title: "ragilab color lottery",
      text1:
        "Pick your favorite color and win the jackpot on the first lottery on substrate.",
      text2:
        "Use the frontend and the contract (written in ink!) as base for your own project - and get rich quick",
      label: "Submit Bet",
      link: "/lottery",
      reverse: false,
    },
    {
      key: 2,
      title: "Rules",
      text1: "100% of all bets are distributed to the winner.",
      text2: "",
      label: "Github",
      link: "https://www.google.ch/",
      reverse: true,
    },
    {
      key: 3,
      title: "Source",
      text1: "Check out the source on github, write PR's, add Issues, fork it.",
      text2: "",
      label: "Github",
      link: "https://www.google.ch/",
      reverse: false,
    },
  ];

  render() {
    let slides = this.content.map((slide: Slide) => {
      return {
        key: slide.key,
        title: slide.title,
        text1: slide.text1,
        text2: slide.text2,
        label: slide.label,
        link: slide.link,
        reverse: slide.reverse,
      };
    });
    return (
      <div
        style={{
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100vw",
          margin: "0 auto",
        }}
      >
        <VerticalCarousel
          slides={slides}
          offsetRadius={this.state.offsetRadius}
          showNavigation={this.state.showNavigation}
          animationConfig={this.state.config}
        />
      </div>
    );
  }
}
