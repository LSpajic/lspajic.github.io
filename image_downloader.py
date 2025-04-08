import json
import os
import time
from pathlib import Path
import requests
from duckduckgo_search import DDGS

# Configure headers to avoid blocking
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}

def parse_data_js(file_path):
    """Parse the JavaScript data file into a Python dictionary"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        json_str = content.split('const data = ', 1)[1].rsplit(';', 1)[0].strip()
        return json.loads(json_str)

def download_image(url, file_path):
    """Download an image from a URL and save it to file_path"""
    try:
        response = requests.get(url, headers=headers, stream=True, timeout=10)
        response.raise_for_status()
        
        with open(file_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        print(f"✅ Downloaded {os.path.basename(file_path)}")
        return True
    except Exception as e:
        print(f"❌ Failed to download {os.path.basename(file_path)}: {e}")
        return False

def search_and_download(ddgs, search_term, file_path):
    """Search for an image and download the first result"""
    if os.path.exists(file_path):
        print(f"⏩ {os.path.basename(file_path)} already exists, skipping")
        return True
        
    try:
        results = ddgs.images(
            f"{search_term} instrument no watermark",
            safesearch='moderate',
            max_results=1
        )
        if results:
            return download_image(results[0]['image'], file_path)
        print(f"🔍 No results found for '{search_term}'")
        return False
    except Exception as e:
        print(f"⚠️ Error searching for '{search_term}': {e}")
        return False

def main():
    # Initialize components
    data = parse_data_js('scripts/data.js')
    image_dir = Path('images')
    image_dir.mkdir(exist_ok=True)
    ddgs = DDGS()

    # Process all images
    for category in data['categories']:
        # Process category image
        image_path = Path(category['image'])
        search_term = image_path.stem.replace('-', ' ')
        dest_path = image_dir / image_path.name
        search_and_download(ddgs, search_term, dest_path)
        
        # Process product images
        for product in category['products']:
            product_image_path = Path(product['image'])
            product_search_term = product_image_path.stem.replace('-', ' ')
            product_dest_path = image_dir / product_image_path.name
            search_and_download(ddgs, product_search_term, product_dest_path)
            time.sleep(1)  # Be polite between requests

if __name__ == '__main__':
    main()