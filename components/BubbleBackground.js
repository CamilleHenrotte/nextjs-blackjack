"use client";
import React, { useEffect, useState } from "react";

// Function to check if a point (x, y) is inside an ellipse with center (h, k) and radii a, b
function isPointInEllipse(x, y, h, k, a, b) {
  const equation = (x - h) ** 2 / a ** 2 + (y - k) ** 2 / b ** 2;
  return equation <= 1;
}
function isPointInRing(x, y, h, k, aOuter, bOuter, aInner, bInner) {
  // Check if the point is inside the outer ellipse
  const equationOuter = (x - h) ** 2 / aOuter ** 2 + (y - k) ** 2 / bOuter ** 2;
  // Check if the point is inside the inner ellipse
  const equationInner = (x - h) ** 2 / aInner ** 2 + (y - k) ** 2 / bInner ** 2;
  // The point must be inside the outer ellipse but outside the inner ellipse
  return equationOuter <= 1 && equationInner > 1;
}

// Function to generate random x and y positions in percentage within the provided ranges (0-100)
function getRandomPosition(xMin, xMax, yMin, yMax) {
  const x = Math.random() * (xMax - xMin) + xMin; // x in range [xMin, xMax]
  const y = Math.random() * (yMax - yMin) + yMin; // y in range [yMin, yMax]
  return { x, y };
}

function getRandomPositionsInEllipse(count, xMin, xMax, yMin, yMax) {
  const positions = [];
  for (let i = 0; i < count; i++) {
    const { x, y } = getRandomPosition(xMin, xMax, yMin, yMax);
    if (isPointInEllipse(x, y, 50, 0, 80, 70)) {
      positions.push({ x, y });
    }
  }
  return positions;
}
function getRandomPositionsInRing(count, xMin, xMax, yMin, yMax) {
  const positions = [];
  for (let i = 0; i < count; i++) {
    const { x, y } = getRandomPosition(xMin, xMax, yMin, yMax);
    if (isPointInRing(x, y, 50, 0, 80, 70, 70, 60)) {
      positions.push({ x, y });
    }
  }
  return positions;
}

// Component representing a bubble with dynamic top and left positions in percentage
const Bubble = ({ top, left, fill, stroke, radius, opacity }) => {
  return (
    <div style={{ position: "absolute", top: `${top}%`, left: `${left}%` }}>
      <svg height="100" width="100" xmlns="http://www.w3.org/2000/svg">
        <circle
          r={radius}
          cx="50"
          cy="50"
          fill={fill}
          stroke={stroke}
          strokeWidth="1"
          opacity={opacity}
        />
      </svg>
    </div>
  );
};

const BubbleBackground = () => {
  const [bubbles, setBubbles] = useState({
    bubble1: [],
    bubble2: [],
    bubble3: [],
    bubble4: [],
    bubble5: [],
  });

  useEffect(() => {
    // Calculate bubble positions on client-side
    const bubble1 = getRandomPositionsInEllipse(1000, -14, 100, -5, 100);
    const bubble2 = getRandomPositionsInEllipse(3000, -14, 100, -5, 100);
    const bubble3 = getRandomPositionsInEllipse(2000, -14, 100, -5, 100);
    const bubble4 = getRandomPositionsInEllipse(1000, -14, 100, -5, 100);
    const bubble5 = getRandomPositionsInRing(20000, -14, 100, 0, 100);

    setBubbles({ bubble1, bubble2, bubble3, bubble4, bubble5 });
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        display: "flex",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e3fcf1",
      }}
    >
      {bubbles.bubble1.map((pos, index) => (
        <Bubble
          key={`bubble1-${index}`}
          top={pos.y}
          left={pos.x}
          fill="#11ed8a"
          stroke="#11ed8a"
          radius="10"
          opacity="0.2"
        />
      ))}
      {bubbles.bubble2.map((pos, index) => (
        <Bubble
          key={`bubble2-${index}`}
          top={pos.y}
          left={pos.x}
          fill="#24ab82"
          stroke="#0ac78d"
          radius="6"
          opacity="0.2"
        />
      ))}
      {bubbles.bubble3.map((pos, index) => (
        <Bubble
          key={`bubble3-${index}`}
          top={pos.y}
          left={pos.x}
          fill="#11ed8a"
          stroke="#11ed8a"
          radius="15"
          opacity="0.2"
        />
      ))}
      {bubbles.bubble4.map((pos, index) => (
        <Bubble
          key={`bubble4-${index}`}
          top={pos.y}
          left={pos.x}
          fill="#0e27e3"
          stroke="#0e27e3"
          radius="1"
          opacity="0.6"
        />
      ))}
      {bubbles.bubble5.map((pos, index) => (
        <Bubble
          key={`bubble5-${index}`}
          top={pos.y}
          left={pos.x}
          fill="#11ed8a"
          stroke="#11ed8a"
          radius="10"
          opacity="0.2"
        />
      ))}
    </div>
  );
};

export default BubbleBackground;
