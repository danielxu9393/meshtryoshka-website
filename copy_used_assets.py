import re
import shutil
from pathlib import Path

# Paths
SRC_FILE = Path("src/routes/+page.svelte")
STATIC_ALL = Path("static_all")
STATIC = Path("static")

# Regex pattern:
# Matches:
# - src="..." (in HTML)
# - src='...'
# - 'before': '/path/to/file'
# - "after": "/path/to/file"
pattern = re.compile(
    r"""
    [="'`]      # Start after = or : or opening quote
    (           # Capture group
        \/      # Starts with /
        [^"'`>\s]+      # No whitespace or end of string/attribute
        \.(?:png|jpg|jpeg|svg|mp4)  # Extensions of interest
    )
    [ "'`>]     # End with closing quote or space or >
    """,
    re.IGNORECASE | re.VERBOSE
)

# Read the Svelte file
with SRC_FILE.open("r", encoding="utf-8") as f:
    content = f.read()

# Find all relevant paths
matches = pattern.findall(content)

# Remove duplicates
unique_matches = set(matches)

# Copy each file from static_all to static
for rel_path in unique_matches:
    source_file = STATIC_ALL / rel_path.strip("/")
    dest_file = STATIC / rel_path.strip("/")
    dest_dir = dest_file.parent

    if source_file.exists():
        dest_dir.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source_file, dest_file)
        print(f"✅ Copied {source_file} -> {dest_file}")
    else:
        print(f"⚠️ Warning: {source_file} not found!")

print("✅ Asset copying complete!")