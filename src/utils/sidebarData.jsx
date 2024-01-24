import {
  ClothesIcon,
  SidebarLocationsIcon,
  SidebarShopIcon,
  UsersProfileIcon,
} from "../assets/icon";

export const sidebarData = [
  {
    id: 1,
    title: "Продавцы",
    path: "/sellers",
    icon: <UsersProfileIcon />,
  },
  {
    id: 2,
    title: "Shops",
    path: "/shops",
    icon: <SidebarShopIcon />,
  },
  {
    id: 3,
    title: "Товары",
    path: "/clothes",
    icon: <ClothesIcon />,
  },
  {
    id: 4,
    title: "Локации",
    path: "/locations",
    icon: <SidebarLocationsIcon />,
  },
];
