import Map "mo:core/Map";
import List "mo:core/List";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Authorization state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  module AppointmentStatus {
    public type Type = {
      #Pending;
      #Confirmed;
      #Cancelled;
    };

    public func compare(status1 : Type, status2 : Type) : Order.Order {
      switch (status1, status2) {
        case (#Pending, #Pending) { #equal };
        case (#Pending, _) { #less };
        case (#Confirmed, #Pending) { #greater };
        case (#Confirmed, #Confirmed) { #equal };
        case (#Confirmed, #Cancelled) { #less };
        case (#Cancelled, #Cancelled) { #equal };
        case (#Cancelled, _) { #greater };
      };
    };
  };

  type AppointmentStatus = AppointmentStatus.Type;

  // Appointment type
  type Appointment = {
    id : Nat;
    name : Text;
    phone : Text;
    serviceType : Text;
    preferredDate : Text;
    message : Text;
    status : AppointmentStatus;
    timestamp : Text;
  };

  module Appointment {
    public func compareById(a1 : Appointment, a2 : Appointment) : Order.Order {
      Nat.compare(a1.id, a2.id);
    };

    public func compareByStatus(a1 : Appointment, a2 : Appointment) : Order.Order {
      switch (AppointmentStatus.compare(a1.status, a2.status)) {
        case (#equal) { Nat.compare(a1.id, a2.id) };
        case (order) { order };
      };
    };
  };

  // Contact message type
  type ContactMessage = {
    name : Text;
    phone : Text;
    email : Text;
    message : Text;
    timestamp : Text;
  };

  module ContactMessage {
    public func compareByTime(msg1 : ContactMessage, msg2 : ContactMessage) : Order.Order {
      Text.compare(msg1.timestamp, msg2.timestamp);
    };
  };

  // User profile type
  public type UserProfile = {
    name : Text;
  };

  // State variables
  var nextAppointmentId = 0;

  // Data structures
  let appointments = Map.empty<Nat, Appointment>();
  let contactMessages = List.empty<ContactMessage>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // User profile functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Appointment functions
  public shared ({ caller }) func submitAppointment(name : Text, phone : Text, serviceType : Text, preferredDate : Text, message : Text) : async Nat {
    let appointment : Appointment = {
      id = nextAppointmentId;
      name;
      phone;
      serviceType;
      preferredDate;
      message;
      status = #Pending;
      timestamp = Time.now().toText();
    };

    appointments.add(nextAppointmentId, appointment);
    nextAppointmentId += 1;
    appointment.id;
  };

  public shared ({ caller }) func updateAppointmentStatus(appointmentId : Nat, newStatus : AppointmentStatus) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update appointment status");
    };

    switch (appointments.get(appointmentId)) {
      case (null) { Runtime.trap("Appointment not found") };
      case (?appointment) {
        let updatedAppointment : Appointment = {
          id = appointment.id;
          name = appointment.name;
          phone = appointment.phone;
          serviceType = appointment.serviceType;
          preferredDate = appointment.preferredDate;
          message = appointment.message;
          status = newStatus;
          timestamp = appointment.timestamp;
        };
        appointments.add(appointmentId, updatedAppointment);
      };
    };
  };

  public query ({ caller }) func getAllAppointments() : async [Appointment] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all appointments");
    };

    appointments.values().toArray().sort(Appointment.compareById);
  };

  // Contact message functions
  public shared ({ caller }) func submitContactMessage(name : Text, phone : Text, email : Text, message : Text) : async () {
    let contactMessage : ContactMessage = {
      name;
      phone;
      email;
      message;
      timestamp = Time.now().toText();
    };

    contactMessages.add(contactMessage);
  };

  public query ({ caller }) func getAllContactMessages() : async [ContactMessage] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view contact messages");
    };

    contactMessages.toArray().sort(ContactMessage.compareByTime);
  };
};
