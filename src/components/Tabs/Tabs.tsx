import React, { ReactNode, useState } from 'react'
import './tabs.css'

interface TabsProps {
  children: ReactNode[]
}

enum TabNames {
  'List' = 0,
  'Groups' = 1
}

const Tabs = (props: TabsProps) => {
  const { children } = props
  const [tab, setTab] = useState(TabNames.List)
  return <div>tabs
        <div className='tabs'>
            <div onClick={() => setTab(TabNames.List)}>Контакты</div>
            <div onClick={() => setTab(TabNames.Groups)}>Группы</div>
        </div>
        <div>{children[tab]}</div>
    </div>
}

export default Tabs
