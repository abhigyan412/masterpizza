import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "../pages/AdminDashboard/Layouts/AppLayout";
import ItemSizeMaster from "../pages/Masters/ItemSize/ItemSizeMaster";
import ItemTypeMaster from "../pages/Masters/ItemType/ItemTypeMaster";
import ItemMaster from "../pages/Masters/Item/ItemMaster";
import LoginLayout from "../pages/UserLogin/Layouts/LoginLayout";
import Login from "../pages/UserLogin/Login/Login";
import ItemPriceMaster from "../pages/Masters/ItemPrice/ItemPriceMaster";
import ItemPackageMaster from "../pages/Masters/ItemPackage/ItemPackageMaster";
import OrderList from "../pages/Orders/OrderList/OrderListMaster";
import OutOfStock from "../pages/OutofStock/OutofStockMaster";
import Itembase from "../pages/Masters/ItemBase/ItemBase";
import ToppingMaster from "../pages/Masters/Topping/ToppingMaster";
import SpicyMaster from "../pages/Masters/Spicy/SpicyMaster";
import IODMaster from "../pages/ItemManagement/Itemoftheday/IODMaster";
import AddpromotionMaster from "../pages/ItemManagement/Addpromotion/AddpromotionMaster";
import ItemdelayMaster from "../pages/ItemManagement/Itemdelay/Itemdelaymaster";
import BlockList from "../pages/BlockList/BlocklistMaster";
import Offers from "../pages/Masters/Offers/OfferMaster";
import StoreClose from "../pages/StoreClose/StoreCloseMaster";
import ModifierMaster from "../pages/Masters/Modifiers/ModifierMaster";
import ModifierGroupMaster from "../pages/Masters/ModifierGroup/ModifierGroupMaster";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginLayout />}>
        <Route index element={<Login />} />
        <Route path="exp" element={<h1>Expenses</h1>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>

      <Route path="/App" element={<AppLayout />}>
        <Route path="ItemType" element={<ItemTypeMaster />} />
        <Route path="ItemSize" element={<ItemSizeMaster />} />
        <Route path="Item" element={<ItemMaster />} />
        <Route path="ItemPrice" element={<ItemPriceMaster />} />
        <Route path="ItemPackage" element={<ItemPackageMaster />} />
        <Route path="ItemBase" element={<Itembase />} />
        <Route path="Topping" element={<ToppingMaster />} />
        <Route path="Spicy" element={<SpicyMaster />} />
        <Route path="Offers" element={<Offers />} />
        <Route path="Storeclose" element={<StoreClose />} />
        <Route path="Modifiers" element={<ModifierMaster />} />
        <Route path="ModifierGroup" element={<ModifierGroupMaster />} />
        <Route path="Orderlist" element={<OrderList />} />
        <Route path="Outofstock" element={<OutOfStock />} />
        <Route path="Itemoftheday" element={<IODMaster />} />
        <Route path="Addpromotion" element={<AddpromotionMaster />} />
        <Route path="Itemdelay" element={<ItemdelayMaster />} />
        <Route path="Blocklist" element={<BlockList />} />
        <Route path="*" element={<h1>App Not Found</h1>} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
