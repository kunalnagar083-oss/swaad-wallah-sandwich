import Array "mo:core/Array";

actor {

  public type OrderItem = {
    name : Text;
    price : Nat;
    qty : Nat;
  };

  public type Order = {
    id : Nat;
    customerName : Text;
    phone : Text;
    items : [OrderItem];
    total : Nat;
    payment : Text;
    status : Text;
  };

  public type Message = {
    id : Nat;
    senderName : Text;
    content : Text;
    isAdmin : Bool;
  };

  public type MenuItem = {
    id : Nat;
    name : Text;
    category : Text;
    price : Nat;
    ingredients : Text;
  };

  var orders : [Order] = [];
  var messages : [Message] = [];
  var nextOrderId : Nat = 1;
  var nextMsgId : Nat = 1;

  var menuItems : [MenuItem] = [
    { id = 1; name = "Veg Sandwich"; category = "Sandwich"; price = 40; ingredients = "Bread, fresh veggies, tomato, onion, sauces" },
    { id = 2; name = "Cheese Sandwich"; category = "Sandwich"; price = 60; ingredients = "Bread, cheese, veggies, mayo" },
    { id = 3; name = "Grilled Sandwich"; category = "Sandwich"; price = 50; ingredients = "Toasted bread, veggies, butter, spices" },
    { id = 4; name = "Club Sandwich"; category = "Sandwich"; price = 70; ingredients = "Layered bread, veggies, cheese, sauces" },
    { id = 5; name = "Paneer Sandwich"; category = "Sandwich"; price = 70; ingredients = "Bread, paneer tikka, veggies, mint chutney" },
    { id = 6; name = "Veg Burger"; category = "Burger"; price = 50; ingredients = "Bun, veg patty, lettuce, tomato, sauces" },
    { id = 7; name = "Cheese Burger"; category = "Burger"; price = 70; ingredients = "Bun, veg patty, cheese slice, lettuce, mayo" },
    { id = 8; name = "Paneer Burger"; category = "Burger"; price = 80; ingredients = "Bun, paneer patty, veggies, special sauce" },
    { id = 9; name = "Veg Chaumin"; category = "Chaumin"; price = 60; ingredients = "Noodles, mixed veggies, soy sauce, spices" },
    { id = 10; name = "Paneer Chaumin"; category = "Chaumin"; price = 80; ingredients = "Noodles, paneer, veggies, desi twist" },
    { id = 11; name = "Hakka Noodles"; category = "Chaumin"; price = 70; ingredients = "Hakka noodles, veggies, sauces, spices" },
    { id = 12; name = "Steamed Momos"; category = "Momos"; price = 60; ingredients = "Flour, veg/paneer filling, dipping sauce" },
    { id = 13; name = "Fried Momos"; category = "Momos"; price = 70; ingredients = "Crispy fried dumplings, spicy sauce" },
    { id = 14; name = "Paneer Fried Momos"; category = "Momos"; price = 80; ingredients = "Fried momos with paneer stuffing" },
    { id = 15; name = "Tandoori Momos"; category = "Momos"; price = 90; ingredients = "Chargrilled momos, tandoori spices, chutney" },
    { id = 16; name = "Cold Coffee"; category = "Drinks"; price = 50; ingredients = "Coffee, milk, ice, sugar" },
    { id = 17; name = "Mango Juice"; category = "Drinks"; price = 40; ingredients = "Fresh mango pulp, chilled" },
    { id = 18; name = "Lemon Soda"; category = "Drinks"; price = 30; ingredients = "Fresh lime, soda water, salt/sugar" },
    { id = 19; name = "Lassi"; category = "Drinks"; price = 40; ingredients = "Yogurt, sugar, cardamom, chilled" }
  ];

  let ADMIN_USER = "Swaad_wallah17";
  let ADMIN_PASS = "VISH2006";

  public func adminLogin(username : Text, password : Text) : async Bool {
    username == ADMIN_USER and password == ADMIN_PASS
  };

  public func placeOrder(customerName : Text, phone : Text, items : [OrderItem], payment : Text) : async Nat {
    var total : Nat = 0;
    for (item in items.vals()) {
      total += item.price * item.qty;
    };
    let order : Order = {
      id = nextOrderId;
      customerName = customerName;
      phone = phone;
      items = items;
      total = total;
      payment = payment;
      status = "Pending";
    };
    let size = orders.size();
    orders := Array.tabulate<Order>(size + 1, func(i) {
      if (i < size) orders[i] else order
    });
    nextOrderId += 1;
    order.id
  };

  public query func getOrders() : async [Order] {
    orders
  };

  public func updateOrderStatus(id : Nat, newStatus : Text) : async Bool {
    var updated = false;
    orders := orders.map(func(o : Order) : Order {
      if (o.id == id) {
        updated := true;
        {
          id = o.id;
          customerName = o.customerName;
          phone = o.phone;
          items = o.items;
          total = o.total;
          payment = o.payment;
          status = newStatus;
        }
      } else { o }
    });
    updated
  };

  public func sendMessage(senderName : Text, content : Text, isAdmin : Bool) : async Nat {
    let msg : Message = {
      id = nextMsgId;
      senderName = senderName;
      content = content;
      isAdmin = isAdmin;
    };
    let size = messages.size();
    messages := Array.tabulate<Message>(size + 1, func(i) {
      if (i < size) messages[i] else msg
    });
    nextMsgId += 1;
    msg.id
  };

  public query func getMessages() : async [Message] {
    messages
  };

  public query func getMenuItems() : async [MenuItem] {
    menuItems
  };

  public func updateMenuItemPrice(id : Nat, newPrice : Nat) : async Bool {
    var updated = false;
    menuItems := menuItems.map(func(m : MenuItem) : MenuItem {
      if (m.id == id) {
        updated := true;
        {
          id = m.id;
          name = m.name;
          category = m.category;
          price = newPrice;
          ingredients = m.ingredients;
        }
      } else { m }
    });
    updated
  };

};
