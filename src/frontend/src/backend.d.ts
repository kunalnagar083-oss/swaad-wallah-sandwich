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
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addMenuItem(name: string, description: string, price: bigint, category: string, image: ExternalBlob | null): Promise<MenuItem>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteAllDataAndInitialize(): Promise<void>;
    deleteMenuItem(id: bigint): Promise<void>;
    filterMenu(searchTerm: string): Promise<Array<MenuItem>>;
    getAvailableMenuItems(): Promise<Array<MenuItem>>;
    getCallerUserRole(): Promise<UserRole>;
    getMenuItem(id: bigint): Promise<MenuItem>;
    getMenuItems(): Promise<Array<MenuItem>>;
    getMenuItemsByCategory(category: string): Promise<Array<MenuItem>>;
    getRestaurantInfo(): Promise<RestaurantInfo>;
    isCallerAdmin(): Promise<boolean>;
    seedDatabaseIfEmpty(): Promise<void>;
    toggleMenuItemAvailability(id: bigint): Promise<MenuItem>;
    updateMenuItem(id: bigint, name: string, description: string, price: bigint, category: string, image: ExternalBlob | null): Promise<MenuItem>;
    updateRestaurantInfo(name: string, address: string, phoneNumber: string, email: string): Promise<void>;
}
