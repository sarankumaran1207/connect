import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import UserLib "../lib/users";
import Types "../types/users";

mixin (
  accessControlState : AccessControl.AccessControlState,
  userProfiles : Map.Map<Principal, Types.UserProfile>,
  emailByNorm : Map.Map<Text, Principal>,
) {
  /// Return the profile of the currently authenticated caller.
  /// Returns null if the caller has no registered profile.
  public query ({ caller }) func getCallerUserProfile() : async ?Types.UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    userProfiles.get(caller);
  };

  /// Save or update the caller's user profile.
  public shared ({ caller }) func saveCallerUserProfile(profile : Types.UserProfileInput) : async {
    #ok : Types.UserProfile;
    #err : Text;
  } {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    UserLib.saveProfile(userProfiles, emailByNorm, caller, profile)
  };

  /// Return a user profile by principal ID.
  /// Only admins or the profile owner can view.
  public query ({ caller }) func getUserProfile(user : Principal) : async ?Types.UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };
};
