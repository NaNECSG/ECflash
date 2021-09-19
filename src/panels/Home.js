import React from 'react'
import {
  Panel,
  PanelHeader,
  Group,
  Button,
  Div,
  IconButton,
  Header
} from '@vkontakte/vkui'
import { Icon28LightbulbCircleFillYellow, Icon28LightbulbOutline } from '@vkontakte/icons'
import './style.css'

const Home = ({ id, btns, activeN, started, tgBtn, isAvailable, stst }) => (
  <Panel id={id}>
    <PanelHeader>VK Mini Apps 40</PanelHeader>
    <Group header={<Header>Бит-фонарик</Header>}>
      <Div className="btns">
        {btns.map((btn, ind) =>
          <IconButton
            className={(ind == activeN && started || !isAvailable) ? "active" : ""}
            onClick={() => tgBtn(ind)}>
            {btn ? <Icon28LightbulbCircleFillYellow /> : <Icon28LightbulbOutline />}
          </IconButton>
        )}
      </Div>
    </Group>
    <Group>
      <Div>
        <Button
          stretched
          size="l"
          mode="primary"
          disabled={isAvailable == false}
          onClick={stst}
        >{started ? "Выключить" : "Включить"}</Button>
      </Div>
    </Group>
  </Panel>
)

export default Home
