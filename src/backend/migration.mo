import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Types "./types/users";

module {
  // Old types defined inline (copied from .old/src/backend/types/users.mo)
  type OldUserId = Principal;

  type OldUser = {
    id : OldUserId;
    fullName : Text;
    email : Text;
    passwordHash : Text;
    createdAt : Int;
  };

  type OldActor = {
    users : Map.Map<OldUserId, OldUser>;
    emailByNorm : Map.Map<Text, Principal>;
    interviews : {
      var blockIndex : Nat;
      var blocks : [var [var ?{
        id : Nat;
        jobRole : Text;
        company : Text;
        date : Text;
        time : Text;
        location : Text;
        description : Text;
        isActive : Bool;
        createdAt : Int;
      }]];
      var elementIndex : Nat;
    };
    nextInterviewId : { var value : Nat };
    applications : {
      var blockIndex : Nat;
      var blocks : [var [var ?{
        id : Nat;
        name : Text;
        email : Text;
        phone : Text;
        qualification : Text;
        skills : Text;
        message : Text;
        appliedAt : Int;
        interviewId : ?Nat;
      }]];
      var elementIndex : Nat;
    };
    nextApplicationId : { var value : Nat };
    shiftJobs : {
      var blockIndex : Nat;
      var blocks : [var [var ?{
        id : Nat;
        jobRole : Text;
        company : Text;
        shiftType : Text;
        shiftStart : Text;
        shiftEnd : Text;
        location : Text;
        description : Text;
        isActive : Bool;
        createdAt : Int;
      }]];
      var elementIndex : Nat;
    };
    nextShiftJobId : { var value : Nat };
  };

  type NewActor = {
    userProfiles : Map.Map<Principal, Types.UserProfile>;
    emailByNorm : Map.Map<Text, Principal>;
    interviews : {
      var blockIndex : Nat;
      var blocks : [var [var ?{
        id : Nat;
        jobRole : Text;
        company : Text;
        date : Text;
        time : Text;
        location : Text;
        description : Text;
        isActive : Bool;
        createdAt : Int;
      }]];
      var elementIndex : Nat;
    };
    nextInterviewId : { var value : Nat };
    applications : {
      var blockIndex : Nat;
      var blocks : [var [var ?{
        id : Nat;
        name : Text;
        email : Text;
        phone : Text;
        qualification : Text;
        skills : Text;
        message : Text;
        appliedAt : Int;
        interviewId : ?Nat;
      }]];
      var elementIndex : Nat;
    };
    nextApplicationId : { var value : Nat };
    shiftJobs : {
      var blockIndex : Nat;
      var blocks : [var [var ?{
        id : Nat;
        jobRole : Text;
        company : Text;
        shiftType : Text;
        shiftStart : Text;
        shiftEnd : Text;
        location : Text;
        description : Text;
        isActive : Bool;
        createdAt : Int;
      }]];
      var elementIndex : Nat;
    };
    nextShiftJobId : { var value : Nat };
  };

  public func run(old : OldActor) : NewActor {
    let userProfiles = old.users.map<Principal, OldUser, Types.UserProfile>(
      func(_id, oldUser) {
        {
          id = oldUser.id;
          fullName = oldUser.fullName;
          email = oldUser.email;
          createdAt = oldUser.createdAt;
        }
      }
    );
    {
      userProfiles;
      emailByNorm = old.emailByNorm;
      interviews = old.interviews;
      nextInterviewId = old.nextInterviewId;
      applications = old.applications;
      nextApplicationId = old.nextApplicationId;
      shiftJobs = old.shiftJobs;
      nextShiftJobId = old.nextShiftJobId;
    }
  };
}
