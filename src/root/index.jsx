import { Navigate, Route, Routes } from "react-router-dom";
import { SignInPage } from "../pages/signIn";
import { Sidebar } from "../components/sidebar";
import { SellersPage } from "../pages/sellers";
import { MoreAbout } from "../components/moreAbout";
import SellersList from "../components/Sellers/SellersList/SellersList";
import { ClothesPage } from "../pages/clothes";
import ClothesList from "../components/clothes/clothesList/clothesList";
import { ClothMoreAbout } from "../components/clothes/moreAbout";
import { ShopsPage } from "../pages/shops";
import ShopsList from "../components/shops/shopsList/shopsList";
import { LocationsPage } from "../pages/locations";
import LocationsList from "../components/locations/clothesList/locationsList.jsx";
import { LocationsMoreAbout } from "../components/locations/moreAbout/locationsMoreAbout.jsx";
import ShopsMoreAbout from "../components/shops/shopsList/shopsItem/shopsMoreAbout/shopsMoreAbout.jsx";
import ShopLocations from "../components/shops/shopsList/shopsItem/shopLocations/shopLocations.jsx";
import LocationMoreAbout from "../components/shops/shopsList/shopsItem/shopLocations/LocationMoraAbout/shopLocationMoreAbout.jsx";

export const Root = () => {
  return (
    <>
      <Routes>
        <Route element={<Sidebar />}>
          <Route path="/sellers" element={<SellersPage />}>
            <Route index element={<SellersList />} />
            <Route path="/sellers/seller/:id" element={<MoreAbout />} />
            <Route path="/sellers/sellerList" element={<SellersList />} />
          </Route>
          <Route path="/clothes" element={<ClothesPage />}>
            <Route index element={<ClothesList />} />
            <Route path="/clothes/cloth/:id" element={<ClothMoreAbout />} />
          </Route>
          <Route path="/locations" element={<LocationsPage />}>
            <Route index element={<LocationsList />} />
            <Route
              path="/locations/location/:id"
              element={<LocationsMoreAbout />}
            />
          </Route>
          <Route path="/shops" element={<ShopsPage />}>
            <Route index element={<ShopsList />} />
            <Route path="/shops/shop/:id" element={<ShopsMoreAbout />} />
            <Route path="/shops/locations/:id" element={<ShopLocations />} />
            <Route
              path="/shops/locations/location/:id"
              element={<LocationMoreAbout />}
            />
          </Route>
        </Route>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/" element={<Navigate to="/signin" />} />
      </Routes>
    </>
  );
};
