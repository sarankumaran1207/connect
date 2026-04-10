import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/interviews";

module {
  public type Interview = Types.Interview;
  public type InterviewId = Types.InterviewId;

  public func getAll(interviews : List.List<Interview>) : [Interview] {
    interviews.toArray();
  };

  public func getActive(interviews : List.List<Interview>) : [Interview] {
    interviews.filter(func(i : Interview) : Bool { i.isActive }).toArray();
  };

  public func getById(interviews : List.List<Interview>, id : InterviewId) : ?Interview {
    interviews.find(func(i : Interview) : Bool { i.id == id });
  };

  public func seedSampleData(interviews : List.List<Interview>, nextId : Nat) : Nat {
    let now = Time.now();
    let samples : [Interview] = [
      {
        id = nextId;
        jobRole = "Software Engineer Intern";
        company = "TechCorp Solutions";
        date = "2026-04-15";
        time = "10:00 AM";
        location = "New York, NY";
        description = "Join our engineering team as an intern. Stipend provided.";
        isActive = true;
        createdAt = now;
      },
      {
        id = nextId + 1;
        jobRole = "Marketing Intern";
        company = "BrandCo Media";
        date = "2026-04-18";
        time = "02:00 PM";
        location = "Chicago, IL";
        description = "Gain hands-on experience in digital marketing. No stipend.";
        isActive = true;
        createdAt = now;
      },
      {
        id = nextId + 2;
        jobRole = "Junior Developer";
        company = "StartupXYZ";
        date = "2026-04-20";
        time = "11:00 AM";
        location = "Remote";
        description = "Entry-level full-stack developer position. Competitive salary.";
        isActive = true;
        createdAt = now;
      },
    ];
    for (s in samples.vals()) {
      interviews.add(s);
    };
    nextId + samples.size();
  };
};
