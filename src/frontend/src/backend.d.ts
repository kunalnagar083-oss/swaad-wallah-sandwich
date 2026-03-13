import type { Principal } from "@icp-sdk/core/principal";

export interface Some<T> {
  __kind__: "Some";
  value: T;
}
export interface None {
  __kind__: "None";
}
export type Option<T> = Some<T> | None;

export interface OrderItem {
  name: string;
  price: bigint;
  qty: bigint;
}

export interface Order {
  id: bigint;
  customerName: string;
  phone: string;
  items: Array<OrderItem>;
  total: bigint;
  payment: string;
  status: string;
}

export interface Message {
  id: bigint;
  senderName: string;
  content: string;
  isAdmin: boolean;
}

export interface MenuItem {
  id: bigint;
  name: string;
  category: string;
  price: bigint;
  ingredients: string;
}

export interface backendInterface {
  adminLogin(username: string, password: string): Promise<boolean>;
  placeOrder(
    customerName: string,
    phone: string,
    items: Array<OrderItem>,
    payment: string
  ): Promise<bigint>;
  getOrders(): Promise<Array<Order>>;
  updateOrderStatus(id: bigint, newStatus: string): Promise<boolean>;
  sendMessage(senderName: string, content: string, isAdmin: boolean): Promise<bigint>;
  getMessages(): Promise<Array<Message>>;
  getMenuItems(): Promise<Array<MenuItem>>;
  updateMenuItemPrice(id: bigint, newPrice: bigint): Promise<boolean>;
}
