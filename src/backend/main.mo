import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Order "mo:core/Order";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  include MixinStorage();

  type RestaurantInfo = {
    name : Text;
    address : Text;
    phoneNumber : Text;
    email : Text;
  };

  type MenuItem = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    category : Text;
    isAvailable : Bool;
    image : ?Storage.ExternalBlob;
  };

  module MenuItem {
    public func compare(item1 : MenuItem, item2 : MenuItem) : Order.Order {
      Nat.compare(item1.id, item2.id);
    };
  };

  type CustomerProfile = {
    name : Text;
    phone : Text;
  };

  type OrderItem = {
    menuItemId : Nat;
    quantity : Nat;
  };

  type OrderEntity = {
    id : Nat;
    customer : Principal;
    items : [OrderItem];
    message : ?Text;
    status : OrderStatus;
    customerName : Text;
    customerPhone : Text;
  };

  type OrderStatus = {
    #pending;
    #preparing;
    #ready;
    #delivered;
  };

  var nextMenuItemId = 1;
  var nextOrderId = 1;
  var restaurantInfo : RestaurantInfo = {
    name = "Swaad Wallah Sandwich";
    address = "Indrapuri Sector C, Bhopal";
    phoneNumber = "+91 9303526637";
    email = "swaadwallahbhopal@gmail.com";
  };

  let menuItems = Map.empty<Nat, MenuItem>();
  let customerProfiles = Map.empty<Principal, CustomerProfile>();
  let orders = Map.empty<Nat, OrderEntity>();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  do {
    let initialItems : [(Text, Text, Nat, Text)] = [
      ("Plain Veg Sandwich", "Fresh veggies with green chutney in soft bread", 40, "Sandwich"),
      ("Grilled Veg Sandwich", "Toasted sandwich with veggies, cheese and spices", 70, "Sandwich"),
      ("Bombay Style Sandwich", "Mumbai-style layered sandwich with potato, chutney & masala", 80, "Sandwich"),
      ("Club Sandwich", "Triple-decker with veggies, cheese and tangy sauces", 90, "Sandwich"),
      ("Aloo Tikki Sandwich", "Crispy potato tikki with chutneys and veggies", 70, "Sandwich"),
      ("Paneer Tikka Sandwich", "Grilled cottage cheese marinated in spices with peppers", 100, "Sandwich"),
      ("Cheese Grilled Sandwich", "Loaded with melted cheese, veggies and secret masala", 90, "Sandwich"),
      ("Corn & Cheese Sandwich", "Sweet corn with cheese spread and herbs", 85, "Sandwich"),
      ("Veg Mayo Sandwich", "Fresh veggies tossed in creamy mayo sauce", 75, "Sandwich"),
      ("Mushroom Cheese Sandwich", "Sauteed mushrooms with melted cheese and herbs", 95, "Sandwich"),
      ("Schezwan Veg Sandwich", "Spicy Indo-Chinese style with schezwan sauce", 85, "Sandwich"),
      ("Double Cheese Sandwich", "Extra cheese overloaded sandwich with veggies", 100, "Sandwich"),
      ("Veg Burger", "Crispy veg patty with lettuce, tomato and sauces", 60, "Burger"),
      ("Aloo Tikki Burger", "Classic potato tikki burger with chutney and veggies", 70, "Burger"),
      ("Paneer Burger", "Juicy grilled paneer patty with cheese and veggies", 90, "Burger"),
      ("Cheese Burger", "Double cheese patty with fresh veggies and special sauce", 85, "Burger"),
      ("Mushroom Burger", "Sauteed mushroom patty with garlic mayo", 85, "Burger"),
      ("Spicy Veg Burger", "Fiery spiced patty with jalapenos and spicy sauce", 80, "Burger"),
      ("Cold Coffee", "Chilled blended coffee with milk and sugar", 60, "Beverage"),
      ("Fresh Lime Soda", "Refreshing lime juice with soda and masala", 40, "Beverage"),
      ("Chocolate Milkshake", "Thick creamy chocolate milkshake", 80, "Beverage"),
      ("Strawberry Milkshake", "Fresh strawberry blended milkshake", 80, "Beverage"),
      ("Mango Shake", "Thick fresh mango milkshake", 70, "Beverage"),
      ("Masala Chai", "Freshly brewed spiced Indian tea", 20, "Beverage"),
      ("French Fries", "Crispy golden salted fries with ketchup", 60, "Snack"),
      ("Masala Fries", "Spiced fries with chaat masala and chutney", 70, "Snack"),
      ("Nachos", "Crunchy nachos with salsa and cheese dip", 80, "Snack"),
      ("Veg Puff", "Flaky pastry filled with spiced vegetable filling", 30, "Snack")
    ];
    var id = 1;
    for ((name, desc, price, cat) in initialItems.vals()) {
      menuItems.add(id, {
        id;
        name;
        description = desc;
        price;
        category = cat;
        isAvailable = true;
        image = null;
      });
      id += 1;
    };
    nextMenuItemId := id;
  };

  // Admin credential-based login: grants admin role to caller if credentials match
  // Works for both anonymous and authenticated callers
  public shared ({ caller }) func claimAdminWithPassword(username : Text, password : Text) : async Bool {
    if (Text.equal(username, "swaad_wallah17") and Text.equal(password, "VISH2006")) {
      accessControlState.userRoles.add(caller, #admin);
      accessControlState.adminAssigned := true;
      return true;
    };
    return false;
  };

  public query ({ caller }) func getRestaurantInfo() : async RestaurantInfo {
    restaurantInfo;
  };

  public query ({ caller }) func getMenuItems() : async [MenuItem] {
    menuItems.values().toArray().sort();
  };

  public query ({ caller }) func getMenuItemsByCategory(category : Text) : async [MenuItem] {
    menuItems.values().toArray().filter(
      func(item) {
        Text.equal(item.category, category);
      }
    );
  };

  public query ({ caller }) func getMenuItem(id : Nat) : async MenuItem {
    switch (menuItems.get(id)) {
      case (null) { Runtime.trap("Menu item not found") };
      case (?item) { item };
    };
  };

  public query ({ caller }) func getAvailableMenuItems() : async [MenuItem] {
    menuItems.values().toArray().filter(
      func(item) { item.isAvailable }
    );
  };

  public shared ({ caller }) func addMenuItem(name : Text, description : Text, price : Nat, category : Text, image : ?Storage.ExternalBlob) : async MenuItem {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add menu items");
    };
    let newItem : MenuItem = {
      id = nextMenuItemId;
      name;
      description;
      price;
      category;
      isAvailable = true;
      image;
    };
    menuItems.add(nextMenuItemId, newItem);
    nextMenuItemId += 1;
    newItem;
  };

  public shared ({ caller }) func updateMenuItem(id : Nat, name : Text, description : Text, price : Nat, category : Text, image : ?Storage.ExternalBlob) : async MenuItem {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update menu items");
    };
    switch (menuItems.get(id)) {
      case (null) { Runtime.trap("Menu item not found") };
      case (?_) {
        let updatedItem : MenuItem = {
          id;
          name;
          description;
          price;
          category;
          isAvailable = true;
          image;
        };
        menuItems.add(id, updatedItem);
        updatedItem;
      };
    };
  };

  public shared ({ caller }) func deleteMenuItem(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete menu items");
    };
    if (not menuItems.containsKey(id)) {
      Runtime.trap("Menu item not found");
    };
    menuItems.remove(id);
  };

  public shared ({ caller }) func toggleMenuItemAvailability(id : Nat) : async MenuItem {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can toggle menu item availability");
    };
    switch (menuItems.get(id)) {
      case (null) { Runtime.trap("Menu item not found") };
      case (?item) {
        let updatedItem : MenuItem = {
          id = item.id;
          name = item.name;
          description = item.description;
          price = item.price;
          category = item.category;
          isAvailable = not item.isAvailable;
          image = item.image;
        };
        menuItems.add(id, updatedItem);
        updatedItem;
      };
    };
  };

  public shared ({ caller }) func updateRestaurantInfo(name : Text, address : Text, phoneNumber : Text, email : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update restaurant info");
    };
    restaurantInfo := {
      name;
      address;
      phoneNumber;
      email;
    };
  };

  public shared ({ caller }) func seedDatabaseIfEmpty() : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can seed database");
    };
    ();
  };

  public shared ({ caller }) func deleteAllDataAndInitialize() : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can initialize database");
    };
    menuItems.clear();
    nextMenuItemId := 1;
    restaurantInfo := {
      name = "Swaad Wallah Sandwich";
      address = "Indrapuri Sector C, Bhopal";
      phoneNumber = "+91 9303526637";
      email = "swaadwallahbhopal@gmail.com";
    };
  };

  public query ({ caller }) func filterMenu(searchTerm : Text) : async [MenuItem] {
    menuItems.values().toArray().filter(
      func(item) {
        item.name.contains(#text searchTerm) or item.description.contains(#text searchTerm) or item.category.contains(#text searchTerm)
      }
    );
  };

  // Customer Profile Methods
  public shared ({ caller }) func saveCustomerProfile(name : Text, phone : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users can save profile");
    };

    customerProfiles.add(
      caller,
      {
        name;
        phone;
      },
    );
  };

  public query ({ caller }) func getCustomerProfile() : async ?CustomerProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users can view profile");
    };

    customerProfiles.get(caller);
  };

  // New Order Methods
  public shared ({ caller }) func placeOrder(items : [OrderItem], message : ?Text) : async OrderEntity {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users can place orders");
    };

    let customerProfile = switch (customerProfiles.get(caller)) {
      case (null) { Runtime.trap("Customer profile not found") };
      case (?profile) { profile };
    };

    let order : OrderEntity = {
      id = nextOrderId;
      customer = caller;
      items;
      message;
      status = #pending;
      customerName = customerProfile.name;
      customerPhone = customerProfile.phone;
    };

    orders.add(nextOrderId, order);
    nextOrderId += 1;
    order;
  };

  public query ({ caller }) func getMyOrders() : async [OrderEntity] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users can view orders");
    };

    orders.values().toArray().filter(
      func(order) { order.customer == caller }
    );
  };

  public query ({ caller }) func getOrder(orderId : Nat) : async ?OrderEntity {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users can view orders");
    };

    switch (orders.get(orderId)) {
      case (null) { null };
      case (?order) {
        if (order.customer != caller) {
          Runtime.trap("Unauthorized: Can only view your own orders");
        } else {
          ?order;
        };
      };
    };
  };

  public query ({ caller }) func getAllOrders() : async [OrderEntity] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    orders.values().toArray();
  };

  public shared ({ caller }) func updateOrderStatus(orderId : Nat, status : OrderStatus) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };

    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        let updatedOrder = { order with status };
        orders.add(orderId, updatedOrder);
      };
    };
  };
};
