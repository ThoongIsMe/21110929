/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';


import PrimaryButton from './components/PrimaryButton';
import OutPut from './components/OutPut';

function App(): React.JSX.Element {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const initialTimeRef = useRef(0); // Thời điểm ban đầu của stopwatch


  const [listTimeLap, setListTimeLap] = useState<number[]>([]);

  const [lastLapTime, setLastLapTime] = useState(0);

  const lapStopWatch = useMemo(() => {
    return () => {
      const currentTime = Date.now();
      const lapTime = currentTime - lastLapTime;
      setListTimeLap(listTimeLap => [lapTime, ...listTimeLap]);
      setLastLapTime(currentTime);
    };
  }, [lastLapTime, setListTimeLap, setLastLapTime]);

  const getCurrentGuesslength = listTimeLap.length;

  const startStopwatch = useCallback(() => {
    if (!running) {
      if (paused) {
        initialTimeRef.current = Date.now() - time;
      } else {
        initialTimeRef.current = Date.now();
      }
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - initialTimeRef.current);
      }, 1);

      setRunning(true);
      setPaused(false);
      setLastLapTime(Date.now());
    }
  }, [running, paused, time]);


  const stopStopwatch = () => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setRunning(false);
    setPaused(true);
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const millisecondsRemaining = Math.floor((milliseconds % 1000) / 10); // Lấy hai chữ số cuối cùng
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')},${millisecondsRemaining.toString().padStart(2, '0')}`; // Sử dụng hai chữ số
  };



  const resetStopwatch = () => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setTime(0);
    setRunning(false);
    setPaused(false);
    setListTimeLap([]);

  };
  return (
    <View >
      <View>
        <Text style={styles.textTime}>{formatTime(time)}</Text>
      </View>
      <View style={styles.buttonPrimary}>
        {(running && !paused) ? (
          <>
            <PrimaryButton onPress={lapStopWatch}>Lap</PrimaryButton>
            <PrimaryButton onPress={stopStopwatch}>Stop</PrimaryButton>
          </>
        ) : (paused) ? (
          <>
            <PrimaryButton onPress={resetStopwatch}>Reset</PrimaryButton>
            <PrimaryButton onPress={startStopwatch}>Start</PrimaryButton>
          </>
        ) : (
          <>
            <PrimaryButton onPress={lapStopWatch}>Lap</PrimaryButton>
            <PrimaryButton onPress={startStopwatch}>Start</PrimaryButton>
          </>
        )}
      </View>



      <View >
        <FlatList
          data={listTimeLap}
          renderItem={(itemdata: any) => (
            <OutPut>#{getCurrentGuesslength - itemdata.index}--{formatTime(itemdata.item)}</OutPut>
          )}
          keyExtractor={(item, index) => `recipe-${index}`}
        />
      </View>



    </View >
  );
}

const styles = StyleSheet.create({
  textTime: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 50,

  },
  buttonPrimary: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 100,
    borderRadius: 50,
  },

});

export default App;