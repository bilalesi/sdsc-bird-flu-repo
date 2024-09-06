export default function getInitials(str: string) {
  return str
    .split(" ")
    .map((p) => p.at(0))
    .join("")
}
