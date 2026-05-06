import os
import re
import urllib.request
import hashlib
from urllib.parse import urlparse

directory = r"C:\class\.vscode\freelance_pitch_deck_designer"
images_dir = os.path.join(directory, "assets", "images")
os.makedirs(images_dir, exist_ok=True)

# Regex to find image URLs
url_pattern = re.compile(r'(https://images\.unsplash\.com/[^\s"\'<>]+|https://www\.svgrepo\.com/[^\s"\'<>]+)')

def download_image(url):
    # Create a simple hash-based filename
    hash_obj = hashlib.md5(url.encode('utf-8'))
    ext = ".svg" if "svgrepo" in url else ".jpg"
    filename = hash_obj.hexdigest()[:10] + ext
    filepath = os.path.join(images_dir, filename)
    
    if not os.path.exists(filepath):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
                out_file.write(response.read())
            print(f"Downloaded: {filename}")
        except Exception as e:
            print(f"Failed to download {url}: {e}")
            return url
            
    return f"assets/images/{filename}"

url_map = {}

for filename in os.listdir(directory):
    if filename.endswith(".html"):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Fix 2: navbar alignment
        content = content.replace('class="nav-link dropdown"', 'class="nav-item dropdown"')
        
        # Fix 4: favicon
        if '<link rel="icon"' not in content:
            content = content.replace('</head>', '    <link rel="icon" type="image/svg+xml" href="assets/images/favicon.svg">\n</head>')
            
        # Fix 5: social icons
        content = content.replace('class="text-white fs-5"', 'class="social-icon fs-5"')
        
        # Fix 7: RTL icon in dashboard.html
        if filename == "dashboard.html":
            content = content.replace('d-none d-sm-block">RTL</button>', 'd-none d-sm-block"><i class="ph ph-arrows-left-right"></i> RTL</button>')
            
        # Fix 1: Download images and replace URLs
        urls = url_pattern.findall(content)
        for url in urls:
            # handle html entities if any
            clean_url = url.replace('&amp;', '&')
            if clean_url not in url_map:
                url_map[clean_url] = download_image(clean_url)
            
            content = content.replace(url, url_map[clean_url])
            
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
            
print("Update complete.")
