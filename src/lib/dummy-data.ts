import {
  ApplicationStatus,
  InterviewStageType,
  InterviewStageLocation,
} from "@prisma/client";

export const dummyUsers = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    email: "john.doe@example.com",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    email: "jane.smith@example.com",
  },
];

export const dummyCompanies = [
  {
    id: "660e8400-e29b-41d4-a716-446655440000",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    name: "Google",
    website: "https://www.google.com",
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440001",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    name: "Microsoft",
    website: "https://www.microsoft.com",
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440002",
    userId: "550e8400-e29b-41d4-a716-446655440001",
    name: "Apple",
    website: "https://www.apple.com",
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440003",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    name: "Meta",
    website: "https://www.meta.com",
  },
];

export const dummyApplications = [
  {
    id: "770e8400-e29b-41d4-a716-446655440000",
    companyId: "660e8400-e29b-41d4-a716-446655440000",
    role: "Senior Software Engineer",
    sourceUrl: "https://careers.google.com/jobs/12345",
    status: ApplicationStatus.IN_PROCESS,
    pitch:
      "I have 5 years of experience in full-stack development and am passionate about building scalable systems.",
    desireLevel: 0,
  },
  {
    id: "770e8400-e29b-41d4-a716-446655440001",
    companyId: "660e8400-e29b-41d4-a716-446655440000",
    role: "Frontend Developer",
    sourceUrl: "https://careers.google.com/jobs/12346",
    status: ApplicationStatus.APPLIED,
    pitch: "Strong React and TypeScript background.",
    desireLevel: 0,
  },
  {
    id: "770e8400-e29b-41d4-a716-446655440002",
    companyId: "660e8400-e29b-41d4-a716-446655440001",
    role: "Cloud Solutions Architect",
    sourceUrl: "https://careers.microsoft.com/jobs/78901",
    status: ApplicationStatus.ON_HOLD,
    pitch: "Expert in Azure and cloud infrastructure.",
    desireLevel: 0,
  },
  {
    id: "770e8400-e29b-41d4-a716-446655440003",
    companyId: "660e8400-e29b-41d4-a716-446655440002",
    role: "iOS Developer",
    sourceUrl: "https://jobs.apple.com/jobs/45678",
    status: ApplicationStatus.DRAFT,
    pitch: null,
    desireLevel: 0,
  },
  {
    id: "770e8400-e29b-41d4-a716-446655440004",
    companyId: "660e8400-e29b-41d4-a716-446655440003",
    role: "Full Stack Engineer",
    sourceUrl: "https://www.metacareers.com/jobs/11111",
    status: ApplicationStatus.OFFER,
    pitch:
      "Excited about the opportunity to work on cutting-edge social platforms.",
    desireLevel: 0,
  },
  {
    id: "770e8400-e29b-41d4-a716-446655440005",
    companyId: "660e8400-e29b-41d4-a716-446655440001",
    role: "Backend Engineer",
    sourceUrl: null,
    status: ApplicationStatus.REJECTED,
    pitch: "Strong backend experience with distributed systems.",
    desireLevel: 0,
  },
];

