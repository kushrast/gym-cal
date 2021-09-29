import logo from './logo.svg';
import 'bulma/css/bulma.min.css';
import './App.css';
import {Heading, Icon} from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import React from 'react';


function Header(props) {
  const style = {
    "paddingTop": "100px"
  }

  return (
    <div>
      <p style={style} className="title is-1">Gym Cal</p>
      <hr/>
    </div>
    );
}

class DayCard extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {workoutType: 0};
    this.workoutTypes = ["", "L", "Ch/S", "Ba", "Cdio"];
  }
  getClasses() {
    if (this.props.displayState === "exclude") {return "card empty-card"};
    return "card day-card";
  };

  getClassesForDay() {
    if (this.props.displayState === "past") {return "card-day level-left card-day-passed"};
    if (this.props.displayState === "today") {return "card-day level-left card-day-today"};
    return "card-day level-left";
  }

  toggleWorkout = () => {
    this.setState({workoutType: (this.state.workoutType + 1) % this.workoutTypes.length})
  }

  render() {
    return (
      <div className="column"> 
        <div className={this.getClasses()}>
          { !(this.props.displayState === "exclude") ? 
            <div className="day-card-content">
              <div className="card-day-header">
                <div className={this.getClassesForDay()}>
                  {this.props.day}
                </div>
              </div>
              <div className="card-main-content columns is-centered" onClick={this.toggleWorkout}>
                <div className="workout-text"> {this.workoutTypes[this.state.workoutType]} </div>
              </div>
              <div className="card-date-footer">
                {this.props.date}
              </div>
            </div>
          : null }
        </div>
      </div>
      );
  }
}

class WeekRow extends React.Component {
  render() {
    return (
        <div className="columns is-spaced week-row">
          {this.props.days.map((value, index) => {return <DayCard {...value}/>})}
        </div>
      )
  }
}

class Calendar extends React.Component {
  render () {
    return (
      <div className="calendar">
        <WeekRow days={[{date: "19", day:"Su", displayState: "exclude"}, {date: "20", day:"M", displayState: "exclude"}, {date: "21", day:"T", displayState: "exclude"}, {date: "22", day:"W", displayState: "exclude"}, {date: "23", day:"Th", displayState: "past"}, {date: "24", day:"F", displayState: "past"}, {date: "25", day:"S", displayState: "past"}]}/>
        <WeekRow days={[{date: "26", day:"Su", displayState: "past"}, {date: "27", day:"M", displayState: "past"}, {date: "28", day:"T", displayState: "today"}, {date: "29", day:"W"}, {date: "30", day:"Th"}, {date: "31", day:"F"}, {date: "9/1", day:"S"}]}/>
        <WeekRow days={[{date: "2", day:"Su"}, {date: "3", day:"M"}, {date: "4", day:"T"}, {date: "5", day:"W"}, {date: "6", day:"Th"}, {date: "7", day:"F"}, {date: "7", day:"Sa"}]}/>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <div className="container">
        {Header()}
        {<Calendar/>}
      </div>
    </div>
  );
}

export default App;
