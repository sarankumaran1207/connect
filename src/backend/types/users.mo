import Common "common";

module {
  public type UserId = Principal;

  public type UserProfile = {
    id : UserId;
    fullName : Text;
    email : Text;
    createdAt : Common.Timestamp;
  };

  public type UserProfileInput = {
    fullName : Text;
    email : Text;
  };
};
