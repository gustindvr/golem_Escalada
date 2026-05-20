"use client"
import React, { useEffect, useState } from 'react';
import { Menu, MenuProps, Button } from 'antd';
import { getModes } from '@/services/modes';
import { Mode } from '@/types/modes';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

const Navbar = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [menuItems, setMenuItems] = useState<MenuProps["items"]>([]);
  const [current, setCurrent] = useState<string>("");

  const onClick: MenuProps['onClick'] = (e) => {
    if (!isAuthenticated) return;
    setCurrent(e.key);
    const formattedRoute = `/${e.key.toLowerCase().replace(" ", "-")}`;
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
        disabled: !isAuthenticated,
      }));

      setMenuItems(formatted);
    };

    loadData();
  }, [isAuthenticated]);

  return (
    <div className="flex items-center justify-between gap-4 rounded-md text-center shadow-xl">
      <Menu
        triggerSubMenuAction={"click"}
        className='rounded-md text-center shadow-xl flex-1'
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={menuItems}
      />
      {!isAuthenticated && (
        <Button className='ml-2' type="primary" onClick={() => router.push('/login')}>
          Ingresar
        </Button>
      )}
    </div>
  );
}

export default Navbar;