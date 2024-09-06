import { NotepadTextDashed } from "lucide-react"

export default function Empty() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full text-xs uppercase">
      <NotepadTextDashed />
      <div>No data</div>
    </div>
  )
}
