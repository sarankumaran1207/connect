import Common "common";

module {
  public type ApplicationId = Common.ApplicationId;
  public type Timestamp = Common.Timestamp;
  public type InterviewId = Common.InterviewId;

  public type Application = {
    id : ApplicationId;
    name : Text;
    email : Text;
    phone : Text;
    qualification : Text;
    skills : Text;
    message : Text;
    appliedAt : Timestamp;
    interviewId : ?InterviewId;
  };

  public type ApplicationInput = {
    name : Text;
    email : Text;
    phone : Text;
    qualification : Text;
    skills : Text;
    message : Text;
    interviewId : ?InterviewId;
  };
};
