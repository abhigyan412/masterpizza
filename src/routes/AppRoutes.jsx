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
    <Routes basename={"ccadmin"}>
      <Route path="ccadmin" element={<LoginLayout />}>
        <Route path="" element={<Login />}></Route>
        <Route path="exp" element={<h1>Expenses</h1>}></Route>
        <Route path="*" element={<h1>Not Found</h1>}></Route>
      </Route>

      <Route path="ccadmin/App" element={<AppLayout />}>
        <Route path="ItemType" element={<ItemTypeMaster />}></Route>
        <Route path="ItemSize" element={<ItemSizeMaster />}></Route>
        <Route path="Item" element={<ItemMaster />}></Route>
        <Route path="ItemPrice" element={<ItemPriceMaster />}></Route>
        <Route path="ItemPackage" element={<ItemPackageMaster />}></Route>
        <Route path="ItemBase" element={<Itembase />}></Route>
        <Route path="Topping" element={<ToppingMaster />}></Route>
        <Route path="Spicy" element={<SpicyMaster />}></Route>
        <Route path="Offers" element={<Offers />}></Route>
        <Route path="Storeclose" element={<StoreClose />}></Route>
        <Route path="Modifiers" element={<ModifierMaster />}></Route>
        <Route path="ModifierGroup" element={<ModifierGroupMaster />}></Route>
        <Route path="*" element={<h1>App Not Found</h1>}></Route>
        <Route path="Orderlist" element={<OrderList />}></Route>
        <Route path="Outofstock" element={<OutOfStock />}></Route>
        <Route path="Itemoftheday" element={<IODMaster />}></Route>
        <Route path="Addpromotion" element={<AddpromotionMaster />}></Route>
        <Route path="Itemdelay" element={<ItemdelayMaster />}></Route>
        <Route path="Blocklist" element={<BlockList />}></Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
