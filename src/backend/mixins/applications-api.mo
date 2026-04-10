import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AppTypes "../types/applications";
import Common "../types/common";

mixin (
  applications : List.List<AppTypes.Application>,
  nextApplicationId : Common.Counter,
) {
  public shared func submitApplication(input : AppTypes.ApplicationInput) : async { #ok : Text; #err : Text } {
    Runtime.trap("not implemented");
  };

  public query func getAllApplications() : async [AppTypes.Application] {
    Runtime.trap("not implemented");
  };
};
