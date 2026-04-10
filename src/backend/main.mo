import List "mo:core/List";
import InterviewTypes "types/interviews";
import AppTypes "types/applications";
import ShiftTypes "types/shifts";
import Common "types/common";
import InterviewLib "lib/interviews";
import ShiftLib "lib/shifts";
import InterviewsMixin "mixins/interviews-api";
import ApplicationsMixin "mixins/applications-api";
import ShiftsMixin "mixins/shifts-api";

actor {
  let interviews = List.empty<InterviewTypes.Interview>();
  let nextInterviewId : Common.Counter = { var value = 0 };

  let applications = List.empty<AppTypes.Application>();
  let nextApplicationId : Common.Counter = { var value = 0 };

  let shiftJobs = List.empty<ShiftTypes.ShiftJob>();
  let nextShiftJobId : Common.Counter = { var value = 0 };

  // Seed sample data on first load
  nextInterviewId.value := InterviewLib.seedSampleData(interviews, nextInterviewId.value);
  nextShiftJobId.value := ShiftLib.seedSampleData(shiftJobs, nextShiftJobId.value);

  include InterviewsMixin(interviews, nextInterviewId);
  include ApplicationsMixin(applications, nextApplicationId);
  include ShiftsMixin(shiftJobs, nextShiftJobId);
};
