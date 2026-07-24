import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Types "../types/users";
import UserLib "../lib/users";

mixin (
  users : Map.Map<Principal, Types.User>,
  emailByNorm : Map.Map<Text, Principal>,
) {

  /// Register a new user account tied to the caller's Internet Identity.
  /// Returns the user profile on success or an error message on failure.
  public shared ({ caller }) func registerUser(
    fullName : Text,
    email : Text,
    password : Text,
  ) : async Types.AuthResult {
    UserLib.createUser(users, emailByNorm, caller, fullName, email, password)
  };

  /// Authenticate with email and password.
  /// Returns the user profile on success or an error message on failure.
  /// The caller's principal is NOT checked here — login is email/password based.
  public shared func loginUser(
    email : Text,
    password : Text,
  ) : async Types.AuthResult {
    UserLib.loginUser(users, emailByNorm, email, password)
  };

  /// Return the profile of the currently authenticated caller.
  /// Returns null if the caller has no registered account.
  public shared query ({ caller }) func getCurrentUser() : async ?Types.UserProfile {
    switch (UserLib.findByPrincipal(users, caller)) {
      case (?user) ?UserLib.toProfile(user);
      case null null;
    }
  };

  /// Return a user profile by principal ID.
  /// Returns null if no account exists for that principal.
  public shared query func getUserProfile(principalId : Principal) : async ?Types.UserProfile {
    switch (UserLib.findByPrincipal(users, principalId)) {
      case (?user) ?UserLib.toProfile(user);
      case null null;
    }
  };
};
