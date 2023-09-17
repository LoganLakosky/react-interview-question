/* eslint-disable @typescript-eslint/no-explicit-any */
import { SyntheticEvent, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import "./App.css";

type DotsProps = {
  clientX: number;
  clientY: number;
};

function App() {
  const [currDots, setCurrDots] = useState<DotsProps[]>([]);
  const [undoneDots, setUndoneDots] = useState<any>([]);

  function getClickPos(e: SyntheticEvent) {
    let clientX: number = Object.values(e)[14];
    let clientY: number = Object.values(e)[17];

    clientX = clientX - 267;
    clientY = clientY - 216;

    setCurrDots([...currDots, { clientX, clientY }]);

    console.log(currDots);
  }

  function undoDot() {
    if (currDots.length === 0) {
      alert("Please add a dot before you try undoing one");
      return;
    }

    const undoneDot: any = currDots.pop();
    setCurrDots((prev) => [...prev]);
    setUndoneDots((prev: any) => [...prev, undoneDot]);
  }

  function redoDot() {
    if (undoneDots.length === 0) {
      alert("Please undo a dot before you try redoing one");
      return;
    }

    const mostRecentUndoneDot = undoneDots.pop();

    setCurrDots((prev) => [...prev, mostRecentUndoneDot]);
  }

  return (
    <main className="mainPageContainer">
      <div className="topOfPage">
        <div className="undoBtnContainer">
          <button onClick={() => undoDot()}>Undo</button>
        </div>
        <div className="redoBtnContainer">
          <button onClick={() => redoDot()}>Redo</button>
        </div>
      </div>
      <div className="mainPage" id="click-area" onClick={getClickPos}>
        {currDots.map((item: any) => {
          return (
            <div
              key={uuidv4()}
              className="dot"
              style={{
                backgroundColor: "white",
                position: "absolute",
                top: item.clientY,
                left: item.clientX,
              }}
            ></div>
          );
        })}
      </div>
    </main>
  );
}

export default App;
