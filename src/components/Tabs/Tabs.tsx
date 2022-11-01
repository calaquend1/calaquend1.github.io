import React, { ReactNode, useState, useEffect } from 'react'
import './tabs.css'

interface TabsProps {
  children: ReactNode[]
}

enum TabNames {
  'List' = 0,
  'Groups' = 1
}

const Tabs = (props: TabsProps): JSX.Element => {
  const { children } = props
  const [tab, setTab] = useState(TabNames.List)
  const [mousePos, setMousePos] = useState<{ x: number, y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: { clientX: any, clientY: any }): void => setMousePos({ x: event.clientX, y: event.clientY })
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      )
    }
  }, [])

  const variableForGradient = (mousePos.x / window.screen.width) * 100
  return <div>
        <div className='tabs' style={{ background: `linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) ${variableForGradient}%, rgba(0,212,255,1) 100%)` }}>
            <div onClick={() => setTab(TabNames.List)}>Contacts</div>
            <div onClick={() => setTab(TabNames.Groups)}>Groups</div>
        </div>
        <div>{children[tab]}</div>
    </div>
}

export default Tabs
