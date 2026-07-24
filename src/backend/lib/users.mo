import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Types "../types/users";

module {

  // ---------------------------------------------------------------------------
  // Email helpers
  // ---------------------------------------------------------------------------

  public func normalizeEmail(email : Text) : Text {
    email.toLower()
  };

  public func isValidEmail(email : Text) : Bool {
    let lower = normalizeEmail(email);
    lower.contains(#char '@') and lower.size() >= 5
  };

  // ---------------------------------------------------------------------------
  // Profile CRUD helpers operating on the userProfiles map
  // ---------------------------------------------------------------------------

  public func findByPrincipal(
    userProfiles : Map.Map<Principal, Types.UserProfile>,
    pid : Principal,
  ) : ?Types.UserProfile {
    userProfiles.get(pid)
  };

  public func findByEmail(
    emailByNorm : Map.Map<Text, Principal>,
    email : Text,
  ) : ?Principal {
    let norm = normalizeEmail(email);
    emailByNorm.get(norm)
  };

  public func saveProfile(
    userProfiles : Map.Map<Principal, Types.UserProfile>,
    emailByNorm : Map.Map<Text, Principal>,
    caller : Principal,
    input : Types.UserProfileInput,
  ) : { #ok : Types.UserProfile; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("Anonymous callers cannot save profiles");
    };
    if (not isValidEmail(input.email)) {
      return #err("Invalid email address");
    };
    if (input.fullName.size() == 0) {
      return #err("Full name is required");
    };
    let norm = normalizeEmail(input.email);

    // Check if email is already used by another principal
    switch (emailByNorm.get(norm)) {
      case (?existingPrincipal) {
        if (existingPrincipal != caller) {
          return #err("Email address already registered");
        };
      };
      case null {};
    };

    // If user is updating their email, remove old email mapping
    switch (userProfiles.get(caller)) {
      case (?existing) {
        let oldNorm = normalizeEmail(existing.email);
        if (oldNorm != norm) {
          emailByNorm.remove(oldNorm);
        };
      };
      case null {};
    };

    let newProfile : Types.UserProfile = {
      id = caller;
      fullName = input.fullName;
      email = norm;
      createdAt = Time.now();
    };

    userProfiles.add(caller, newProfile);
    emailByNorm.add(norm, caller);

    #ok(newProfile)
  };
};
