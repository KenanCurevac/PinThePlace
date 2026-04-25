export type GameStore = {
  timerStopped: boolean;
  scrollToNum: null | number;
  isCalculating: boolean;
  setTimerStopped: (stopped: boolean) => void;
  setScrollTo: (questionNum: number) => void;
  setIsCalculating: (value: boolean) => void;
};
