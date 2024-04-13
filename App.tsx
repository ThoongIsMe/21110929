import React, { useCallback, useRef, useState } from 'react';
import { View, Text, StyleSheet, VirtualizedList } from 'react-native';
import PrimaryButton from './components/PrimaryButton';
import OutPut from './components/OutPut';

function App(): React.JSX.Element {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [buttonColor, setButtonColor] = useState('green');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const initialTimeRef = useRef(0);

  const [listTimeLap, setListTimeLap] = useState<number[]>([]);
  const [lastLapTime, setLastLapTime] = useState(0);

  const lapStopWatch = useCallback(() => {
    const currentTime = Date.now();
    const lapTime = currentTime - lastLapTime;
    setListTimeLap(prevListTimeLap => [lapTime, ...prevListTimeLap]);
    setLastLapTime(currentTime);
  }, [lastLapTime]);

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
      setButtonColor('red');
    }
  }, [running, paused, time]);

  const stopStopwatch = () => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setRunning(false);
    setPaused(true);
    setButtonColor('green');
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setTime(0);
    setRunning(false);
    setPaused(false);
    setListTimeLap([]);
    setButtonColor('green');
  };

  const formatTime = useCallback((milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const millisecondsRemaining = Math.floor((milliseconds % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')},${millisecondsRemaining.toString().padStart(2, '0')}`;
  }, []);


  const getCurrentGuesslength = listTimeLap.length;

  return (
    <View style={{ backgroundColor: 'black', height: '100%' }}>
      <View>
        <Text style={styles.textTime}>{formatTime(time)}</Text>
      </View>
      <View style={styles.buttonPrimary}>
        {running && !paused ? (
          <>
            <View>
              <PrimaryButton onPress={lapStopWatch}>Lap</PrimaryButton>
            </View>
            <View>
              <PrimaryButton onPress={stopStopwatch} backgroundColor="red">
                Stop
              </PrimaryButton>
            </View>
          </>
        ) : paused ? (
          <>

            <View>
              <PrimaryButton onPress={resetStopwatch}>Reset</PrimaryButton>
            </View>
            <View>
              <PrimaryButton onPress={startStopwatch} backgroundColor={buttonColor}>
                Start
              </PrimaryButton>
            </View>
          </>
        ) : (
          <>
            <View>
              <PrimaryButton onPress={lapStopWatch}>Lap</PrimaryButton>
            </View>
            <View>
              <PrimaryButton onPress={startStopwatch} backgroundColor={buttonColor}>
                Start
              </PrimaryButton>
            </View>
          </>
        )}
      </View>
      <View>
        <View>
          <VirtualizedList
            data={listTimeLap}
            renderItem={(itemdata: any) => (
              <OutPut textColor={
                itemdata.item === Math.max(...listTimeLap) ? 'red' :
                  itemdata.item === Math.min(...listTimeLap) ? 'green' : undefined
              }>
                Lap {getCurrentGuesslength - itemdata.index}                            {formatTime(itemdata.item)}
              </OutPut>
            )}
            getItemCount={() => listTimeLap.length}
            getItem={(data, index) => data[index]}
            keyExtractor={(item, index) => `recipe-${index}`}
            initialNumToRender={10}
            windowSize={5}
          />
        </View>

      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  textTime: {
    fontSize: 70,
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
