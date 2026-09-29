import { useRef, useEffect, useState } from 'react'
import { UploadCloud, X, RotateCcw, FileImage, CircleAlert, ShieldCheck, Loader2 } from 'lucide-react'
import {
  ACCEPTED_IMAGE_EXTENSIONS, IMAGE_MAX_BYTES, IMAGE_LARGE_BYTES,
  getFileExtension, formatFileSize,
} from '../data/imageAnalysisData.js'

async function readTiffDimensions(buffer) {
  if (!buffer || buffer.byteLength < 8) return null
  const dv = new DataView(buffer)
  const order = dv.getUint16(0, false)
  const little = order === 0x4949 // 'II'
  if (order !== 0x4949 && order !== 0x4D4D) return null
  if (dv.getUint16(2, little) !== 42) return null
  let offset = dv.getUint32(4, little)
  if (offset + 2 > buffer.byteLength) return null
  const entries = dv.getUint16(offset, little)
  offset += 2
  let width = null
  let height = null
  for (let i = 0; i < entries && width == null; i++) {
    const entry = offset + i * 12
    if (entry + 12 > buffer.byteLength) break
    const tag = dv.getUint16(entry, little)
    const type = dv.getUint16(entry + 2, little)
    const count = dv.getUint32(entry + 4, little)
    if (count !== 1) continue
    if (type === 3 || type === 4) {
      const value = type === 3 ? dv.getUint16(entry + 8, little) : dv.getUint32(entry + 8, little)
      if (tag === 256) width = value
      else if (tag === 257) height = value
    }
  }
  return width && height ? { width, height } : null
}

async function readImageDimensions(file) {
  const ext = getFileExtension(file.name)
  if (ext === '.tif' || ext === '.tiff') {
    try {
      return await readTiffDimensions(await file.arrayBuffer())
    } catch {
      return { width: null, height: null }
    }
  }
  try {
    const bmp = await createImageBitmap(file)
    const dims = { width: bmp.width, height: bmp.height }
    bmp.close()
    return dims
  } catch {
    return null
  }
}

