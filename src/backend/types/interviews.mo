import Common "common";

module {
  public type InterviewId = Common.InterviewId;
  public type Timestamp = Common.Timestamp;

  public type Interview = {
    id : InterviewId;
    jobRole : Text;
    company : Text;
    date : Text;
    time : Text;
    location : Text;
    description : Text;
    isActive : Bool;
    createdAt : Timestamp;
  };
};
