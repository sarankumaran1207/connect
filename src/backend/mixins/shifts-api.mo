import List "mo:core/List";
import ShiftTypes "../types/shifts";
import Common "../types/common";
import ShiftLib "../lib/shifts";

mixin (
  shiftJobs : List.List<ShiftTypes.ShiftJob>,
  nextShiftJobId : Common.Counter,
) {
  public query func getShiftJobs() : async [ShiftTypes.ShiftJob] {
    ShiftLib.getActive(shiftJobs);
  };

  public func addShiftJob(input : ShiftTypes.NewShiftJob) : async ShiftTypes.ShiftJob {
    ShiftLib.add(shiftJobs, nextShiftJobId, input);
  };
};
