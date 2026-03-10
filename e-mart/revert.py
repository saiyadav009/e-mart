import os
import glob
import re

components_dir = r"c:\Users\saipr_2dydpp0\OneDrive\Desktop\e-mart\e-mart\src\stores\components"

files = glob.glob(os.path.join(components_dir, "*.jsx"))

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Mobiles, Computers, etc structure to revert
    # Wait, the structure added was:
    # <div className="deal-container" style={{ display: 'flex', gap: '24px', padding: '16px 60px' }}>
    #   {/* Left Promotional Banner */}
    #   ...
    #   {/* Right Product Slider */}
    #   ...
    # </div>
    # I can just use regex or fixed strings to restore them.
    
    if "deal-banner" in content:
        # Revert
        # The content originally was:
        # <div className="deal-container">
        #   <div className="proTitle">
        #       <h2>...</h2>
        #       <Link to='...'>View All</Link>
        #   </div>
        #   <div className='proSection'>
        #       ...
        #   </div>
        # </div>
        
        # We can extract the "<h2>...</h2>" from the deal-slider paddingBottom div
        # and the "linkPath" from the map.
        
        # Let's just do a generic regex if possible, or it's safer to just do simple string replacements.
        import re
        
        # Find the h2 title inside deal-slider > div > h2
        title_match = re.search(r'<h2 style={{ fontSize: \'24px\', fontWeight: \'600\' }}>(.*?)</h2>', content)
        title = title_match.group(1) if title_match else "Category"
        
        # Find the link path
        link_match = re.search(r'<Link to=\'([^\']+)\'', content)
        link = link_match.group(1) if link_match else "/"
        
        # Find the map variable name
        map_match = re.search(r'([a-zA-Z0-9_]+)\.map\(\(item', content)
        map_var = map_match.group(1) if map_match else "firstFiveImages"
        
        # Woman.jsx had `item, i` in map.
        if "item, i" in content:
            pro_section = f"""        {{
          {map_var}.map((item, i) => {{
            return (
              <ProductCard key={{i}} item={{item}} linkPath='{link}' />
            );
          }})
        }}"""
        else:
            pro_section = f"""        {{
          {map_var}.map((item) => {{
            return (
              <ProductCard key={{item.id || Math.random()}} item={{item}} linkPath='{link}' />
            )
          }})
        }}"""

        if "Woman.jsx" in file:
            original = f"""    <>
      <div className="proTitle" style={{{{ padding: '20px 30px', borderBottom: '1px solid #eaeaec' }}}}>
        <h2 style={{{{ fontSize: '24px', fontWeight: '700', color: '#282c3f', textTransform: 'uppercase' }}}}>{title}</h2>
        <Link to='{link}' style={{{{ float: 'right', textDecoration: 'none', color: '#ff3f6c', fontWeight: '700', textTransform: 'uppercase', fontSize: '14px' }}}}>View All</Link>
      </div>
      <div className="proSection">
{pro_section}
      </div>
    </>"""
        else:
            original = f"""    <div className="deal-container">
      <div className="proTitle">
        <h2>{title}</h2>
        <Link to='{link}'>View All</Link>
      </div>
      <div className='proSection'>
{pro_section}
      </div>
    </div>"""

        # Replace the whole <div className="deal-container" style=...>... </div> at the end.
        new_content = re.sub(r'<div className="deal-container" style={{ display: \'flex\'.*?</div\s*>\s*</div\s*>\s*</div\s*>', original, content, flags=re.DOTALL)
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Reverted {os.path.basename(file)}")