export const dummyInterviewStages = [
  // Stages for Google Senior Software Engineer (IN_PROCESS)
  {
    id: "880e8400-e29b-41d4-a716-446655440000",
    applicationId: "770e8400-e29b-41d4-a716-446655440000",
    order: 1,
    type: InterviewStageType.HR,
    location: InterviewStageLocation.ZOOM,
    isCompleted: true,
    interviewerName: "Sarah Johnson",
    preparationNotes:
      "Review company values, prepare questions about team culture",
    reflectionNotes:
      "Went well, discussed my experience with distributed systems",
    questionsAsked: "Tell me about a time you handled a production incident",
    whyItDidntGoWell: null,
    betterAnswerToday: null,
    outcome: "Passed to next round",
    scheduledAt: new Date("2024-01-15T10:00:00Z"),
  },
  {
    id: "880e8400-e29b-41d4-a716-446655440001",
    applicationId: "770e8400-e29b-41d4-a716-446655440000",
    order: 2,
    type: InterviewStageType.TECHNICAL,
    location: InterviewStageLocation.GOOGLE_MEET,
    isCompleted: true,
    interviewerName: "Mike Chen",
    preparationNotes: "Practice system design, review algorithms",
    reflectionNotes: "Good technical discussion, solved the coding problem",
    questionsAsked: "Design a URL shortener service",
    whyItDidntGoWell: null,
    betterAnswerToday: null,
    outcome: "Passed",
    scheduledAt: new Date("2024-01-20T14:00:00Z"),
  },
  {
    id: "880e8400-e29b-41d4-a716-446655440002",
    applicationId: "770e8400-e29b-41d4-a716-446655440000",
    order: 3,
    type: InterviewStageType.MANAGER,
    location: InterviewStageLocation.IN_PERSON,
    isCompleted: false,
    interviewerName: "David Williams",
    preparationNotes:
      "Prepare questions about team structure and growth opportunities",
    reflectionNotes: null,
    questionsAsked: null,
    whyItDidntGoWell: null,
    betterAnswerToday: null,
    outcome: null,
    scheduledAt: new Date("2024-02-10T11:00:00Z"), // Future date
  },
  // Stages for Google Frontend Developer (APPLIED)
  {
    id: "880e8400-e29b-41d4-a716-446655440003",
    applicationId: "770e8400-e29b-41d4-a716-446655440001",
    order: 1,
    type: InterviewStageType.HR,
    location: InterviewStageLocation.PHONE_CALL,
    isCompleted: false,
    interviewerName: null,
    preparationNotes: "Review React best practices",
    reflectionNotes: null,
    questionsAsked: null,
    whyItDidntGoWell: null,
    betterAnswerToday: null,
    outcome: null,
    scheduledAt: new Date("2024-02-05T15:30:00Z"), // Future date
  },
  // Stages for Microsoft Cloud Solutions Architect (ON_HOLD)
  {
    id: "880e8400-e29b-41d4-a716-446655440004",
    applicationId: "770e8400-e29b-41d4-a716-446655440002",
    order: 1,
    type: InterviewStageType.TECHNICAL,
    location: InterviewStageLocation.ZOOM,
    isCompleted: true,
    interviewerName: "Alex Rodriguez",
    preparationNotes: "Review Azure services and architecture patterns",
    reflectionNotes:
      "Technical discussion was good, but they mentioned the role might be on hold",
    questionsAsked: "How would you design a multi-region cloud architecture?",
    whyItDidntGoWell: null,
    betterAnswerToday: null,
    outcome: "On hold - waiting for budget approval",
    scheduledAt: new Date("2024-01-10T09:00:00Z"),
  },
  // Stages for Apple iOS Developer (DRAFT - no stages yet)
  // Stages for Meta Full Stack Engineer (OFFER)
  {
    id: "880e8400-e29b-41d4-a716-446655440005",
    applicationId: "770e8400-e29b-41d4-a716-446655440004",
    order: 1,
    type: InterviewStageType.HR,
    location: InterviewStageLocation.ZOOM,
    isCompleted: true,
    interviewerName: "Emily Brown",
    preparationNotes: "Research Meta culture and values",
    reflectionNotes: "Great conversation about company mission",
    questionsAsked: "Why do you want to work at Meta?",
    whyItDidntGoWell: null,
    betterAnswerToday: null,
    outcome: "Passed",
    scheduledAt: new Date("2024-01-08T10:00:00Z"),
  },
  {
    id: "880e8400-e29b-41d4-a716-446655440006",
    applicationId: "770e8400-e29b-41d4-a716-446655440004",
    order: 2,
    type: InterviewStageType.TECHNICAL,
    location: InterviewStageLocation.GOOGLE_MEET,
    isCompleted: true,
    interviewerName: "Robert Taylor",
    preparationNotes: "Practice React and system design",
    reflectionNotes: "Solved the coding challenge efficiently",
    questionsAsked: "Build a real-time chat component",
    whyItDidntGoWell: null,
    betterAnswerToday: null,
    outcome: "Passed",
    scheduledAt: new Date("2024-01-12T14:00:00Z"),
  },
  {
    id: "880e8400-e29b-41d4-a716-446655440007",
    applicationId: "770e8400-e29b-41d4-a716-446655440004",
    order: 3,
    type: InterviewStageType.MANAGER,
    location: InterviewStageLocation.IN_PERSON,
    isCompleted: true,
    interviewerName: "Lisa Anderson",
    preparationNotes: "Prepare questions about team and projects",
    reflectionNotes: "Great discussion about the role and team",
    questionsAsked: "How do you handle conflicting priorities?",
    whyItDidntGoWell: null,
    betterAnswerToday: null,
    outcome: "Offer extended!",
    scheduledAt: new Date("2024-01-18T11:00:00Z"),
  },
  // Stages for Microsoft Backend Engineer (REJECTED)
  {
    id: "880e8400-e29b-41d4-a716-446655440008",
    applicationId: "770e8400-e29b-41d4-a716-446655440005",
    order: 1,
    type: InterviewStageType.TECHNICAL,
    location: InterviewStageLocation.ZOOM,
    isCompleted: true,
    interviewerName: "Tom Wilson",
    preparationNotes: "Review distributed systems concepts",
    reflectionNotes: "Struggled with the system design question",
    questionsAsked: "Design a distributed cache system",
    whyItDidntGoWell: "Did not fully understand the consistency requirements",
    betterAnswerToday:
      "I would focus more on CAP theorem and trade-offs between consistency and availability",
    outcome: "Rejected",
    scheduledAt: new Date("2024-01-05T13:00:00Z"),
  },
];

// Helper function to get all dummy data in a structured format
export const getAllDummyData = () => ({
  users: dummyUsers,
  companies: dummyCompanies,
  applications: dummyApplications,
  interviewStages: dummyInterviewStages,
});
