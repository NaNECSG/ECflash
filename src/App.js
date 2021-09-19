import React, { useState, useEffect } from 'react'
import bridge from '@vkontakte/vk-bridge'
import {
  View,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  Snackbar
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Home from './panels/Home';

let interval = null;
let _activeN = 0;
let _started = false;
let _btns = [true, false, true, false, true, false, true, false];

const App = () => {
  const [activeN, setActiveBit] = useState(0);
  const [started, setStarted] = useState(false);
  const [btns, setBtns] = useState([true, false, true, false, true, false, true, false]);
  const [isAvailable, setIsAvailable] = useState(true);
  const [snack, setSnack] = useState(null);

  useEffect(() => {
    bridge.send("VKWebAppFlashGetInfo")
      .then((data) => {
        if (!data.is_available) {
          setSnack(
            <Snackbar
              onClose={() => { setSnack(null) }}
            >Не поддерживается на этой платформе</Snackbar>
          );
        }
        setIsAvailable(data.is_available);
      })
  }, [])




  function start() {
    _activeN = 0;
    setActiveBit(0);
    bridge.send("VKWebAppFlashSetLevel", { level: 0 })
      .then((data) => {
        if (data.result == true) {
          setFL(btns[0]);
          setStarted(true);
          interval = setInterval(() => {
            _activeN++;
            if (_activeN > 7) {
              _activeN = 0;
            }
            setFL(_btns[_activeN]);
            setActiveBit(_activeN);
          }, 1000)
        }
      })
  }

  function stop(reset = true) {
    if (reset) {
      setFL(false);
    }
    setStarted(false);
    clearInterval(interval);
  }

  function stst() {
    _started = !_started;
    if (_started) {
      start();
    } else {
      stop();
    }
  }

  function tgBtn(n) {
    _btns = [...btns];
    _btns[n] = !_btns[n];
    setBtns(_btns);
  }

  function setFL(vl) {
    bridge.send("VKWebAppFlashSetLevel", { level: vl ? 1 : 0 })
      .then()
      .catch((e) => {
        stop(false);
        setSnack(
          <Snackbar
            onClose={() => setSnack(null)}
          >Ошибка. Разрешите доступ к камере для работы фонарика.</Snackbar>
        );
      })
  }

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <View activePanel='home'>
            <Home
              id='home'
              tgBtn={tgBtn}
              btns={btns}
              activeN={activeN}
              stst={stst}
              started={started}
              isAvailable={isAvailable}
            />
          </View>
          {snack}
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  )
}

export default App

