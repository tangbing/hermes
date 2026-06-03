# macOS local TTS provider.
# Uses the system `say` command and converts AIFF output to mp3 with ffmpeg.

tts_check() {
  command -v say >/dev/null || { echo "✗ 'say' not available (macOS only)" >&2; return 1; }
  command -v ffmpeg >/dev/null || { echo "✗ ffmpeg not found" >&2; return 1; }
}

tts_install_help() {
  cat <<'EOF' >&2
macOS-only local provider. It needs ffmpeg for AIFF to mp3 conversion:
  brew install ffmpeg

List available voices:
  say -v '?'
EOF
}

tts_synthesize() {
  local text="$1"
  local out="$2"
  local voice="${3:-Reed (中文（中国大陆）)}"
  local tmp

  tmp="$(mktemp -t presentation-tts).aiff"
  say -v "$voice" -o "$tmp" "$text" &&
    ffmpeg -y -i "$tmp" -codec:a libmp3lame -qscale:a 2 "$out" >/dev/null 2>&1
  local code=$?
  rm -f "$tmp"
  return "$code"
}
