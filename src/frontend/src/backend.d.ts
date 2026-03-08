import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BusinessProfile {
    hours: string;
    name: string;
    description: string;
    address: string;
    socialMedia: SocialMedia;
}
export interface SocialMedia {
    instagram: string;
}
export interface backendInterface {
    getBusinessInfo(): Promise<BusinessProfile>;
}
