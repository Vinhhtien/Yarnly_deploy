type PixelIconKind = "yarn" | "flower" | "gift" | "heart"

export default function PixelIcon({
  kind = "yarn",
  className,
}: {
  kind?: PixelIconKind
  className?: string
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      shapeRendering="crispEdges"
    >
      {kind === "yarn" && (
        <>
          <path
            d="M5 1h6v2h2v2h2v6h-2v2h-2v2H5v-2H3v-2H1V5h2V3h2z"
            fill="#b6c98a"
          />
          <path
            d="M5 3h6v2H5zM3 5h2v4H3zM5 9h6v2H5zM9 5h4v2H9zM5 13h6v2H5z"
            fill="#5e7b45"
          />
          <path d="M7 5h2v2H7zM11 9h2v4h-2zM5 7h2v2H5z" fill="#e8edcd" />
        </>
      )}
      {kind === "flower" && (
        <>
          <path d="M7 8h2v8H7zM3 11h4v2H3zM9 12h4v2H9z" fill="#668c4b" />
          <path d="M5 0h6v3h3v5h-3v3H5V8H2V3h3z" fill="#e2b09b" />
          <path d="M6 3h4v2h2v3H9v2H6V7H4V5h2z" fill="#f7ddc1" />
          <path d="M6 4h4v4H6z" fill="#e0b858" />
        </>
      )}
      {kind === "gift" && (
        <>
          <path d="M2 7h12v8H2zM1 5h14v3H1z" fill="#8aaabd" />
          <path d="M7 5h2v10H7zM2 9h5v2H2zM9 9h5v2H9z" fill="#e9e0b8" />
          <path d="M4 1h3v2h2V1h3v4H4z" fill="#ddcfa1" />
        </>
      )}
      {kind === "heart" && (
        <>
          <path
            d="M2 2h4v2h4V2h4v2h2v6h-2v2h-2v2h-2v2H6v-2H4v-2H2v-2H0V4h2z"
            fill="#94ad77"
          />
          <path d="M2 4h4v2H2zM2 6h2v3H2z" fill="#dce9c2" />
        </>
      )}
    </svg>
  )
}
