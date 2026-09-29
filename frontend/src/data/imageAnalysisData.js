// ============================================================
// IMAGE ANALYSIS — data model, pipeline definition & mock outputs
// Mirror of the existing Wave Analysis / Solvyn Analysis pattern
// (frontend prototype: no backend — swap with real API later).
// ============================================================

export const ACCEPTED_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.tif', '.tiff']
export const ACCEPTED_IMAGE_MIME = [
  'image/jpeg', 'image/png',
  'image/tiff', 'image/tif',
]

export const IMAGE_MAX_BYTES = 50 * 1024 * 1024   // hard cap (matches Pre & Post upload)
export const IMAGE_LARGE_BYTES = 15 * 1024 * 1024 // above this, ask the user before "uploading"

export function getFileExtension(name) {
  const idx = name.lastIndexOf('.')
  return idx >= 0 ? name.slice(idx).toLowerCase() : ''
}

export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// Multi-stage AI pipeline (mirrors the real architecture).
// Each stage maps to the backend processing modules described in the spec:
//   Stage 1 Detection/Segmentation, Stage 2 Matching, Stage 3 Displacement,
//   Stage 4 Rotation, Stage 5 Defects, then wave correlation + reporting.
export const PIPELINE_STAGES = [
  'Validating PRE & POST event images',
  'Detecting & segmenting armour stones',
  'Matching PRE ↔ POST stone units',
  'Computing displacement — ΔX, ΔY, ΔZ',
  'Estimating rotation & orientation change',
  'Detecting defects — crack, chip, fracture, breakage, missing',
  'Combining wave analysis context',
  'Generating armour-stone analysis report',
]

// Mock stage-2 PRE↔POST unit matches.
// Coordinates are normalized (0–100) so overlays render over any preview size.
// px = image-space displacement magnitude in px; dz = height change (mm) used
// when 3D / point-cloud data is available.
export const mockStoneMatches = [
  { id: 'S-3053', zone: 'Zone 03', matched: true, pre: { x: 40, y: 42 }, post: { x: 54, y: 50 }, dX: 86, dY: 48, px: 98.5, dz: 34, dir: 'NE', rotation: { roll: 2.4, pitch: 1.6, yaw: 12.4 }, defect: 'Displaced', severity: 'High', confidence: 94, status: 'Confirmed' },
  { id: 'S-3105', zone: 'Zone 09', matched: true, pre: { x: 70, y: 28 }, post: { x: 88, y: 22 }, dX: 108, dY: -36, px: 113.8, dz: -52, dir: 'NW', rotation: { roll: -4.1, pitch: 2.2, yaw: 18.6 }, defect: 'Breakage', severity: 'Critical', confidence: 96, status: 'Confirmed' },
  { id: 'S-3061', zone: 'Zone 04', matched: true, pre: { x: 62, y: 36 }, post: { x: 55, y: 52 }, dX: -42, dY: 64, px: 76.5, dz: 12, dir: 'SE', rotation: { roll: -3.1, pitch: 0.8, yaw: 8.8 }, defect: 'Chip', severity: 'Medium', confidence: 88, status: 'Confirmed' },
  { id: 'S-3022', zone: 'Zone 02', matched: true, pre: { x: 24, y: 60 }, post: { x: 32, y: 44 }, dX: 48, dY: -40, px: 62.5, dz: 18, dir: 'NW', rotation: { roll: 1.2, pitch: -2.6, yaw: 15.2 }, defect: 'Rotation', severity: 'Medium', confidence: 86, status: 'Review' },
  { id: 'S-3098', zone: 'Zone 08', matched: true, pre: { x: 46, y: 68 }, post: { x: 52, y: 71 }, dX: 36, dY: 18, px: 40.2, dz: 6, dir: 'NE', rotation: { roll: 0.9, pitch: 0.5, yaw: 3.4 }, defect: 'Fracture', severity: 'High', confidence: 90, status: 'Confirmed' },
  { id: 'S-3057', zone: 'Zone 03', matched: true, pre: { x: 52, y: 44 }, post: { x: 57, y: 48 }, dX: 30, dY: 24, px: 38.4, dz: 4, dir: 'NE', rotation: { roll: 0.4, pitch: 0.2, yaw: 4.2 }, defect: 'Crack', severity: 'Medium', confidence: 91, status: 'Confirmed' },
  { id: 'S-3059', zone: 'Zone 05', matched: true, pre: { x: 33, y: 34 }, post: { x: 31, y: 36 }, dX: -12, dY: 12, px: 17.0, dz: 0, dir: 'SE', rotation: { roll: 0.1, pitch: 0.1, yaw: 0.6 }, defect: 'Minor Erosion', severity: 'Low', confidence: 79, status: 'Review' },
  { id: 'S-3048', zone: 'Zone 06', matched: true, pre: { x: 80, y: 55 }, post: { x: 82, y: 56 }, dX: 12, dY: 6, px: 13.4, dz: 2, dir: 'NE', rotation: { roll: 0.2, pitch: 0.1, yaw: 1.8 }, defect: 'Minor Erosion', severity: 'Low', confidence: 82, status: 'Review' },
  { id: 'S-3110', zone: 'Zone 10', matched: true, pre: { x: 50, y: 50 }, post: { x: 50, y: 50 }, dX: -3, dY: 2, px: 3.6, dz: 0, dir: 'S', rotation: { roll: 0, pitch: 0, yaw: 0.1 }, defect: 'None', severity: 'Low', confidence: 95, status: 'Confirmed' },
  { id: 'S-3121', zone: 'Zone 11', matched: false, pre: { x: 65, y: 70 }, post: null, dX: null, dY: null, px: null, dz: null, dir: '—', rotation: null, defect: 'Missing Unit', severity: 'Critical', confidence: 89, status: 'Confirmed' },
]

