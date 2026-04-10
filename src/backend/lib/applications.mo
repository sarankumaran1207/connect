import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Types "../types/applications";

module {
  public type Application = Types.Application;
  public type ApplicationInput = Types.ApplicationInput;
  public type ApplicationId = Types.ApplicationId;

  public func getAll(applications : List.List<Application>) : [Application] {
    Runtime.trap("not implemented");
  };

  public func submit(
    applications : List.List<Application>,
    input : ApplicationInput,
    nextId : Nat,
  ) : (Application, Nat) {
    Runtime.trap("not implemented");
  };
};
