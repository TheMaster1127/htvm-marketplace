#!/bin/bash

# generate_marketplace.sh
#
# This script automatically generates the `marketplace.json` manifest.
# It recursively finds all 'plugin.json' files, extracts the necessary
# metadata, determines the version and folder name from the path,
# and builds the final JSON index.
#
# REQUIREMENTS:
# - `jq`: This script requires the 'jq' command-line JSON processor.
#   On Arch Linux: sudo pacman -S jq
#   On Debian/Ubuntu: sudo apt-get install jq
#
# USAGE:
# 1. Place this script in the root of your htvm-marketplace repository.
# 2. Make it executable: chmod +x generate_marketplace.sh
# 3. Run it: ./generate_marketplace.sh
# 4. A `marketplace.json` file will be created/overwritten in the root.
# 5. Commit and push the updated `marketplace.json` to your repository.

echo "Scanning for plugins..."

# Use find to locate all plugin.json files and process them with jq
# This creates a stream of individual JSON objects, one for each plugin version found.
PLUGIN_DATA=$(find . -name "plugin.json" -print0 | while IFS= read -r -d $'\0' file; do
    # Extract the version folder name (e.g., "1.0.0" or "v1.0")
    VERSION_FOLDER=$(basename "$(dirname "$file")")
    
    # Extract the plugin ID (the folder containing the version folders)
    PLUGIN_ID=$(basename "$(dirname "$(dirname "$file")")")
    
    # Use jq to parse the plugin.json and add our extracted path info
    jq -c \
        --arg id "$PLUGIN_ID" \
        --arg ver "$VERSION_FOLDER" \
        '{
            id: $id,
            name: .name,
            description: .description,
            author: .author,
            version: .version,
            folderName: $ver
        }' "$file"
done)

echo "Generating marketplace.json..."

# Use jq again to process the stream of objects into the final grouped format
echo "$PLUGIN_DATA" | jq -s '
    group_by(.id) | map({
        id: .[0].id,
        name: .[0].name,
        description: .[0].description,
        author: .[0].author,
        versions: (
            map({ (.version): { folderName: .folderName } }) | add
        )
    })
' > marketplace.json

echo "Done. marketplace.json has been generated."
