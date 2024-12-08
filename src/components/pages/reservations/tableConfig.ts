export interface SeatPosition {
  x: number;
  y: number;
  rotation: number;
}

export interface TableDimensions {
  width: number;
  height: number;
  capacity: SeatPosition[];
}

export interface TableConfig {
  [capacity: number]: TableDimensions;
}

export const tableConfig: TableConfig = {
  1: {
    width: 80,
    height: 80,
    capacity: [{ x: 0, y: 1.3, rotation: 0 }],
  },
  2: {
    width: 80,
    height: 80,
    capacity: [
      { x: -1.3, y: 0, rotation: -90 },
      { x: 1.3, y: 0, rotation: 90 },
    ],
  },
  3: {
    width: 80,
    height: 100,
    capacity: [
      { x: -1.3, y: 0, rotation: -90 },
      { x: 0, y: -1.3, rotation: 0 },
      { x: 1.3, y: 0, rotation: 90 },
    ],
  },
  4: {
    width: 120,
    height: 120,
    capacity: [
      { x: -1.3, y: -0.5, rotation: -90 },
      { x: -1.3, y: 0.5, rotation: -90 },
      { x: 1.3, y: -0.5, rotation: 90 },
      { x: 1.3, y: 0.5, rotation: 90 },
    ],
  },
  5: {
    width: 120,
    height: 140,
    capacity: [
      { x: 0, y: -1.25, rotation: 0 },
      { x: -1.3, y: 0, rotation: -90 },
      { x: -1.3, y: 0.5, rotation: -90 },
      { x: 1.3, y: 0, rotation: 90 },
      { x: 0, y: 1.25, rotation: -180 },
    ],
  },
  6: {
    width: 120,
    height: 160,
    capacity: [
      { x: 0, y: -1.25, rotation: 0 },
      { x: -1.3, y: -0.3, rotation: -90 },
      { x: -1.3, y: 0.3, rotation: -90 },
      { x: 1.3, y: -0.3, rotation: 90 },
      { x: 1.3, y: 0.3, rotation: 90 },
      { x: 0, y: 1.25, rotation: -180 },
    ],
  },
  7: {
    width: 120,
    height: 180,
    capacity: [
      { x: 0, y: -1.2, rotation: 0 },
      { x: -1.3, y: -0.5, rotation: -90 },
      { x: -1.3, y: 0, rotation: -90 },
      { x: 1.3, y: -0.5, rotation: 90 },
      { x: 1.3, y: 0, rotation: 90 },
      { x: 1.3, y: 0.5, rotation: 90 },
      { x: 0, y: 1.2, rotation: -180 },
    ],
  },
  8: {
    width: 120,
    height: 200,
    capacity: [
      { x: 0, y: -1.2, rotation: 0 },
      { x: -1.3, y: -0.5, rotation: -90 },
      { x: -1.3, y: 0, rotation: -90 },
      { x: -1.3, y: 0.5, rotation: -90 },
      { x: 1.3, y: -0.5, rotation: 90 },
      { x: 1.3, y: 0, rotation: 90 },
      { x: 1.3, y: 0.5, rotation: 90 },
      { x: 0, y: 1.2, rotation: -180 },
    ],
  },
  9: {
    width: 120,
    height: 220,
    capacity: [
      { x: 0, y: -1.2, rotation: 0 },
      { x: -1.3, y: -0.6, rotation: -90 },
      { x: -1.3, y: -0.2, rotation: -90 },
      { x: -1.3, y: 0.2, rotation: -90 },
      { x: 1.3, y: -0.6, rotation: 90 },
      { x: 1.3, y: -0.2, rotation: 90 },
      { x: 1.3, y: 0.2, rotation: 90 },
      { x: 1.3, y: 0.6, rotation: 90 },
      { x: 0, y: 1.2, rotation: -180 },
    ],
  },
  10: {
    width: 120,
    height: 240,
    capacity: [
      { x: 0, y: -1.2, rotation: 0 },
      { x: -1.3, y: -0.6, rotation: -90 },
      { x: -1.3, y: -0.2, rotation: -90 },
      { x: -1.3, y: 0.2, rotation: -90 },
      { x: -1.3, y: 0.6, rotation: -90 },
      { x: 1.3, y: -0.6, rotation: 90 },
      { x: 1.3, y: -0.2, rotation: 90 },
      { x: 1.3, y: 0.2, rotation: 90 },
      { x: 1.3, y: 0.6, rotation: 90 },
      { x: 0, y: 1.2, rotation: -180 },
    ],
  },
  11: {
    width: 120,
    height: 260,
    capacity: [
      { x: 0, y: -1.2, rotation: 0 },
      { x: -1.3, y: -0.7, rotation: -90 },
      { x: -1.3, y: -0.35, rotation: -90 },
      { x: -1.3, y: 0, rotation: -90 },
      { x: -1.3, y: 0.35, rotation: -90 },
      { x: 1.3, y: -0.7, rotation: 90 },
      { x: 1.3, y: -0.35, rotation: 90 },
      { x: 1.3, y: 0, rotation: 90 },
      { x: 1.3, y: 0.35, rotation: 90 },
      { x: 1.3, y: 0.7, rotation: 90 },
      { x: 0, y: 1.2, rotation: 180 },
    ],
  },
  12: {
    width: 120,
    height: 280,
    capacity: [
      { x: 0, y: -1.2, rotation: 0 },
      { x: -1.3, y: -0.7, rotation: -90 },
      { x: -1.3, y: -0.35, rotation: -90 },
      { x: -1.3, y: 0, rotation: -90 },
      { x: -1.3, y: 0.35, rotation: -90 },
      { x: -1.3, y: 0.7, rotation: -90 },
      { x: 1.3, y: -0.7, rotation: 90 },
      { x: 1.3, y: -0.35, rotation: 90 },
      { x: 1.3, y: 0, rotation: 90 },
      { x: 1.3, y: 0.35, rotation: 90 },
      { x: 1.3, y: 0.7, rotation: 90 },
      { x: 0, y: 1.2, rotation: 180 },
    ],
  },
};
