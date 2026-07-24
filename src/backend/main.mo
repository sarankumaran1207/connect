import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import InterviewTypes "types/interviews";
import AppTypes "types/applications";
import ShiftTypes "types/shifts";
import UserTypes "types/users";
import Common "types/common";
import InterviewLib "lib/interviews";
import ShiftLib "lib/shifts";
import InterviewsMixin "mixins/interviews-api";
import ApplicationsMixin "mixins/applications-api";
import ShiftsMixin "mixins/shifts-api";
import ProfileMixin "mixins/profile-api";
import Migration "./migration";

(with migration = Migration.run)
actor {
  let accessControlState = AccessControl.initState();

  let interviews = List.empty<InterviewTypes.Interview>();
  let nextInterviewId : Common.Counter = { var value = 0 };

  let applications = List.empty<AppTypes.Application>();
  let nextApplicationId : Common.Counter = { var value = 0 };

  let shiftJobs = List.empty<ShiftTypes.ShiftJob>();
  let nextShiftJobId : Common.Counter = { var value = 0 };

  // User profiles: keyed by Principal; secondary index: normalized email → Principal
  let userProfiles = Map.empty<Principal, UserTypes.UserProfile>();
  let emailByNorm = Map.empty<Text, Principal>();

  // Seed sample data on first load
  nextInterviewId.value := InterviewLib.seedSampleData(interviews, nextInterviewId.value);
  nextShiftJobId.value := ShiftLib.seedSampleData(shiftJobs, nextShiftJobId.value);

  include MixinAuthorization(accessControlState, null);
  include InterviewsMixin(interviews, nextInterviewId);
  include ApplicationsMixin(applications, nextApplicationId);
  include ShiftsMixin(shiftJobs, nextShiftJobId);
  include ProfileMixin(accessControlState, userProfiles, emailByNorm);
};
