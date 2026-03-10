import os
import glob
import re

components_dir = r"c:\Users\saipr_2dydpp0\OneDrive\Desktop\e-mart\e-mart\src\stores\components"

files = [
    "Mobiles.jsx", "Computers.jsx", "Fans.jsx", "Furniture.jsx",
    "Men.jsx", "Woman.jsx", "AC.jsx", "Fridge.jsx", "RiceCookers.jsx",
    "Sneakers.jsx", "Watch.jsx"
]

banner_images = {
    "Mobiles.jsx": "https://rukminim1.flixcart.com/fk-p-flap/278/278/image/75a15c3e19c3f7de.jpg?q=90",
    "Computers.jsx": "https://rukminim1.flixcart.com/fk-p-flap/278/278/image/b84f1c22cce1a6a3.jpg?q=90",
    "Fans.jsx": "https://rukminim1.flixcart.com/fk-p-flap/278/278/image/89f21f14aeaeebbc.jpg?q=90",
    "Furniture.jsx": "https://rukminim1.flixcart.com/fk-p-flap/278/278/image/e6cc9a1f2e86118b.jpg?q=90",
    "Men.jsx": "https://rukminim1.flixcart.com/fk-p-flap/278/278/image/f1cc7bf6ba39d736.jpg?q=90",
    "Woman.jsx": "https://rukminim1.flixcart.com/fk-p-flap/278/278/image/4a0abde0625eed2e.jpg?q=90",
    "AC.jsx": "https://rukminim1.flixcart.com/fk-p-flap/278/278/image/4a2e55a40a44af16.jpg?q=90",
    "Fridge.jsx": "https://rukminim1.flixcart.com/fk-p-flap/278/278/image/89f21f14aeaeebbc.jpg?q=90",
    "RiceCookers.jsx": "https://rukminim1.flixcart.com/fk-p-flap/278/278/image/4a2e55a40a44af16.jpg?q=90",
    "Sneakers.jsx": "https://rukminim1.flixcart.com/fk-p-flap/278/278/image/45e3c153ffcf7f1c.jpg?q=90",
    "Watch.jsx": "https://rukminim1.flixcart.com/fk-p-flap/278/278/image/2b662df94d7b271c.jpg?q=90"
}

for filename in files:
    file = os.path.join(components_dir, filename)
    if not os.path.exists(file): continue

    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if "deal-banner" in content:
        continue # Already has it
        
    # Extract Title
    title_match = re.search(r'<h2>(.*?)</h2>', content)
    if not title_match:
        # Check Woman.jsx format
        title_match = re.search(r'<h2.*?>(.*?)</h2>', content)
        
    title = title_match.group(1) if title_match else "Category"
    
    # Extract Link
    link_match = re.search(r'<Link to=\'([^\']+)\'', content)
    link = link_match.group(1) if link_match else "/"
    
    # Extract proper proSection map block
    # from <div className='proSection'> ... </div>
    # handling nested braces
    pro_start = content.find("proSection")
    if pro_start == -1: continue
    
    # Find the closing brace of the JSX block inside proSection
    start_map = content.find("{", pro_start)
    
    # Simple regex to get the inner map
    # We'll just replace the whole return block and rewrite the deal-container
    
    map_var_match = re.search(r'([a-zA-Z0-9_]+)\.map\(\(item', content)
    map_var = map_var_match.group(1) if map_var_match else "firstFiveImages"
    
    img_url = banner_images.get(filename, "https://rukminim1.flixcart.com/fk-p-flap/278/278/image/75a15c3e19c3f7de.jpg?q=90")
    
    if "Woman.jsx" in filename:
        pro_map = f"""          {{{map_var}.map((item, i) => {{
            return (
              <ProductCard key={{i}} item={{item}} linkPath='{link}' />
            );
          }})}}"""
    else:
        pro_map = f"""          {{
            {map_var}.map((item) => {{
              return (
                <ProductCard key={{item.id || Math.random()}} item={{item}} linkPath='{link}' />
              )
            }})
          }}"""

    new_banner_layout = f"""    <div className="deal-container" style={{{{ display: 'flex', gap: '24px', padding: '16px 60px' }}}}>
      {{/* Left Promotional Banner */}}
      <div className="deal-banner" style={{{{ minWidth: '280px', flexShrink: 0, padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', background: 'url({img_url}) center/cover no-repeat', borderRadius: 'var(--radius-md)' }}}}>
        <h2 style={{{{ fontSize: '32px', marginBottom: '16px', color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.5)', textAlign: 'center' }}}}>{title}</h2>
        <Link to='{link}' style={{{{ padding: '10px 24px', background: 'var(--primary-color)', color: '#fff', borderRadius: 'var(--radius-md)', fontWeight: '600' }}}}>VIEW ALL</Link>
      </div>

      {{/* Right Product Slider */}}
      <div className="deal-slider" style={{{{ flex: 1, backgroundColor: 'var(--card-bg)', borderRadius: 'var(--radius-md)', padding: '24px', overflow: 'hidden' }}}}>
        <div style={{{{ paddingBottom: '16px', borderBottom: '1px solid var(--glass-border)', marginBottom: '16px' }}}}>
          <h2 style={{{{ fontSize: '24px', fontWeight: '600' }}}}>{title}</h2>
        </div>
        <div className='proSection' style={{{{ padding: '0', margin: '0' }}}}>
{pro_map}
        </div>
      </div>
    </div>"""

    if "Woman.jsx" in filename:
        # replace <> ... </>
        new_content = re.sub(r'<>\s*<div className="proTitle".*?</>\s*', new_banner_layout + "\n", content, flags=re.DOTALL)
    else:
        new_content = re.sub(r'<div className="deal-container">\s*<div className="proTitle".*?</div\s*>\s*</div\s*>', new_banner_layout, content, flags=re.DOTALL)
        
    with open(file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Added banner to {filename}")
