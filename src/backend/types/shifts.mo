import Common "common";

module {
  public type ShiftJobId = Common.ShiftJobId;

  public type ShiftJob = {
    id : ShiftJobId;
    jobRole : Text;
    company : Text;
    shiftType : Text; // "Morning" | "Afternoon" | "Night"
    shiftStart : Text;
    shiftEnd : Text;
    location : Text;
    description : Text;
    isActive : Bool;
    createdAt : Int;
  };

  public type NewShiftJob = {
    jobRole : Text;
    company : Text;
    shiftType : Text;
    shiftStart : Text;
    shiftEnd : Text;
    location : Text;
    description : Text;
  };
};
