import math
from PIL import Image, ImageDraw, ImageFont

def create_favicon(size=512):
    # Create 512x512 image with alpha
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    pad = size * 0.04
    radius = size * 0.26
    
    # Draw rounded background squircle
    draw.rounded_rectangle(
        [pad, pad, size - pad, size - pad],
        radius=radius,
        fill=(13, 12, 24, 255),
        outline=(255, 87, 34, 180),
        width=int(size * 0.035)
    )

    # Subtle inner gradient border
    inner_pad = pad + size * 0.03
    draw.rounded_rectangle(
        [inner_pad, inner_pad, size - inner_pad, size - inner_pad],
        radius=radius * 0.85,
        outline=(255, 110, 64, 70),
        width=int(size * 0.015)
    )

    # Draw stylized "S" monogram using high-res anti-aliased polygon/strokes
    # Center is (size/2, size/2)
    # We can draw smooth interconnected circles or curves for "S"
    scale = size / 512.0
    
    # Points defining modern bold "S" spine
    # Upper arc, diagonal spine, lower arc
    stroke_w = int(58 * scale)
    
    # We can sample points along bezier curve for smooth rendering
    def bezier_point(p0, p1, p2, p3, t):
        x = (1-t)**3 * p0[0] + 3*(1-t)**2*t * p1[0] + 3*(1-t)*t**2 * p2[0] + t**3 * p3[0]
        y = (1-t)**3 * p0[1] + 3*(1-t)**2*t * p1[1] + 3*(1-t)*t**2 * p2[1] + t**3 * p3[1]
        return (x, y)

    # Curve 1: Upper arc (starts top-right, curves over top to mid-left)
    p0 = (330 * scale, 175 * scale)
    p1 = (330 * scale, 125 * scale)
    p2 = (165 * scale, 125 * scale)
    p3 = (165 * scale, 220 * scale)

    # Curve 2: Middle diagonal to lower arc (curves across center to right, then down and back left)
    p4 = (165 * scale, 280 * scale)
    p5 = (345 * scale, 260 * scale)
    p6 = (345 * scale, 340 * scale)

    # Curve 3: Bottom arc (curves under bottom to bottom-left)
    p7 = (345 * scale, 400 * scale)
    p8 = (165 * scale, 405 * scale)
    p9 = (165 * scale, 345 * scale)

    points = []
    # Segment 1
    for i in range(50):
        t = i / 49.0
        points.append(bezier_point(p0, p1, p2, p3, t))
    # Segment 2
    for i in range(50):
        t = i / 49.0
        points.append(bezier_point(p3, (165*scale, 290*scale), (345*scale, 270*scale), p6, t))
    # Segment 3
    for i in range(50):
        t = i / 49.0
        points.append(bezier_point(p6, p7, p8, p9, t))

    # Draw gradient strokes along points with glowing dropshadow
    # Shadow
    for i in range(len(points) - 1):
        pt1 = (points[i][0], points[i][1] + 6 * scale)
        pt2 = (points[i+1][0], points[i+1][1] + 6 * scale)
        draw.line([pt1, pt2], fill=(255, 87, 34, 45), width=stroke_w + int(12 * scale))

    # Gradient line
    for i in range(len(points) - 1):
        ratio = i / float(len(points))
        # Gradient from #FF7A45 to #FF5722 to #FF8C00
        r = int(255)
        g = int(122 - 35 * ratio + 30 * (ratio**2))
        b = int(69 - 35 * ratio)
        draw.line([points[i], points[i+1]], fill=(r, g, b, 255), width=stroke_w)
        # Round caps
        draw.ellipse([points[i][0] - stroke_w//2, points[i][1] - stroke_w//2,
                      points[i][0] + stroke_w//2, points[i][1] + stroke_w//2], fill=(r, g, b, 255))
    
    # End cap
    end_pt = points[-1]
    draw.ellipse([end_pt[0] - stroke_w//2, end_pt[1] - stroke_w//2,
                  end_pt[0] + stroke_w//2, end_pt[1] + stroke_w//2], fill=(255, 120, 10, 255))

    # Signature Orange Dot at top right
    dot_x = 390 * scale
    dot_y = 125 * scale
    dot_r = 34 * scale
    
    # Dot glow
    draw.ellipse([dot_x - dot_r*1.5, dot_y - dot_r*1.5, dot_x + dot_r*1.5, dot_y + dot_r*1.5], fill=(255, 87, 34, 70))
    # Dot body
    draw.ellipse([dot_x - dot_r, dot_y - dot_r, dot_x + dot_r, dot_y + dot_r], fill=(255, 87, 34, 255))
    # Dot inner highlight
    inner_r = dot_r * 0.42
    draw.ellipse([dot_x - inner_r, dot_y - inner_r, dot_x + inner_r, dot_y + inner_r], fill=(255, 230, 180, 255))

    return img

if __name__ == "__main__":
    import os
    base_dir = r"c:\Users\shash\.gemini\antigravity-ide\scratch\portfolio\frontend"
    public_dir = os.path.join(base_dir, "public")
    app_dir = os.path.join(base_dir, "app")
    
    master = create_favicon(512)
    
    # Save high-res PNGs
    master.save(os.path.join(public_dir, "icon-512.png"), "PNG")
    master.resize((192, 192), Image.Resampling.LANCZOS).save(os.path.join(public_dir, "icon-192.png"), "PNG")
    master.resize((180, 180), Image.Resampling.LANCZOS).save(os.path.join(public_dir, "apple-touch-icon.png"), "PNG")
    master.resize((32, 32), Image.Resampling.LANCZOS).save(os.path.join(public_dir, "favicon-32x32.png"), "PNG")
    master.resize((16, 16), Image.Resampling.LANCZOS).save(os.path.join(public_dir, "favicon-16x16.png"), "PNG")

    # Multi-resolution ICO (16, 32, 48, 64)
    icon_sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
    master.save(
        os.path.join(public_dir, "favicon.ico"),
        format="ICO",
        sizes=icon_sizes
    )
    master.save(
        os.path.join(app_dir, "favicon.ico"),
        format="ICO",
        sizes=icon_sizes
    )
    print("Favicons generated successfully!")
