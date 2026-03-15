import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface MenuItem {
    id: bigint;
    name: string;
    isAvailable: boolean;
    description: string;
    category: string;
    image?: ExternalBlob;
    price: bigint;
}
export interface RestaurantInfo {
    name: string;
    email: string;
    address: string;
    phoneNumber: string;
}
export interface OrderItem {
    quantity: bigint;
    menuItemId: bigint;
}
export interface CustomerProfile {
    name: string;
    phone: string;
}
export interface OrderEntity {
    id: bigint;
    customerName: string;
    status: OrderStatus;
    customerPhone: string;
    customer: Principal;
    message?: string;
    items: Array<OrderItem>;
}
export enum OrderStatus {
    preparing = "preparing",
    pending = "pending",
    delivered = "delivered",
    ready = "ready"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addMenuItem(name: string, description: string, price: bigint, category: string, image: ExternalBlob | null): Promise<MenuItem>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    claimAdminWithPassword(username: string, password: string): Promise<boolean>;
    deleteAllDataAndInitialize(): Promise<void>;
    deleteMenuItem(id: bigint): Promise<void>;
    filterMenu(searchTerm: string): Promise<Array<MenuItem>>;
    getAllOrders(): Promise<Array<OrderEntity>>;
    getAvailableMenuItems(): Promise<Array<MenuItem>>;
    getCallerUserRole(): Promise<UserRole>;
    getCustomerProfile(): Promise<CustomerProfile | null>;
    getMenuItem(id: bigint): Promise<MenuItem>;
    getMenuItems(): Promise<Array<MenuItem>>;
    getMenuItemsByCategory(category: string): Promise<Array<MenuItem>>;
    getMyOrders(): Promise<Array<OrderEntity>>;
    getOrder(orderId: bigint): Promise<OrderEntity | null>;
    getRestaurantInfo(): Promise<RestaurantInfo>;
    isCallerAdmin(): Promise<boolean>;
    placeOrder(items: Array<OrderItem>, message: string | null): Promise<OrderEntity>;
    saveCustomerProfile(name: string, phone: string): Promise<void>;
    seedDatabaseIfEmpty(): Promise<void>;
    toggleMenuItemAvailability(id: bigint): Promise<MenuItem>;
    updateMenuItem(id: bigint, name: string, description: string, price: bigint, category: string, image: ExternalBlob | null): Promise<MenuItem>;
    updateOrderStatus(orderId: bigint, status: OrderStatus): Promise<void>;
    updateRestaurantInfo(name: string, address: string, phoneNumber: string, email: string): Promise<void>;
}
