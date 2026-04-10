import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Types "../types/interviews";
import Common "../types/common";

mixin (
  interviews : List.List<Types.Interview>,
  nextInterviewId : Common.Counter,
) {
  public query func getActiveInterviews() : async [Types.Interview] {
    Runtime.trap("not implemented");
  };

  public query func getInterview(id : Types.InterviewId) : async ?Types.Interview {
    Runtime.trap("not implemented");
  };
};
