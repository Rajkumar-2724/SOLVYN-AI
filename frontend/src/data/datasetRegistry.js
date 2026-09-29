// ============================================================
// PUBLIC DATA SOURCE REGISTRY
// Training / validation datasets for armour-stone displacement
// and defect detection. Backend tooling should pull models and
// evaluation sets from these sources.
// ============================================================

export const datasetRegistry = [
  {
    id: 'douro-river',
    name: 'Douro River Breakwater',
    location: 'Portugal',
    priority: 'PRIMARY',
    url: 'https://doi.org/10.3390/rs16020331',
    repositoryUrl: null,
    useCases: [
      'Real breakwater',
      'PRE/POST UAV surveys',
      'Armour-unit displacement',
      'Rotation',
      'Photogrammetry',
      'Point clouds',
    ],
    formats: ['UAV imagery', 'Orthomosaic', 'Point cloud', 'DSM'],
    notes: 'Peer-reviewed Remote Sensing dataset (2024). Primary reference for PRE/POST armour-unit displacement & rotation analysis on a real rubblemound breakwater.',
  },
  {
    id: 'leixoes',
    name: 'Leixões Breakwater',
    location: 'Portugal',
    priority: 'PRIMARY',
    url: 'https://www.sciencedirect.com/science/article/pii/S2452321622000816',
    repositoryUrl: 'https://repositorio.lnec.pt/xmlui/handle/123456789/1015921',
    useCases: [
      'Real breakwater',
      'UAV',
      'Multi-temporal surveys',
      'Point clouds',
      'Movement/change analysis',
    ],
    formats: ['UAV imagery', 'Point cloud', 'Multi-temporal surveys'],
    notes: 'Procedia Structural Integrity article; payload mirrored at the LNEC repository.',
  },
  {
    id: 'sines',
    name: 'Sines Breakwater',
    location: 'Portugal',
    priority: 'PRIMARY',
    url: 'https://www.sciencedirect.com/science/article/pii/S0029801826020226',
    repositoryUrl: null,
    useCases: [
      'Armour-unit localization',
      'Position',
      'Orientation',
      'Orthographic imagery',
      'Point clouds',
      'Multi-temporal analysis',
    ],
    formats: ['Orthographic imagery', 'Point cloud', 'Multi-temporal surveys'],
    notes: 'Armour-unit positioning & orientation use-case on a real port breakwater.',
  },
  {
    id: 'nauset-light',
    name: 'Nauset Light Beach — Hurricane Lee',
    location: 'USA (Nauset Light Beach, MA)',
    priority: 'SECONDARY',
    url: 'https://data.usgs.gov/datacatalog/data/US',
    repositoryUrl: null,
    useCases: [
      'Post-storm UAS imagery',
      'Coastal change after Hurricane Lee',
    ],
    formats: ['UAS imagery'],
    notes: 'USGS Data Catalog entry for post-Hurricane Lee UAS surveys. Verify the full catalog identifier at the USGS page before integrating.',
  },
]

export const priorityBadge = (priority) =>
  priority === 'PRIMARY'
    ? 'bg-success-dim text-success'
    : 'bg-warning-dim text-warning'

// ============================================================
// DEFECT TAXONOMY & ANNOTATION WORKFLOW
// Defect labels are NOT invented on the fly — the model only ever
// predicts classes from this fixed taxonomy. Future real-world
// imagery should be labelled using the workflow below so the
// detection stages can be fine-tuned on actual field data.
// ============================================================

export const defectTaxonomy = [
  { id: 'crack', label: 'Crack' },
  { id: 'chip', label: 'Chip' },
  { id: 'fracture', label: 'Fracture' },
  { id: 'breakage', label: 'Breakage' },
  { id: 'missing-unit', label: 'Missing unit' },
  { id: 'shape-change', label: 'Severe shape change' },
  { id: 'displacement', label: 'Displacement' },
  { id: 'rotation', label: 'Rotation' },
]

export const annotationWorkflow = {
  labelFormat: 'COCO / YOLO-Seg segmentation masks + SAM-assisted polygon refinement',
  tools: ['CVAT', 'Label Studio', 'Roboflow'],
  steps: [
    'Capture PRE/POST field or UAV imagery (ideally with GCPs / point cloud).',
    'Annotate every visible armour unit as an instance segmentation mask.',
    'Assign each unit a persistent stone ID + zone.',
    'Mark defects using only the fixed taxonomy above (crack, chip, fracture, breakage, missing unit, severe shape change).',
    'Export masks & labels, then train/evaluate Stage 1 (detection) and Stage 5 (defects).',
  ],
  notes:
    'Keep the label set frozen. Any new defect type must be added to the taxonomy and re-annotated before models can predict it.',
}