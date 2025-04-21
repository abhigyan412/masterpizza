export const LOGIN = {
  VALIDATELOGIN: "/ValidateLogin",
  //VALIDATELOGIN: "ValidateLogin",
};

export const ITEM_TPYE = {
  ADD: "AddItemType",
  LOAD: "ItemType",
  EDIT: "EditItemType",
  DELETE: "ItemType",
};
// export const ITEM_TPYE = {
//   ADD: "AddItemType",
//   LOAD: "ItemType",
//   EDIT: "EditItemType",
//   DELETE: "ItemType",
// };
export const ITEM_SIZE = {
  ADD: "AddItemSize",
  LOAD: "ItemSize",
  EDIT: "EditItemSize",
  DELETE: "ItemSize",
};

// export const ITEM_SIZE = {
//   ADD: "AddItemSize",
//   LOAD: "ItemSize",
//   EDIT: "EditItemSize",
//   DELETE: "ItemSize",
// };

export const ITEM_MASTER = {
  ADD: "ItemMaster",
  LOAD: "LoadItemMaster",
  //LOAD: "LoadItemMaster",
  EDIT: "ItemMaster",
  DELETE: "ItemMaster",
  DOWNLOAD: "DownloadMasterItems?customerId=",
  ADDINSTRUCTION: "RestaurantInstruction",
  LOADINSTRUCTION: "RestaurantInstruction?customerid=",
  LOADWEEK: "WeekDDL",
  // ADD: "Additemmaster",
  // LOAD: "Loaditemmaster",
  // EDIT: "Edititemmaster",
  // DELETE: "Deleteitemmaster",
};

// export const ITEM_PRICE = {
//   ADD: "AddItemPrice",
//   LOAD: "ItemPrice",
//   EDIT: "EditItemPrice",
//   DELETE: "ItemPrice",
// };
export const ITEM_PRICE = {
  ADD: "AddItemPrice",
  LOAD: "ItemPrice",
  EDIT: "EditItemPrice",
  DELETE: "ItemPrice",
  GET_ITEM_SIZE: "ItemSizebyItemCode",
};
export const ITEM_PACKAGE = {
  // ADD: "Additempackage",
  // LOAD: "Loaditempackage",
  // EDIT: "Edititempackage",
  // DELETE: "Deleteitempackage",
  ADD: "ItemPackage",
  LOAD: "ItemPackage",
  EDIT: "ItemPackage",
  DELETE: "ItemPackage",
  ITEM_TYPE: "ItemTypeDDL",
  ITEM_NAME: "ItemnameDDL",
  GET_ITEM_SIZE: "ItemSizebyItemCode",
  DOWNLOAD: "DownloadMasterItems?customerId=",
};

export const ORDERS_LIST = {
  // LIST: "order/getorderheaderinfo?CustomerId=",
  LIST: "order/getorderheaderinfo",
  VIEW: "order/getorderdetailsbyorderno?CustomerId=",
  STATUS: "order/updateorderstatus",
  TIME: "order/updateordertiming",
};

export const OUT_OF_STOCK = {
  LIST: "order/loadItemmasterforOOS",
  ADD: "order/addOutofstocks",
  LOAD: "order/loadOutofstocks",
  UPDATE: "order/updateoutofstock",
};
// export const ITEM_BASE = {
//   ADD: "AddItemBase",
//   LIST: "ItemBase",
//   UPDATE: "EditItemBase",
//   DELETE: "ItemBase",
// };
export const ITEM_BASE = {
  ADD: "AddItemBase",
  LIST: "ItemBase",
  UPDATE: "EditItemBase",
  DELETE: "ItemBase",
};
export const TOPPING = {
  ADD: "Toppings",
  LOAD: "Toppings",
  EDIT: "Toppings",
  DELETE: "Toppings",
};
// export const TOPPING = {
//   ADD: "Toppings",
//   LOAD: "Toppings",
//   EDIT: "Toppings",
//   DELETE: "Toppings",
// };
export const ITEM_SPICY = {
  ADD: "spicy",
  LIST: "spicy",
  UPDATE: "spicy",
  DELETE: "spicy",
};
// export const ITEM_SPICY = {
//   ADD: "spicy",
//   LIST: "spicy",
//   UPDATE: "spicy",
//   DELETE: "spicy",
// };
export const ITEM_OF_THE_DAY = {
  ADD: "store/additemoftheday",
  LOAD: "store/getitemoftheday",
  DELETE: "store/removeitemoftheday",
};
export const ADD_PROMOTION = {
  ADD: "store/additempromotion",
  LOAD: "store/getitempromotion",
  DELETE: "store/removeitempromotion",
};

export const ITEM_DELAY = {
  ADD: "store/additemdelay",
  LOAD: "store/getitemdelaylist",
  DELETE: "store/removeitemdelay",
};

export const BLOCK_LIST = {
  ADD: "store/addblacklist",
  LOAD: "store/getblacklist",
  LIST: "store/getBlacklistmembers",
  DELETE: "store/removeblacklist",
};
export const AUDIO_ITEM = {
  LOAD: "loadaudioitemddl",
};

export const OFFERS = {
  ADD: "Offeritem",
  LOAD: "Offeritem",
  DELETE: "Offeritem",
  GET_ITEM_SIZE: "ItemSizebyItemCode",
};
// export const OFFERS = {
//   ADD: "Offeritem",
//   LOAD: "Offeritem",
//   DELETE: "Offeritem",
//   //GET_ITEM_SIZE: "order/getitemsizebyitemcode",
// };
export const STORE_CLOSE = {
  LOAD: "store/loadstoretiming",
  GETSTORE_DETAILS: "store/getstoredetailsbymenuid",
};

export const MODIFIERS = {
  LOAD: "Modifiers",
};

export const MODIFIER_GROUP = {
  LOAD: "ModifierGroups",
  VIEW: "Modifiersgroup",
  VIEWGROUP: "Modifiersgroups",
};
