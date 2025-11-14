import React, { useEffect, useState } from 'react';
import { Menu, MenuProps } from 'antd';
import { getModes } from '@/services/modes';
import { Mode } from '@/types/modes';

const Navbar = () => {
  const [menuItems, setMenuItems] = useState<MenuProps["items"]>([]);
  const [current, setCurrent] = useState<string>("");

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  useEffect(() => {
    const loadData = async () => {
      const modes = await getModes();

      if (!modes) {
        setMenuItems([]);
        return;
      }

      const formatted = modes.map((mode: Mode) => ({
        key: mode.id.toString(),
        label: mode.name,
      }));

      setMenuItems(formatted);
    };

    loadData();
  }, []);

  return <Menu 
    triggerSubMenuAction={"click"} 
    className='rounded-md text-center shadow-xl' 
    onClick={onClick} 
    selectedKeys={[current]} 
    mode="horizontal" 
    items={menuItems} 
  />;
}

export default Navbar