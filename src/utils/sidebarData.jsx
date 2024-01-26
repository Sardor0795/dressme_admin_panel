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
    title: "Магазины",
    path: "/shops",
    icon: <SidebarShopIcon />,
  },
  {
    id: 3,
    title: "Локации",
    path: "/locations",
    icon: <SidebarLocationsIcon />,
  },
  {
    id: 4,
    title: "Товары",
    path: "/clothes",
    icon: <ClothesIcon />,
  },
];
