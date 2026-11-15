export type Role = 'technician' | 'reader' | 'reviewer';

export type ExamStatus = 'pending' | 'reading' | 'review' | 'returned' | 'published';

export type FindingType = 'bleeding' | 'ulcer' | 'polyp' | 'vascular';

export type SegmentKey = 'esophagus' | 'stomach' | 'duodenum' | 'jejunum' | 'ileum' | 'colon';

export type ViewKey = 'registry' | 'reading' | 'lesions' | 'report' | 'stats';

export interface User {
  id: string;
  name: string;
  role: Role;
  title: string;
}

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

export type ExamSource =
  | { kind: 'generated'; seed: number; frameCount: number }
  | { kind: 'imported'; frameCount: number; importedFiles: string[] };

export interface SegmentRange {
  key: SegmentKey;
  name: string;
  startFrame: number;
  endFrame: number;
  startAdjustedBy: string | null;
  startAdjustedAt: number | null;
  endAdjustedBy: string | null;
  endAdjustedAt: number | null;
}

export interface Keyframe {
  id: string;
  assetId: string;
  frameIndex: number;
  segmentKey: SegmentKey;
  segmentName: string;
  capturedAt: number;
  capturedBy: string;
  capturedByName: string;
}

export interface Finding {
  id: string;
  examId: string;
  type: FindingType;
  sizeMm: number | null;
  frameIndex: number;
  box: Box;
  note: string;
  keyframes: Keyframe[];
  authorId: string;
  authorName: string;
  createdAt: number;
  updatedAt: number;
}

export interface Assessment {
  readerId: string;
  readerName: string;
  conclusion: string;
  impression: string;
  startedAt: number | null;
  submittedAt: number | null;
  readingSeconds: number;
  updatedAt: number;
}

export type ReportStatus = 'draft' | 'pending' | 'published' | 'superseded' | 'returned';

export interface ReportFindingSnapshot {
  id: string;
  type: FindingType;
  sizeMm: number | null;
  frameIndex: number;
  segmentName: string;
  note: string;
  keyframeCount: number;
  authorName: string;
}

export interface ReportSegmentSnapshot {
  key: SegmentKey;
  name: string;
  startFrame: number;
  endFrame: number;
}

export interface ReportVersion {
  id: string;
  examId: string;
  version: number;
  status: ReportStatus;
  conclusion: string;
  impression: string;
  findingsSnapshot: ReportFindingSnapshot[];
  segmentsSnapshot: ReportSegmentSnapshot[];
  readerConclusions: { readerId: string; readerName: string; conclusion: string }[];
  authorId: string;
  authorName: string;
  createdAt: number;
  submittedAt: number | null;
  reviewedAt: number | null;
  reviewerId: string | null;
  reviewerName: string | null;
  reviewComment: string;
  publishedAt: number | null;
  amendmentReason: string | null;
  replacesVersion: number | null;
}

export interface AmendmentState {
  reason: string;
  requestedBy: string;
  requestedByName: string;
  requestedAt: number;
  baseVersion: number;
  draftVersionId: string;
  status: 'draft' | 'returned';
  returnedComment: string;
  returnedAt: number | null;
}

export interface ReturnInfo {
  at: number;
  byId: string;
  byName: string;
  comment: string;
}

export interface Exam {
  id: string;
  code: string;
  patientName: string;
  patientSex: '男' | '女';
  patientAge: number;
  indication: string;
  notes: string;
  source: ExamSource;
  /** Effective playback frame rate, used for every time readout on this exam. */
  fps: number;
  status: ExamStatus;
  dualReading: boolean;
  readers: string[];
  readerNames: Record<string, string>;
  segments: SegmentRange[];
  findings: Finding[];
  assessments: Assessment[];
  reportVersions: ReportVersion[];
  amendment: AmendmentState | null;
  readPositions: Record<string, { frame: number; readingSeconds: number }>;
  registeredBy: string;
  registeredByName: string;
  registeredAt: number;
  updatedAt: number;
  submittedAt: number | null;
  publishedAt: number | null;
  lastReturn: ReturnInfo | null;
  returnCount: number;
}

export interface AuditEvent {
  id: string;
  examId: string;
  at: number;
  byId: string;
  byName: string;
  kind:
    | 'register'
    | 'import'
    | 'assign'
    | 'read'
    | 'boundary'
    | 'finding'
    | 'keyframe'
    | 'submit'
    | 'review'
    | 'publish'
    | 'return'
    | 'amend';
  message: string;
}

export interface AssetRecord {
  id: string;
  examId: string;
  kind: 'keyframe';
  blob: Blob;
  createdAt: number;
}

export interface FrameRecord {
  key: string;
  examId: string;
  frameIndex: number;
  blob: Blob;
}

export interface ValidationIssue {
  code: string;
  message: string;
  findingId?: string;
  target?: 'lesions' | 'report';
}

export interface ValidationResult {
  ok: boolean;
  issues: ValidationIssue[];
}

export interface ExamRegistrationInput {
  patientName: string;
  patientSex: '男' | '女';
  patientAge: number;
  indication: string;
  notes: string;
  dualReading: boolean;
  secondReaderId: string | null;
  sourceKind: 'generated' | 'imported';
  files: File[];
}
