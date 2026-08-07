#!/usr/bin/env python3
"""
Aetheria Explorer — Step-by-Step User Guide Generator
Generates a multi-page A4 PDF booklet explaining how to use the app,
written from a user's perspective, module by module, with embedded screen references.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, HRFlowable, Image
)
from reportlab.pdfgen import canvas
import os

# ──────────────────────────────────────────────
# Color Palette
# ──────────────────────────────────────────────
DEEP_NAVY    = HexColor("#0B0F19")
INDIGO       = HexColor("#6366F1")
INDIGO_LIGHT = HexColor("#818CF8")
TEAL         = HexColor("#14B8A6")
TEAL_DARK    = HexColor("#0F766E")
PURPLE       = HexColor("#A855F7")
SLATE_700    = HexColor("#334155")
SLATE_400    = HexColor("#94A3B8")
SLATE_200    = HexColor("#E2E8F0")
WHITE        = HexColor("#FFFFFF")
LIGHT_BG     = HexColor("#F8FAFC")

OUTPUT_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Aetheria_Explorer_User_Guide.pdf")

# ──────────────────────────────────────────────
# Custom Page Background Canvas Callbacks
# ──────────────────────────────────────────────
def draw_page_background(canvas_obj, doc):
    """Draw a subtle, premium header bar and footer on every inner page."""
    w, h = A4
    # Top gradient-like header bar
    canvas_obj.setFillColor(DEEP_NAVY)
    canvas_obj.rect(0, h - 26*mm, w, 26*mm, fill=1, stroke=0)
    # Accent line
    canvas_obj.setFillColor(INDIGO)
    canvas_obj.rect(0, h - 26*mm, w, 1.2*mm, fill=1, stroke=0)
    
    # Header text
    canvas_obj.setFillColor(WHITE)
    canvas_obj.setFont("Helvetica-Bold", 10)
    canvas_obj.drawString(20*mm, h - 16*mm, "AETHERIA EXPLORER   |   USER GUIDE")
    
    canvas_obj.setFont("Helvetica", 7.5)
    canvas_obj.setFillColor(SLATE_400)
    canvas_obj.drawString(20*mm, h - 21*mm, "A Step-by-Step Guide to Synthesizing and Visualizing Travel Adventures")
    
    # Page number in bottom margin
    canvas_obj.setFillColor(INDIGO_LIGHT)
    canvas_obj.setFont("Helvetica-Bold", 8)
    canvas_obj.drawRightString(w - 20*mm, 12*mm, f"Page {doc.page}")
    canvas_obj.drawString(20*mm, 12*mm, "Explorer Navigation & Safety Manual")
    
    # Bottom accent line
    canvas_obj.setFillColor(INDIGO)
    canvas_obj.rect(0, 8*mm, w, 0.5*mm, fill=1, stroke=0)


def draw_cover_page(canvas_obj, doc):
    """Draw the cover page background."""
    w, h = A4
    # Full navy background
    canvas_obj.setFillColor(DEEP_NAVY)
    canvas_obj.rect(0, 0, w, h, fill=1, stroke=0)
    # Cosmic glowing shapes
    canvas_obj.setFillColor(HexColor("#1E152A"))  # deep purple
    canvas_obj.circle(w * 0.8, h * 0.7, 180*mm, fill=1, stroke=0)
    canvas_obj.setFillColor(HexColor("#0D2A3A"))  # deep teal
    canvas_obj.circle(w * 0.15, h * 0.2, 100*mm, fill=1, stroke=0)
    # Accent lines
    canvas_obj.setFillColor(INDIGO)
    canvas_obj.rect(0, h * 0.38, w, 2.5*mm, fill=1, stroke=0)
    canvas_obj.setFillColor(TEAL)
    canvas_obj.rect(0, h * 0.38 - 3.5*mm, w, 1*mm, fill=1, stroke=0)


# ──────────────────────────────────────────────
# Styles
# ──────────────────────────────────────────────
styles = getSampleStyleSheet()

styles["Normal"].fontName = "Helvetica"
styles["Normal"].fontSize = 9.5
styles["Normal"].leading = 14
styles["Normal"].textColor = SLATE_700

style_cover_title = ParagraphStyle(
    "CoverTitle", parent=styles["Title"],
    fontName="Helvetica-Bold", fontSize=35, leading=40,
    textColor=WHITE, alignment=TA_LEFT,
    spaceAfter=4*mm
)
style_cover_subtitle = ParagraphStyle(
    "CoverSubtitle", parent=styles["Normal"],
    fontName="Helvetica", fontSize=13, leading=18,
    textColor=INDIGO_LIGHT, alignment=TA_LEFT,
    spaceAfter=3*mm
)
style_cover_tagline = ParagraphStyle(
    "CoverTagline", parent=styles["Normal"],
    fontName="Helvetica", fontSize=9.5, leading=13.5,
    textColor=SLATE_400, alignment=TA_LEFT
)
style_section_title = ParagraphStyle(
    "SectionTitle", parent=styles["Heading1"],
    fontName="Helvetica-Bold", fontSize=18, leading=22,
    textColor=INDIGO, spaceAfter=3*mm, spaceBefore=6*mm,
    keepWithNext=True
)
style_subsection = ParagraphStyle(
    "Subsection", parent=styles["Heading2"],
    fontName="Helvetica-Bold", fontSize=11.5, leading=15,
    textColor=DEEP_NAVY, spaceAfter=2*mm, spaceBefore=4*mm,
    keepWithNext=True
)
style_body = ParagraphStyle(
    "Body2", parent=styles["Normal"],
    fontName="Helvetica", fontSize=9, leading=13,
    textColor=SLATE_700, alignment=TA_JUSTIFY,
    spaceAfter=2.5*mm
)
style_bullet = ParagraphStyle(
    "Bullet", parent=styles["Normal"],
    fontName="Helvetica", fontSize=8.5, leading=12,
    textColor=SLATE_700, leftIndent=10*mm, bulletIndent=4*mm,
    spaceAfter=1.5*mm
)
style_feature_title = ParagraphStyle(
    "FeatureTitle", parent=styles["Normal"],
    fontName="Helvetica-Bold", fontSize=9.5, leading=13,
    textColor=TEAL_DARK, spaceAfter=1*mm
)
style_table_header = ParagraphStyle(
    "THeader", parent=styles["Normal"],
    fontName="Helvetica-Bold", fontSize=8, leading=10,
    textColor=WHITE, alignment=TA_CENTER
)
style_table_cell = ParagraphStyle(
    "TCell", parent=styles["Normal"],
    fontName="Helvetica", fontSize=7.5, leading=10.5,
    textColor=SLATE_700, alignment=TA_LEFT
)
style_footer_note = ParagraphStyle(
    "FooterNote", parent=styles["Normal"],
    fontName="Helvetica-Oblique", fontSize=8, leading=11,
    textColor=SLATE_400, alignment=TA_CENTER
)
style_highlight_box = ParagraphStyle(
    "HighlightBox", parent=styles["Normal"],
    fontName="Helvetica-Bold", fontSize=10, leading=14,
    textColor=INDIGO, alignment=TA_CENTER,
    spaceAfter=3*mm
)

# Helpers for dividers
def section_divider(color=INDIGO):
    return HRFlowable(width="100%", thickness=1.2, color=color, spaceAfter=3*mm, spaceBefore=1.5*mm)

def thin_divider():
    return HRFlowable(width="100%", thickness=0.4, color=SLATE_200, spaceAfter=2*mm, spaceBefore=1.5*mm)


# ──────────────────────────────────────────────
# Build the User Guide Flowable Story
# ──────────────────────────────────────────────
def build_user_guide():
    doc = SimpleDocTemplate(
        OUTPUT_PATH,
        pagesize=A4,
        topMargin=32*mm,
        bottomMargin=18*mm,
        leftMargin=18*mm,
        rightMargin=18*mm,
        title="Aetheria Explorer — Step-by-Step User Guide",
        author="Aetheria Team",
        subject="Step-by-step guidebook for navigating Aetheria Explorer module by module"
    )

    story = []

    # ═══════════════════════════════════════════
    # PAGE 1: COVER
    # ═══════════════════════════════════════════
    story.append(Spacer(1, 52*mm))
    story.append(Paragraph("Aetheria Explorer", style_cover_title))
    story.append(Paragraph("Step-by-Step User Guide", style_cover_subtitle))
    story.append(Spacer(1, 4*mm))
    story.append(Paragraph(
        "A comprehensive handbook written from the explorer's perspective, "
        "providing clear screen references, navigation instructions, and "
        "operational guides to conquer the digital frontier.",
        style_cover_tagline
    ))
    story.append(Spacer(1, 22*mm))
    story.append(Paragraph(
        "COGNITIVE PLANNING  •  SPATIAL XR  •  WEB3 COMMUNITIES  •  TRAVEL UTILITIES",
        ParagraphStyle("CoverBadge", parent=styles["Normal"],
                       fontName="Helvetica-Bold", fontSize=9, leading=13,
                       textColor=TEAL, alignment=TA_LEFT)
    ))
    story.append(Spacer(1, 6*mm))
    story.append(Paragraph(
        "Version 2.5  |  Aetheria+ Premium Edition  |  Secure B2B Payment Sandbox",
        ParagraphStyle("CoverCompliance", parent=styles["Normal"],
                       fontName="Helvetica", fontSize=8, leading=11,
                       textColor=SLATE_400, alignment=TA_LEFT)
    ))
    story.append(PageBreak())

    # ═══════════════════════════════════════════
    # PAGE 2: TABLE OF CONTENTS
    # ═══════════════════════════════════════════
    story.append(Paragraph("Table of Contents", style_section_title))
    story.append(section_divider())

    toc_items = [
        ("1.", "Setting Up Your Explorer Profile", "3"),
        ("2.", "The Main Dashboard & 9 Travel Hubs", "4"),
        ("3.", "How to Synthesize Your AI Itinerary", "5"),
        ("4.", "Navigating with AR Wayfinding & AR Time-Lapse", "6"),
        ("5.", "Browsing the Vibe Market & Customizing Itineraries", "7"),
        ("6.", "Using the Vision AI Hub & Landmark Lens", "8"),
        ("7.", "Managing Subscriptions, Aetheria+ & Travel Insurance", "9"),
        ("8.", "Participating in Traveler's Guilds & The Bounty Board", "10"),
    ]

    toc_data = []
    for num, title, page in toc_items:
        toc_data.append([
            Paragraph(f"<b>{num}</b>", style_table_cell),
            Paragraph(title, style_table_cell),
            Paragraph(page, ParagraphStyle("R", parent=style_table_cell, alignment=TA_CENTER)),
        ])

    toc_table = Table(toc_data, colWidths=[12*mm, 120*mm, 20*mm])
    toc_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('LINEBELOW', (0, 0), (-1, -1), 0.3, SLATE_200),
    ]))
    story.append(toc_table)
    story.append(PageBreak())

    # ═══════════════════════════════════════════
    # PAGE 3: SETTING UP YOUR PROFILE
    # ═══════════════════════════════════════════
    story.append(Paragraph("1. Setting Up Your Explorer Profile", style_section_title))
    story.append(section_divider())
    story.append(Paragraph(
        "Every adventure begins with identity. Setting up your profile properly configures Aetheria's "
        "AI engine to format resources according to your account credentials and role levels.",
        style_body
    ))

    setup_steps = [
        ("Account Registration & Sign-In", "Click the Auth Modal at the top right of the landing page. Sign in securely via Firebase credentials. This binds your generated itineraries to your personal account."),
        ("Selecting Your User Role", "Aetheria supports three user levels: Explorer (default traveller view), Partner (vetted local merchants, hotels, and airlines), and Admin (system dashboard view). Ensure your role is set correctly to customize dashboard access."),
        ("Managing Travel Preferences", "Visit the Profile Page. Here you can configure language properties (i18n locales), default currency representations (crypto or fiat), and links to external smartwatch sensors for biometric fatigue monitoring."),
    ]

    for title, desc in setup_steps:
        story.append(Paragraph(f"▸ <b>{title}</b>", style_feature_title))
        story.append(Paragraph(desc, style_body))
        story.append(Spacer(1, 1.5*mm))

    story.append(PageBreak())

    # ═══════════════════════════════════════════
    # PAGE 4: MAIN DASHBOARD & 9 TRAVEL HUBS
    # ═══════════════════════════════════════════
    story.append(Paragraph("2. The Main Dashboard & 9 Travel Hubs", style_section_title))
    story.append(section_divider())
    story.append(Paragraph(
        "Aetheria Explorer collapses over 300 features into 9 main navigation hubs on the sidebar menu "
        "to reduce visual noise:",
        style_body
    ))

    hubs = [
        ("Core Hub", "Planner, Itinerary lists, and Aetheria+ active statuses."),
        ("AR & Immersive", "AR Wayfinding, historical lenses, and Art Galleries."),
        ("Gastronomy", "Allergen scanning, 3D menu previews, and local restaurant finder."),
        ("Transit & Finance", "E-Sim activation, global wallet, and insurance selection."),
    ]
    for h_title, h_desc in hubs:
        story.append(Paragraph(f"• <b>{h_title}:</b> {h_desc}", style_bullet))

    story.append(Spacer(1, 2*mm))
    story.append(Paragraph("<b>Interface Preview:</b> AI Itinerary Synthesizer Panel", style_feature_title))

    # Embed dashboard mockup image
    img_path_dash = os.path.join(os.path.dirname(os.path.abspath(__file__)), "itinerary_dashboard_mockup.png")
    if os.path.exists(img_path_dash):
        img_dash = Image(img_path_dash, width=95*mm, height=95*mm)
        story.append(img_dash)
    else:
        story.append(Paragraph("[Dashboard Mockup Image Missing]", style_body))

    story.append(PageBreak())

    # ═══════════════════════════════════════════
    # PAGE 5: SYNTHESIZING YOUR ITINERARY
    # ═══════════════════════════════════════════
    story.append(Paragraph("3. How to Synthesize Your AI Itinerary", style_section_title))
    story.append(section_divider())
    story.append(Paragraph(
        "Follow these steps to generate a multi-day itinerary that adapts dynamically to your "
        "cognitive fatigue thresholds and vibe preference:",
        style_body
    ))

    itinerary_steps = [
        ("Step 1: Define Destination & Duration", "Input your target city (e.g. 'Tokyo') and pick travel dates. The scheduler automatically balances activity densities across these days."),
        ("Step 2: Calibrate Travel Vibe Sliders", "Adjust the 'Travel Mood' slider. Options range from Adventurous and Relaxing to 'Mystical' and 'Modern'. A Mystical mood instructs the AI to select temple tours, tea ceremonies, and ancient ruins over standard sightseeing."),
        ("Step 3: Generate and Tweak Activities", "Click 'Generate Itinerary'. Tweak individual daily cards to swap activities, adjust timeline times, or lock in specific restaurant recommendations."),
        ("Step 4: Execute Interactive Checklists", "Your generated timeline is converted into a physical checklist. Tick off activities as you complete them to gain exploration XP points."),
    ]

    for title, desc in itinerary_steps:
        story.append(Paragraph(f"▸ <b>{title}</b>", style_feature_title))
        story.append(Paragraph(desc, style_body))
        story.append(Spacer(1, 1.5*mm))

    story.append(PageBreak())

    # ═══════════════════════════════════════════
    # PAGE 6: AR WAYFINDING & TIME-LAPSE
    # ═══════════════════════════════════════════
    story.append(Paragraph("4. Navigating with AR Wayfinding & Time-Lapse", style_section_title))
    story.append(section_divider())
    story.append(Paragraph(
        "Augmented Reality overlays safe routes and historical eras directly onto physical streets:",
        style_body
    ))

    ar_instructions = [
        ("AR Wayfinding", "Open the AR Hub on your mobile web app and grant camera permission. Neon-teal direction arrows will project on the street surface guiding you toward your destination."),
        ("AR Time-Lapse Mode", "Aim the lens at designated historic landmarks. Translucent, glowing purple holograms project the landmark as it appeared in historical eras (e.g. Edo Period)."),
    ]
    for title, desc in ar_instructions:
        story.append(Paragraph(f"• <b>{title}:</b> {desc}", style_bullet))

    story.append(Spacer(1, 2*mm))
    story.append(Paragraph("<b>Interface Preview:</b> Live AR Wayfinding & Time-Lapse HUD", style_feature_title))

    # Embed AR mockup image
    img_path_ar = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ar_wayfinding_mockup.png")
    if os.path.exists(img_path_ar):
        img_ar = Image(img_path_ar, width=95*mm, height=95*mm)
        story.append(img_ar)
    else:
        story.append(Paragraph("[AR Wayfinding Mockup Image Missing]", style_body))

    story.append(PageBreak())

    # ═══════════════════════════════════════════
    # PAGE 7: VIBE MARKET & CUSTOMIZATION
    # ═══════════════════════════════════════════
    story.append(Paragraph("5. Vibe Market & Customizing Itineraries", style_section_title))
    story.append(section_divider())
    story.append(Paragraph(
        "The Vibe Market is Aetheria's decentralized aesthetic modifications store, allowing travellers "
        "to restyle travel logs and plans using Web3 transactions:",
        style_body
    ))

    vibe_steps = [
        ("1. Filter by Location", "Search for vibes in specific cities. Tokyo features 'Cyberpunk Glow' and 'Neo-Shinjuku Nights' while Paris offers 'Bohemian Alleyways' and 'Gothic Echoes'."),
        ("2. Evaluate Vibe Modifiers", "Each vibe card details structural modifications: it lists 3-4 specific custom experiences, the mood parameters, and the price in ETH or local AETH tokens."),
        ("3. Checkout & Apply Vibe Modifiers", "Verify your wallet balance page and unlock the vibe. Once purchased, the vibe automatically acts as a template layer in your AI Itinerary Synthesizer, replacing standard activities with vibe-specialized options."),
    ]

    for title, desc in vibe_steps:
        story.append(Paragraph(f"▸ <b>{title}</b>", style_feature_title))
        story.append(Paragraph(desc, style_body))
        story.append(Spacer(1, 2*mm))

    story.append(PageBreak())

    # ═══════════════════════════════════════════
    # PAGE 8: VISION AI HUB & QUANTUM SOUVENIR
    # ═══════════════════════════════════════════
    story.append(Paragraph("6. Using the Vision AI Hub & Quantum Souvenir", style_section_title))
    story.append(section_divider())
    
    story.append(Paragraph("Vision AI Hub Scanner", style_subsection))
    story.append(Paragraph(
        "Launch the camera from the Gastronomy or Local Culture hubs to scan physical objects in real-time:",
        style_body
    ))
    vision_steps = [
        ("Landmark Lens", "Aim at a historic site to fetch building year, original architect, and architectural notes."),
        ("Menu Explorer", "Aim at physical restaurant menus in foreign languages. Translates items, parses lists of ingredients, and checks allergens."),
        ("Street Art Decoder", "Identifies mural details, returning descriptions and artist biographies."),
    ]
    for title, desc in vision_steps:
        story.append(Paragraph(f"• <b>{title}:</b> {desc}", style_bullet))

    story.append(Spacer(1, 3*mm))
    story.append(Paragraph("Managing Quantum Souvenirs", style_subsection))
    story.append(Paragraph(
        "Quantum Souvenirs are digital tokens linked dynamically to physical travel locations. "
        "Unlike static tokens, they stay physically entangled with the site's environmental weather metrics. "
        "Open your digital souvenir box to inspect their states: as live rain or snow occurs in the original "
        "city, your souvenir card transforms its visual theme to match the current climate.",
        style_body
    ))

    story.append(PageBreak())

    # ═══════════════════════════════════════════
    # PAGE 9: SUBSCRIPTIONS, AETHERIA+ & INSURANCE
    # ═══════════════════════════════════════════
    story.append(Paragraph("7. Managing Subscriptions & Travel Insurance", style_section_title))
    story.append(section_divider())

    story.append(Paragraph("Unlocking Aetheria+ and Premium Passes", style_subsection))
    story.append(Paragraph(
        "Advanced features (AR lenses, AI planners, and Landmark Lens translation databases) require "
        "premium access credentials. Aetheria features a hybrid authorization scheme:",
        style_body
    ))
    sub_models = [
        ("Global Subscription", "Unlock all hubs globally via a recurring monthly plan managed on the Wallet Page."),
        ("Booking-linked Pass", "Purchase a temporary pass tied to a single itinerary booking. This pass grants premium access exclusively for the duration and path of that trip."),
    ]
    for title, desc in sub_models:
        story.append(Paragraph(f"• <b>{title}:</b> {desc}", style_bullet))

    story.append(Spacer(1, 3*mm))
    story.append(Paragraph("Synthesizing Integrated Travel Insurance", style_subsection))
    story.append(Paragraph(
        "Navigate to the Transit & Finance hub, enter your booking numbers, and click 'Synthesize Policy'. "
        "Select your risk coverage (Basic, Premium, or Extreme Adventure) and checkout using the sandbox payment form. "
        "Verify your payment completes successfully to lock in your coverage confirmation code.",
        style_body
    ))

    story.append(PageBreak())

    # ═══════════════════════════════════════════
    # PAGE 10: COMMUNITIES & BOUNTY BOARDS
    # ═══════════════════════════════════════════
    story.append(Paragraph("8. Joining Traveler's Guilds & The Bounty Board", style_section_title))
    story.append(section_divider())

    story.append(Paragraph("Traveler's Guilds", style_subsection))
    story.append(Paragraph(
        "Join group chat threads and share group itineraries based on special interests: "
        "Foodie Guilds, Art Explorer Guilds, or Extreme Adventure Guilds. Connect async "
        "and schedule joint group activities straight into your planner timeline.",
        style_body
    ))

    story.append(Spacer(1, 3*mm))
    story.append(Paragraph("The Bounty Board Challenges", style_subsection))
    story.append(Paragraph(
        "Participate in physical scavenger hunts and challenges at your destination. "
        "Examples include visiting historic shrines or uploading snapshots of regional street food. "
        "Complete challenges to claim travel points and level up your traveler rank.",
        style_body
    ))

    story.append(Spacer(1, 6*mm))
    story.append(thin_divider())
    story.append(Paragraph(
        "Aetheria Explorer — Redefining travel discovery step by step.",
        style_highlight_box
    ))
    story.append(Spacer(1, 3*mm))
    story.append(Paragraph(
        "© 2026 Aetheria Explorer. All rights reserved. User guide documentation.",
        style_footer_note
    ))

    # ═══════════════════════════════════════════
    # BUILD DOCUMENT
    # ═══════════════════════════════════════════
    def first_page(canvas_obj, doc):
        draw_cover_page(canvas_obj, doc)

    def later_pages(canvas_obj, doc):
        draw_page_background(canvas_obj, doc)

    doc.build(story, onFirstPage=first_page, onLaterPages=later_pages)
    print(f"✅ Aetheria User Guide generated successfully: {OUTPUT_PATH}")


if __name__ == "__main__":
    build_user_guide()
