#!/bin/bash

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is not installed. Please install it first."
    echo "On Ubuntu/Debian: sudo apt install imagemagick"
    echo "On CentOS/RHEL: sudo yum install imagemagick"
    echo "On macOS: brew install imagemagick"
    exit 1
fi

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Directory containing images (relative to script location)
IMAGE_DIR="${SCRIPT_DIR}/images"

# Check if directory exists
if [ ! -d "$IMAGE_DIR" ]; then
    echo "Directory $IMAGE_DIR does not exist."
    exit 1
fi

# Maximum width or height for the resized images
MAX_SIZE=800

# Quality for JPEG images (1-100, higher is better)
QUALITY=85

# Supported image extensions
EXTENSIONS=("jpg" "jpeg" "png" "gif" "bmp" "tiff")

# Process each image
for ext in "${EXTENSIONS[@]}"; do
    while IFS= read -r -d $'\0' file; do
        echo "Resizing $file..."
        
        # Create a temporary file
        temp_file="${file}.tmp"
        
        # Resize the image while maintaining aspect ratio
        convert "$file" -resize "${MAX_SIZE}x${MAX_SIZE}>" -quality "$QUALITY" "$temp_file"
        
        # Check if conversion was successful
        if [ $? -eq 0 ]; then
            # Replace original with resized version
            mv "$temp_file" "$file"
            echo "Successfully resized $file"
        else
            echo "Failed to resize $file"
            rm -f "$temp_file"
        fi
    done < <(find "$IMAGE_DIR" -type f -iname "*.$ext" -print0)
done

echo "Image resizing complete."