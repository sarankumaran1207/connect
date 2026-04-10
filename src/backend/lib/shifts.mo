import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/shifts";
import Common "../types/common";

module {
  public type ShiftJob = Types.ShiftJob;
  public type ShiftJobId = Common.ShiftJobId;

  public func getAll(shiftJobs : List.List<ShiftJob>) : [ShiftJob] {
    shiftJobs.toArray();
  };

  public func getActive(shiftJobs : List.List<ShiftJob>) : [ShiftJob] {
    shiftJobs.filter(func(j : ShiftJob) : Bool { j.isActive }).toArray();
  };

  public func add(
    shiftJobs : List.List<ShiftJob>,
    nextId : Common.Counter,
    input : Types.NewShiftJob,
  ) : ShiftJob {
    let id = nextId.value;
    nextId.value += 1;
    let job : ShiftJob = {
      id;
      jobRole = input.jobRole;
      company = input.company;
      shiftType = input.shiftType;
      shiftStart = input.shiftStart;
      shiftEnd = input.shiftEnd;
      location = input.location;
      description = input.description;
      isActive = true;
      createdAt = Time.now();
    };
    shiftJobs.add(job);
    job;
  };

  public func seedSampleData(shiftJobs : List.List<ShiftJob>, nextId : Nat) : Nat {
    let now = Time.now();
    let samples : [ShiftJob] = [
      {
        id = nextId;
        jobRole = "Customer Support Representative";
        company = "HelpDesk Solutions";
        shiftType = "Morning";
        shiftStart = "6:00 AM";
        shiftEnd = "2:00 PM";
        location = "Chennai, TN";
        description = "Handle customer inquiries and resolve issues during the morning shift. Freshers welcome.";
        isActive = true;
        createdAt = now;
      },
      {
        id = nextId + 1;
        jobRole = "Data Entry Operator";
        company = "DataFlow Technologies";
        shiftType = "Afternoon";
        shiftStart = "2:00 PM";
        shiftEnd = "10:00 PM";
        location = "Bangalore, KA";
        description = "Accurate data entry and record maintenance for afternoon shift. Basic computer skills required.";
        isActive = true;
        createdAt = now;
      },
      {
        id = nextId + 2;
        jobRole = "Security Guard";
        company = "SafeGuard Services";
        shiftType = "Night";
        shiftStart = "10:00 PM";
        shiftEnd = "6:00 AM";
        location = "Mumbai, MH";
        description = "Monitor premises and ensure safety during night hours. Accommodation provided.";
        isActive = true;
        createdAt = now;
      },
    ];
    for (s in samples.vals()) {
      shiftJobs.add(s);
    };
    nextId + samples.size();
  };
};
