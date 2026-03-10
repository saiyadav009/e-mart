import os
import glob
import re

components_dir = 'c:/Users/saipr_2dydpp0/OneDrive/Desktop/e-mart/e-mart/src/stores/components'
files = glob.glob(os.path.join(components_dir, '*.jsx'))

mapping = {
    'Mobiles.jsx': 'mobiles_banner.png',
    'Computers.jsx': 'computers_banner.png',
    'Watch.jsx': 'watch_banner.png',
    'Men.jsx': 'men_banner.png',
    'Woman.jsx': 'woman_banner.png',
    'Furniture.jsx': 'furniture_banner.png',
    'AC.jsx': 'ac_banner.png',
    'Fans.jsx': 'fans_banner.png',
    'Fridge.jsx': 'fridge_banner.png',
    'RiceCookers.jsx': 'rice_cookers_banner.png',
    'Sneakers.jsx': 'sneakers_banner.png',
    'Books.jsx': 'books_banner.png',
    'TV.jsx': 'tv_banner.png',
    'Speaker.jsx': 'speaker_banner.png',
    'Kitchen.jsx': 'kitchen_banner.png'
}

for filepath in files:
    filename = os.path.basename(filepath)
    if filename in mapping:
        img_name = mapping[filename]
        new_url = f"/assets/banners/{img_name}"
        
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # The background currently looks like: background: 'url(https://rukminim1.flixcart.com/...) center/cover no-repeat'
        # or maybe something else. It's inside a style object: background: 'url(...) center/cover no-repeat'
        
        # we can replace the url(...) with url(/assets/banners/img_name)
        new_content = re.sub(r'background:\s*\'url\([^)]+\)\s+center/cover\s+no-repeat\'', f"background: 'url({new_url}) center/cover no-repeat'", content)
        new_content = re.sub(r'background:\s*"url\([^)]+\)\s+center/cover\s+no-repeat"', f'background: "url({new_url}) center/cover no-repeat"', new_content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filename}")
