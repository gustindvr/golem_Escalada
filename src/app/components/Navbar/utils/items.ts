import { MenuProps } from "antd";

type MenuItem = Required<MenuProps>['items'][number];

export const getModes = async () => {
  const modes = await fetch("/api/modes")
      .then(res => res.json());
  return modes.data
}

export const items: MenuItem[] = [
  {
    label: "Muro libre",
    key: "Muro libre",
  },
  {
    label: "Clases técnica",
    key: "Clases técnica"
  },
  {
    label: "Escuelita",
    key: "Escuelita"
  }
]