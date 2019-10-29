import React from "react";
import { styled } from "../../style";

function getTrianglePoints(
  size: number,
  xOffset: number = 100,
  yOffset: number = 100
): string {
  let trianglePoints: number[][] = [];

  trianglePoints.push([100, 100]);
  trianglePoints.push([100 + size, 100]);
  trianglePoints.push([100 + size / 2, 100 - Math.sin(Math.PI / 3) * size]);

  console.log(Math.sin(Math.PI / 6));

  // trianglePoints.push([100, -100]);

  return trianglePoints
    .map(p => {
      // p[0] -= 100;
      // p[1] -= 100;
      return p.join(",");
    })
    .join(" ");
}

export default function RelationshipIcon() {
  return (
    <svg
      viewBox="0 0 320 320"
      width={320}
      height={320}
      stroke="blue"
      fill="black"
    >
      {/* <rect stroke="none" fill="black" width="10" height="10" /> */}
      <polygon points={getTrianglePoints(40)}>
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from={`100 ${100 - Math.sin(Math.PI / 6) * 40} 0`}
          to="360 60 70"
          dur="10s"
          repeatCount="indefinite"
        />
      </polygon>
      {/* <polygon points={getTrianglePoints(90)} /> */}
    </svg>
  );
}
