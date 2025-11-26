"use client"
import React, { useEffect, useState } from 'react';
import { Menu, MenuProps } from 'antd';
import { getModes } from '@/services/modes';
import { Mode } from '@/types/modes';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const [menuItems, setMenuItems] = useState<MenuProps["items"]>([]);
  const [current, setCurrent] = useState<string>("");

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    const formattedRoute = `/${e.key.toLowerCase().replace(" ", "-")}`
    console.log(formattedRoute)
    router.push(formattedRoute);
  };

  useEffect(() => {
    const loadData = async () => {
      const modes = await getModes();

      if (!modes) {
        setMenuItems([]);
        return;
      }

      const formatted = modes.map((mode: Mode) => ({
        key: mode.name,
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