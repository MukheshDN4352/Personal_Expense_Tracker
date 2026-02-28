import toast from "react-hot-toast";

const showGlassToast = (message, type = "success") => {
  toast.custom((t) => (
    <div
      className={`
        relative
        overflow-hidden
        px-6 py-3
        rounded-2xl
        text-white
        backdrop-blur-3xl
        bg-white/5
        border border-white/20
        shadow-[0_8px_40px_rgba(0,0,0,0.45)]
        transition-all duration-300 ease-out
        ${t.visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 -translate-y-2 scale-95"}
      `}
    >
      {/* Gradient Highlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-20 pointer-events-none" />

      {/* Subtle Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.4\"/></svg>')",
        }}
      />

      <div className="relative flex items-center gap-3">
        <div
          className={`w-2.5 h-2.5 rounded-full animate-pulse ${
            type === "success" ? "bg-green-400" : "bg-red-400"
          }`}
        />
        <span className="text-sm tracking-wide font-medium">
          {message}
        </span>
      </div>
    </div>
  ));
};

export default showGlassToast;