import React, { ReactNode } from 'react';
import './tabs.css';

type TabsProps = {
    children: ReactNode[]
}

const Tabs = (props: TabsProps) => {
    const { children } = props;
    return <div>tabs
        <div className='tabs'>{children.map(item => item)}</div>
    </div>
}

export default Tabs