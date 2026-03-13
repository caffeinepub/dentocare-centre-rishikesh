import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactMessage {
    name: string;
    email: string;
    message: string;
    timestamp: string;
    phone: string;
}
export interface Appointment {
    id: bigint;
    status: AppointmentStatus;
    serviceType: string;
    name: string;
    message: string;
    preferredDate: string;
    timestamp: string;
    phone: string;
}
export interface UserProfile {
    name: string;
}
export enum AppointmentStatus {
    Confirmed = "Confirmed",
    Cancelled = "Cancelled",
    Pending = "Pending"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllAppointments(): Promise<Array<Appointment>>;
    getAllContactMessages(): Promise<Array<ContactMessage>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitAppointment(name: string, phone: string, serviceType: string, preferredDate: string, message: string): Promise<bigint>;
    submitContactMessage(name: string, phone: string, email: string, message: string): Promise<void>;
    updateAppointmentStatus(appointmentId: bigint, newStatus: AppointmentStatus): Promise<void>;
}
