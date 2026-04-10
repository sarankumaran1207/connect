module {
  public type Timestamp = Int;
  public type InterviewId = Nat;
  public type ApplicationId = Nat;
  public type ShiftJobId = Nat;

  public type Counter = { var value : Nat };

  public type Result = {
    #ok : Text;
    #err : Text;
  };
};