export default function ImageUploadCard({
  tag,
  tagClass = 'bg-accent-dim text-accent-light',
  icon: Icon = UploadCloud,
  title,
  subtitle,
  purpose,
  file,
  onReady,
  onRemove,
  metaFields = [],
}) {
  const inputRef = useRef(null)
  const [error, setError] = useState('')
  const [pending, setPending] = useState(null)
  const [progress, setProgress] = useState(null)

  useEffect(() => {
    return () => {
      if (file?.preview) URL.revokeObjectURL(file.preview)
    }
  }, [file])

  function handleFiles(files) {
    const raw = files?.[0]
    if (!raw) return
    setError('')
    const ext = getFileExtension(raw.name)
    if (!ACCEPTED_IMAGE_EXTENSIONS.includes(ext)) {
      setError('Unsupported file type. Supported: JPG, JPEG, PNG, TIFF.')
      return
    }
    if (raw.size <= 0) {
      setError('The selected file is empty.')
      return
    }
    if (raw.size > IMAGE_MAX_BYTES) {
      setError(`File too large. Maximum size is ${formatFileSize(IMAGE_MAX_BYTES)}.`)
      return
    }
    if (raw.size > IMAGE_LARGE_BYTES) {
      setPending(raw)
      return
    }
    accept(raw)
  }

  async function accept(raw) {
    setPending(null)
    setError('')
    const dims = await readImageDimensions(raw)
    if (dims === null) {
      setError('Could not read image data — the file appears to be corrupted.')
      return
    }
    const ext = getFileExtension(raw.name)
    const isTiff = ext === '.tif' || ext === '.tiff'
    const preview = isTiff ? null : URL.createObjectURL(raw)
    setProgress(0)
    for (let step = 0; step < 8; step++) {
      await new Promise((r) => setTimeout(r, 90))
      setProgress(Math.round(((step + 1) / 8) * 100))
    }
    setProgress(null)
    onReady({ name: raw.name, size: raw.size, type: raw.type, ext, width: dims.width, height: dims.height, preview, tiff: isTiff })
  }

  return (
    <div className="card-panel p-4">
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="flex items-center gap-2 text-white font-semibold text-sm">
          <Icon size={16} className="text-accent-light" /> {title}
        </div>
        <span className={`badge shrink-0 ${tagClass}`}>{tag}</span>
      </div>
      <p className="text-xs text-txt-muted mb-1">{subtitle}</p>
      {purpose && <p className="text-[10px] text-txt-dim mb-3">{purpose}</p>}

      {!pending && !file && progress === null && (
        <label
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            handleFiles(e.dataTransfer.files)
          }}
          className="border-2 border-dashed border-accent/25 rounded-xl h-36 flex flex-col items-center justify-center text-center cursor-pointer hover:border-accent/50 hover:bg-accent/5 transition-all mb-3"
        >
          <UploadCloud size={22} className="text-accent-light mb-2" />
          <p className="text-xs text-txt-primary font-medium">Click to upload or drag and drop</p>
          <p className="text-[10px] text-txt-dim mt-1">JPG, JPEG, PNG, TIFF (Max 50MB)</p>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept=".jpg,.jpeg,.png,.tif,.tiff"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
      )}

      {pending && (
        <div className="rounded-xl border border-warning/30 bg-warning/5 p-4 mb-3">
          <div className="flex items-start gap-3">
            <CircleAlert size={16} className="text-warning mt-0.5 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white">Large file detected</p>
              <p className="text-[11px] text-txt-muted mt-0.5">
                <span className="text-warning font-medium">{formatFileSize(pending.size)}</span> — this exceeds the
                comfortable upload size ({formatFileSize(IMAGE_LARGE_BYTES)}). Large images may take longer to process.
              </p>
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={() => accept(pending)}
                  className="btn-primary px-3 py-1.5 text-[11px] font-semibold"
                >
                  Upload anyway
                </button>
                <button
                  onClick={() => setPending(null)}
                  className="btn-outline px-3 py-1.5 text-[11px] font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {file && (
        <div className="relative rounded-xl overflow-hidden h-36 mb-3">
          {file.preview ? (
            <img src={file.preview} alt={`${tag} preview`} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-ocean-700 via-ocean-800 to-ocean-900 flex flex-col items-center justify-center gap-2">
              <FileImage size={28} className="text-accent-light" />
              <span className="badge bg-accent-dim text-accent-light">TIFF — preview not supported in browser</span>
              <span className="text-[10px] text-txt-dim">Will be rendered server-side</span>
            </div>
          )}
          <button
            onClick={(e) => { e.preventDefault(); onRemove() }}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-danger transition-colors"
            title="Remove image"
          >
            <X size={13} />
          </button>
          <span className="absolute bottom-2 left-2 text-[10px] text-white bg-black/40 px-2 py-0.5 rounded">{tag}</span>
        </div>
      )}

      {progress !== null && (
        <div className="mb-3">
          <div className="flex items-center gap-2 text-[11px] text-accent-light mb-1.5">
            <Loader2 size={12} className="animate-spin" /> Uploading…
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[10px] text-txt-dim mt-1 text-right">{progress}%</p>
        </div>
      )}

      {file && (
        <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/5 px-3 py-2.5 mb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-medium text-white truncate">{file.name}</p>
              <p className="text-[11px] text-txt-muted mt-0.5">{formatFileSize(file.size)}</p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => inputRef.current?.click()}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-txt-muted hover:text-white transition-colors"
                title="Replace file"
              >
                <RotateCcw size={13} />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[11px] text-txt-dim">
            <span>{file.width && file.height ? `${file.width} × ${file.height} px` : 'Dimensions: TIFF (parsed server-side)'}</span>
            <span className="text-success flex items-center gap-1"><ShieldCheck size={12} /> Ready for analysis</span>
          </div>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept=".jpg,.jpeg,.png,.tif,.tiff"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      )}

      {error && (
        <div className="flex items-center gap-1.5 text-[11px] text-danger mb-1">
          <CircleAlert size={12} /> {error}
        </div>
      )}

      {metaFields.length > 0 && (
        <div className="space-y-2.5 text-xs">
          {metaFields.map((f) => {
            const FIcon = f.icon
            return (
              <div key={f.label}>
                <p className="text-txt-muted flex items-center gap-1.5 mb-1"><FIcon size={12} /> {f.label}</p>
                <div className="input-dark px-3 py-2 flex items-center justify-between text-txt-primary">
                  <span>{f.value}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}