import React from 'react';
import SecondComponent from './SecondComponent.jsx'
import ThirdComponent from './ThirdComponent .jsx'
import FourthComponent from './FourthComponent.jsx';
import { FifthComponent } from './FourthComponent.jsx';
import { Component } from 'react/cjs/react.production.min.js';


export default class LearningComponent extends Component {
    render() {
      return (
        <div className="LearningComponent"> 
        <SecondComponent />
        <ThirdComponent />
        <FourthComponent />
        <FifthComponent />
        </div>
      );
    }
  
    }
  