export const mockDefects = [
  { id: 'DEF-001', stone: 'S-3105', location: 'Zone 09', type: 'Breakage', severity: 'Critical', confidence: 96, status: 'Confirmed' },
  { id: 'DEF-002', stone: 'S-3121', location: 'Zone 11', type: 'Missing unit', severity: 'Critical', confidence: 89, status: 'Confirmed' },
  { id: 'DEF-003', stone: 'S-3053', location: 'Zone 03', type: 'Displacement', severity: 'High', confidence: 94, status: 'Confirmed' },
  { id: 'DEF-004', stone: 'S-3098', location: 'Zone 08', type: 'Fracture', severity: 'High', confidence: 90, status: 'Confirmed' },
  { id: 'DEF-005', stone: 'S-3057', location: 'Zone 03', type: 'Crack', severity: 'Medium', confidence: 91, status: 'Confirmed' },
  { id: 'DEF-006', stone: 'S-3061', location: 'Zone 04', type: 'Chip', severity: 'Medium', confidence: 88, status: 'Review' },
  { id: 'DEF-007', stone: 'S-3022', location: 'Zone 02', type: 'Rotation', severity: 'Medium', confidence: 86, status: 'Review' },
]

export const generatedOutputs = [
  { label: 'Stone Segmentation Masks', sub: 'Stage 1 · per-unit masks', bg: 'from-cyan-900/50 to-ocean-800' },
  { label: 'Matched PRE ↔ POST Units', sub: 'Stage 2 · marker pairs', bg: 'from-sky-900/50 to-ocean-800' },
  { label: 'Displacement Map', sub: 'Stage 3 · vectors', bg: 'from-teal-900/50 to-ocean-800' },
  { label: 'Point Cloud / 3D Unit Model', sub: 'Stage 4 · DSM/DEM', bg: 'from-indigo-900/50 to-ocean-800' },
]

// Labels used so displacement is never reported as true physical metres
// unless a valid scale / GCP / photogrammetry source is present.
export const DISPLACEMENT_NOTICE =
  'Image-space (pixel) estimates only. Physical displacement in millimetres requires a valid scale reference, GCPs, camera calibration, photogrammetry or a point cloud.'