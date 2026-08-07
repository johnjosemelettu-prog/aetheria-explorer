#!/usr/bin/env python3
"""
Aetheria Explorer — Professional Booklet Brochure Generator
Generates a multi-page PDF brochure for stakeholders.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, HRFlowable
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
ROSE         = HexColor("#F43F5E")
WHITE        = HexColor("#FFFFFF")
LIGHT_BG     = HexColor("#F8FAFC")

OUTPUT_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Aetheria_Explorer_Brochure.pdf")

# ──────────────────────────────────────────────
# Custom Page Background
# ──────────────────────────────────────────────
def draw_page_background(canvas_obj, doc):
    """Draw a subtle gradient header bar on every page."""
    w, h = A4
    # Top gradient bar
    canvas_obj.setFillColor(DEEP_NAVY)
    canvas_obj.rect(0, h - 28*mm, w, 28*mm, fill=1, stroke=0)
    # Accent line
    canvas_obj.setFillColor(INDIGO)
    canvas_obj.rect(0, h - 28*mm, w, 1.2*mm, fill=1, stroke=0)
    # Header text
    canvas_obj.setFillColor(WHITE)
    canvas_obj.setFont("Helvetica-Bold", 9)
    canvas_obj.drawString(20*mm, h - 18*mm, "Aetheria Explorer")
    canvas_obj.setFont("Helvetica", 7)
    canvas_obj.setFillColor(SLATE_400)
    canvas_obj.drawString(20*mm, h - 23*mm, "Next-Generation AI Travel Synthesis Platform")
    # Page number
    canvas_obj.setFillColor(INDIGO_LIGHT)
    canvas_obj.setFont("Helvetica", 7)
    canvas_obj.drawRightString(w - 20*mm, 12*mm, f"Page {doc.page}")
    # Bottom line
    canvas_obj.setFillColor(INDIGO)
    canvas_obj.rect(0, 8*mm, w, 0.5*mm, fill=1, stroke=0)


def draw_cover_page(canvas_obj, doc):
    """Draw the cover page background."""
    w, h = A4
    # Full navy background
    canvas_obj.setFillColor(DEEP_NAVY)
    canvas_obj.rect(0, 0, w, h, fill=1, stroke=0)
    # Large accent circles
    canvas_obj.setFillColor(HexColor("#1E152A"))  # deep purple
    canvas_obj.circle(w * 0.8, h * 0.7, 160*mm, fill=1, stroke=0)
    canvas_obj.setFillColor(HexColor("#0D2A3A"))  # deep teal
    canvas_obj.circle(w * 0.15, h * 0.25, 120*mm, fill=1, stroke=0)
    # Accent lines
    canvas_obj.setFillColor(INDIGO)
    canvas_obj.rect(0, h * 0.44, w, 2.5*mm, fill=1, stroke=0)
    canvas_obj.setFillColor(TEAL)
    canvas_obj.rect(0, h * 0.44 - 3*mm, w, 1*mm, fill=1, stroke=0)


# ──────────────────────────────────────────────
# Styles
# ──────────────────────────────────────────────
styles = getSampleStyleSheet()

style_cover_title = ParagraphStyle(
    "CoverTitle", parent=styles["Title"],
    fontName="Helvetica-Bold", fontSize=36, leading=42,
    textColor=WHITE, alignment=TA_LEFT,
    spaceAfter=6*mm
)
style_cover_subtitle = ParagraphStyle(
    "CoverSubtitle", parent=styles["Normal"],
    fontName="Helvetica", fontSize=13, leading=18,
    textColor=INDIGO_LIGHT, alignment=TA_LEFT,
    spaceAfter=4*mm
)
style_cover_tagline = ParagraphStyle(
    "CoverTagline", parent=styles["Normal"],
    fontName="Helvetica", fontSize=9.5, leading=14,
    textColor=SLATE_400, alignment=TA_LEFT
)
style_section_title = ParagraphStyle(
    "SectionTitle", parent=styles["Heading1"],
    fontName="Helvetica-Bold", fontSize=18, leading=24,
    textColor=INDIGO, spaceAfter=4*mm, spaceBefore=8*mm
)
style_subsection = ParagraphStyle(
    "Subsection", parent=styles["Heading2"],
    fontName="Helvetica-Bold", fontSize=12, leading=16,
    textColor=DEEP_NAVY, spaceAfter=2*mm, spaceBefore=4*mm
)
style_body = ParagraphStyle(
    "BodyText2", parent=styles["Normal"],
    fontName="Helvetica", fontSize=9.5, leading=14,
    textColor=SLATE_700, alignment=TA_JUSTIFY,
    spaceAfter=2*mm
)
style_bullet = ParagraphStyle(
    "BulletItem", parent=styles["Normal"],
    fontName="Helvetica", fontSize=9, leading=13,
    textColor=SLATE_700, leftIndent=12*mm, bulletIndent=5*mm,
    spaceAfter=1.5*mm
)
style_feature_title = ParagraphStyle(
    "FeatureTitle", parent=styles["Normal"],
    fontName="Helvetica-Bold", fontSize=10, leading=14,
    textColor=TEAL_DARK, spaceAfter=1*mm
)
style_table_header = ParagraphStyle(
    "TableHeader", parent=styles["Normal"],
    fontName="Helvetica-Bold", fontSize=8.5, leading=11,
    textColor=WHITE, alignment=TA_CENTER
)
style_table_cell = ParagraphStyle(
    "TableCell", parent=styles["Normal"],
    fontName="Helvetica", fontSize=8, leading=11,
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
    spaceAfter=2*mm
)


# ──────────────────────────────────────────────
# Helper: colored divider
# ──────────────────────────────────────────────
def section_divider(color=INDIGO):
    return HRFlowable(width="100%", thickness=1.5, color=color, spaceAfter=4*mm, spaceBefore=2*mm)

def thin_divider():
    return HRFlowable(width="100%", thickness=0.5, color=SLATE_200, spaceAfter=3*mm, spaceBefore=2*mm)


# ──────────────────────────────────────────────
# Build Document
# ──────────────────────────────────────────────
def build_brochure():
    doc = SimpleDocTemplate(
        OUTPUT_PATH,
        pagesize=A4,
        topMargin=34*mm,
        bottomMargin=20*mm,
        leftMargin=20*mm,
        rightMargin=20*mm,
        title="Aetheria Explorer — Product Brochure",
        author="Aetheria Team",
        subject="AI-Powered Travel Synthesis & Discovery Platform"
    )

    story = []

    # ═══════════════════════════════════════════
    # COVER PAGE
    # ═══════════════════════════════════════════
    story.append(Spacer(1, 55*mm))
    story.append(Paragraph("Aetheria Explorer", style_cover_title))
    story.append(Paragraph(
        "Next-Generation AI-Driven Travel Synthesis<br/>& Immersion Platform",
        style_cover_subtitle
    ))
    story.append(Spacer(1, 6*mm))
    story.append(Paragraph(
        "Empowering modern travelers with dynamic itinerary planning, interactive AR/VR previews,<br/>"
        "curated travel vibe markets, real-time location-entangled souvenirs, and smart B2B<br/>"
        "assurance and compliance engines.",
        style_cover_tagline
    ))
    story.append(Spacer(1, 20*mm))
    story.append(Paragraph(
        "B2C Travel  •  VR/AR Spatial Tech  •  Web3 Communities  •  Enterprise Insurance",
        ParagraphStyle("CoverBadge", parent=styles["Normal"],
                       fontName="Helvetica-Bold", fontSize=10, leading=14,
                       textColor=TEAL, alignment=TA_LEFT)
    ))
    story.append(Spacer(1, 8*mm))
    story.append(Paragraph(
        "Aetheria+ Premium  |  Vibe Web3 Marketplace  |  Linguistic Synthesis  |  Integrated Travel Insurance",
        ParagraphStyle("CoverCompliance", parent=styles["Normal"],
                       fontName="Helvetica", fontSize=8, leading=12,
                       textColor=SLATE_400, alignment=TA_LEFT)
    ))
    story.append(PageBreak())

    # ═══════════════════════════════════════════
    # TABLE OF CONTENTS
    # ═══════════════════════════════════════════
    story.append(Paragraph("Table of Contents", style_section_title))
    story.append(section_divider())

    toc_items = [
        ("1.", "Executive Summary & Vision", "3"),
        ("2.", "Core Feature: AI Itinerary Synthesizer", "4"),
        ("3.", "Modular AI Toolkit - AR & VR Modules", "5"),
        ("4.", "Modular AI Toolkit - Community, Safety & Conceptual", "6"),
        ("5.", "Vibe Market & Linguistic Synthesis", "7"),
        ("6.", "Vision AI Hub & Quantum Souvenir", "8"),
        ("7.", "Subscription, Aetheria+ & Assurance Engine", "9"),
        ("8.", "Technical Stack & Stakeholder Value Propositions", "10"),
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
    # 1. EXECUTIVE SUMMARY & VISION
    # ═══════════════════════════════════════════
    story.append(Paragraph("1. Executive Summary & Vision", style_section_title))
    story.append(section_divider())
    story.append(Paragraph(
        "Aetheria Explorer is an advanced, conceptual travel planning and immersion platform designed "
        "to redefine how modern travelers discover, customize, and secure their journeys. "
        "By merging AI-driven travel itinerary generation with spatial AR/VR visualizations, "
        "Web3 community networks, and smart B2B travel insurance, the platform elevates standard "
        "trips into immersive, tailored, and worry-free explorations.",
        style_body
    ))
    story.append(Spacer(1, 3*mm))

    # Key stats box
    stats_data = [
        [Paragraph("<b>Target Markets</b>", style_table_header),
         Paragraph("<b>Tech Capabilities</b>", style_table_header),
         Paragraph("<b>Security & Assets</b>", style_table_header),
         Paragraph("<b>Ecosystem</b>", style_table_header)],
        [Paragraph("B2C Premium Travelers, B2B Travel Insurers, Local Experience Guides", style_table_cell),
         Paragraph("Generative AI, WebXR/VR simulations, AR mobile visualizations", style_table_cell),
         Paragraph("Linguistic translators, Crypto-priced Vibes, Smart Insurance gateways", style_table_cell),
         Paragraph("Desktop, Web PWA, Hybrid Mobile Apps", style_table_cell)],
    ]
    stats_table = Table(stats_data, colWidths=[40*mm, 40*mm, 42*mm, 35*mm])
    stats_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), INDIGO),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('BACKGROUND', (0, 1), (-1, -1), LIGHT_BG),
        ('GRID', (0, 0), (-1, -1), 0.5, SLATE_200),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
        ('ROUNDEDCORNERS', [3, 3, 3, 3]),
    ]))
    story.append(stats_table)
    story.append(Spacer(1, 5*mm))
    story.append(Paragraph(
        "Aetheria Explorer addresses travel fatigue and decision-paralysis by providing curated "
        "travel vibes, step-by-step itinerary execution checklists, and pre-travel VR/AR scouts. "
        "It acts as a complete travel command center, integrating real-time weather-entangled digital "
        "souvenirs with a robust premium membership tier and transactional protection.",
        style_body
    ))
    story.append(PageBreak())

    # ═══════════════════════════════════════════
    # 2. CORE FEATURE: ITINERARY SYNTHESIZER
    # ═══════════════════════════════════════════
    story.append(Paragraph("2. Core Feature: AI Itinerary Synthesizer", style_section_title))
    story.append(section_divider())
    story.append(Paragraph(
        "The AI Itinerary Synthesizer acts as the central hub of Aetheria Explorer. It enables "
        "users to dynamically structure multi-day plans based on their unique travel and mood preferences:",
        style_body
    ))

    features = [
        ("Destination & Duration Inputs", "Allows travelers to specify target locations and trip lengths, adapting density and timing variables to prevent overload or travel burn-out."),
        ("Cognitive & Mood Adaptation", "Rather than selecting simple interest categories, users define a specific travel vibe or mood (e.g., 'Mystical,' 'Adventurous,' 'Relaxed') which direct the thematic synthesis of daily activities."),
        ("Thematic Daily Breakdown", "Generates daily itineraries with structured themes, visual time blocks, estimated costings, and categories (sightseeing, dining, rest) to maintain clean pacing."),
        ("Actionable Activity Checklists", "Turns complex itineraries into clear, step-by-step interactive lists with transit instructions and physical navigation markers."),
    ]

    for title, desc in features:
        story.append(Paragraph(f"▸ {title}", style_feature_title))
        story.append(Paragraph(desc, style_body))

    story.append(PageBreak())

    # ═══════════════════════════════════════════
    # 3. MODULAR AI TOOLKIT - AR & VR MODULES
    # ═══════════════════════════════════════════
    story.append(Paragraph("3. Modular AI Toolkit - AR & VR Modules", style_section_title))
    story.append(section_divider())

    story.append(Paragraph("VR (Virtual Reality) Previews", style_subsection))
    vr_features = [
        "Pre-Travel Scout — Virtual walkthrough previews of travel environments to reduce anxiety and plan orientation",
        "Virtual Hotel Tour — High-fidelity WebXR tour of rooms, layouts, and sensory profiles prior to booking",
        "Adventure Simulation — Immersive pre-checks for high-thrill excursions (bungee jumping, zip lines) in virtual space",
        "Etiquette Training — Interactive cultural posture and custom training simulations for international locations",
        "Historical Reenactment & Time Machine — VR reconstructions of locations across multiple historical eras",
    ]
    for f in vr_features:
        story.append(Paragraph(f"• {f}", style_bullet))

    story.append(Spacer(1, 3*mm))
    story.append(Paragraph("AR (Augmented Reality) Overlays", style_subsection))
    ar_features = [
        "AR Time-Lapse — Camera-based visual time overlays displaying historical layers of landmarks on real-world structures",
        "AR Menu Visualizer — Translates and projects dishes in 3D AR right above physical menus to clarify portion sizes and ingredients",
        "AR Art Gallery — Discovers and guides users to digital, geofenced art installations hidden in physical cities",
        "Architecture Deconstruction — Live camera parser overlaying structure mechanics and architectural notes over historic buildings",
    ]
    for f in ar_features:
        story.append(Paragraph(f"• {f}", style_bullet))

    story.append(PageBreak())

    # ═══════════════════════════════════════════
    # 4. MODULAR AI TOOLKIT - COMMUNITY, SAFETY & CONCEPTUAL
    # ═══════════════════════════════════════════
    story.append(Paragraph("4. Modular AI Toolkit - Other Modules", style_section_title))
    story.append(section_divider())

    story.append(Paragraph("Community & Decentralization", style_subsection))
    comm_features = [
        "Local Heroes Directory — Integrates vetted local guides for off-the-beaten-path experiences",
        "Traveler's Guilds — Dynamic group chats and itineraries categorized by interest (e.g. 'Foodie Guild', 'Urban Hiker Guild')",
        "Aetheria DAO Governance — Web3 decentralized voting on local preservation and ecosystem community bounties",
        "Bounty Board — Interactive location challenges that award points and travel tokens upon completion",
    ]
    for f in comm_features:
        story.append(Paragraph(f"• {f}", style_bullet))

    story.append(Spacer(1, 3*mm))
    story.append(Paragraph("Safety & Navigation", style_subsection))
    safe_features = [
        "Scam Alerts Radar — Direct location notifications flag active, crowd-reported scams or high-friction tourist traps",
        "Safety Corridors Map — Renders well-lit, highly populated walking paths avoiding secluded routes",
        "Get Me Home SOS — Single-tap navigation immediately maps the safest, lowest-friction route back to lodging",
    ]
    for f in safe_features:
        story.append(Paragraph(f"• {f}", style_bullet))

    story.append(Spacer(1, 3*mm))
    story.append(Paragraph("Conceptual Explorations", style_subsection))
    concept_features = [
        "Ancestry Trail — Synthesizes heritage tours based on DNA data parameters",
        "Memory Palace & Media Log — Visual repository compiling photos, notes, and ambient soundscapes into location-mapped coordinates",
        "AI Haiku & Comic Generators — Instantly transforms camera snapshots into poetry or daily comic strips representing travel logs",
    ]
    for f in concept_features:
        story.append(Paragraph(f"• {f}", style_bullet))

    story.append(PageBreak())

    # ═══════════════════════════════════════════
    # 5. VIBE MARKET & LINGUISTIC SYNTHESIS
    # ═══════════════════════════════════════════
    story.append(Paragraph("5. Vibe Market & Linguistic Synthesis", style_section_title))
    story.append(section_divider())

    story.append(Paragraph("Vibe Market", style_subsection))
    story.append(Paragraph(
        "A decentralized marketplace where users browse, unlock, and exchange premium 'vibes'—highly curated "
        "itinerary modifiers styled around specific travel subcultures:",
        style_body
    ))
    vibe_features = [
        "Location Filters — Select target cities to dynamically query matching vibes (e.g. 'Cyberpunk Glow' for Tokyo, 'Bohemian Alleyways' for Paris)",
        "Rich Experience Cards — Cards detail sample activities, pricing in crypto (ETH/AETH tokens), and mood indicators",
        "Dynamic Loading & Sync — Syncs chosen vibes straight into the AI itinerary synthesizer to layer specialized activities over the main itinerary",
    ]
    for f in vibe_features:
        story.append(Paragraph(f"• {f}", style_bullet))

    story.append(Spacer(1, 3*mm))
    story.append(Paragraph("Linguistic Synthesis Translator", style_subsection))
    story.append(Paragraph(
        "A high-speed, localized text and audio translator resolving language gaps:",
        style_body
    ))
    lang_features = [
        "Multi-Language Target Panel — Supports instant conversion to Japanese, German, Spanish, French, Korean, and Arabic",
        "Real-Time Transcription — Live transcription visualizer for two-way audio bridging conversations with merchants or transportation guides",
    ]
    for f in lang_features:
        story.append(Paragraph(f"• {f}", style_bullet))

    story.append(PageBreak())

    # ═══════════════════════════════════════════
    # 6. VISION AI HUB & QUANTUM SOUVENIR
    # ═══════════════════════════════════════════
    story.append(Paragraph("6. Vision AI Hub & Quantum Souvenir", style_section_title))
    story.append(section_divider())

    story.append(Paragraph("Vision AI Hub", style_subsection))
    vision_features = [
        "Landmark Lens — Scans structures, instantly returning building history, architect metadata, and architectural styles",
        "Menu Explorer & Ingredient Parser — Scans foreign menus, translates items, and highlights allergens and dietary profiles",
        "Street Art Decoder — Detects local murals, introducing the artist biography, artwork story, and municipal context",
        "Souvenir Story Scanner — Analyzes local handicrafts, documenting artisan history and structural authenticity guidelines",
    ]
    for f in vision_features:
        story.append(Paragraph(f"• {f}", style_bullet))

    story.append(Spacer(1, 3*mm))
    story.append(Paragraph("Quantum Souvenir (Weather-Entangled Assets)", style_subsection))
    story.append(Paragraph(
        "Digital souvenirs that remain 'entangled' with physical travel sites:",
        style_body
    ))
    souvenir_features = [
        "Dynamic Weather Synthesis — Periodically fetches real-time meteorological data for the souvenir's original location",
        "Visual Weather Overlays — Souvenir card appearance transforms dynamically (e.g. blue rain overlays, storm particles, warm golden glows) reflecting live local weather",
        "Location Context Panel — Displays local time, weather metrics, and the date the traveler originally acquired the memento",
    ]
    for f in souvenir_features:
        story.append(Paragraph(f"• {f}", style_bullet))

    story.append(PageBreak())

    # ═══════════════════════════════════════════
    # 7. SUBSCRIPTION, AETHERIA+ & ASSURANCE
    # ═══════════════════════════════════════════
    story.append(Paragraph("7. Subscription, Aetheria+ & Assurance Engine", style_section_title))
    story.append(section_divider())

    story.append(Paragraph("Aetheria+ Premium & Hybrid Accessibility", style_subsection))
    sub_features = [
        "usePremiumStatus State Engine — Custom React hook checks global premium user state or temporary booking passes to lock/unlock capabilities",
        "PremiumGate Shielding Wrapper — Smoothly renders upgrade prompts or hides advanced features depending on premium credential status",
        "Booking-linked Passes — Grants temporary full-premium access tied to specific travel, hotel, or flight purchases",
        "Intelligent Navigational Sidebar — Restructures complex layouts automatically, hiding inactive gates to reduce visual noise",
    ]
    for f in sub_features:
        story.append(Paragraph(f"• {f}", style_bullet))

    story.append(Spacer(1, 3*mm))
    story.append(Paragraph("Integrated Travel Assurance Engine", style_subsection))
    story.append(Paragraph(
        "A smart verification engine for flight and travel protection:",
        style_body
    ))
    assurance_features = [
        "Dynamic Insurance Selection — Queries risk quotients based on location parameters (weather forecasts, flight delay history)",
        "High-Fidelity Sandbox Gateway — Interactive payment processing Sandbox simulating coverage validation and confirmation numbers",
    ]
    for f in assurance_features:
        story.append(Paragraph(f"• {f}", style_bullet))

    story.append(PageBreak())

    # ═══════════════════════════════════════════
    # 8. TECH STACK & STAKEHOLDERS
    # ═══════════════════════════════════════════
    story.append(Paragraph("8. Technical Stack & Stakeholder Value", style_section_title))
    story.append(section_divider())

    # Tech stack table
    tech_data = [
        [Paragraph("<b>Layer</b>", style_table_header),
         Paragraph("<b>Technology</b>", style_table_header),
         Paragraph("<b>Purpose</b>", style_table_header)],
        [Paragraph("Frontend", style_table_cell),
         Paragraph("React 19, TypeScript, Vite", style_table_cell),
         Paragraph("Ultra-responsive, type-safe interface component architecture", style_table_cell)],
        [Paragraph("Animation", style_table_cell),
         Paragraph("Framer Motion", style_table_cell),
         Paragraph("Dynamic page shifts, interactive transitions, and card flips", style_table_cell)],
        [Paragraph("Security", style_table_cell),
         Paragraph("SSL, OAuth 2.0, Sandbox Gateways", style_table_cell),
         Paragraph("Securing payment simulations, user auth state, and premium statuses", style_table_cell)],
        [Paragraph("APIs", style_table_cell),
         Paragraph("Weather API, Custom Translation REST", style_table_cell),
         Paragraph("Real-time weather retrieval and language parsing", style_table_cell)],
        [Paragraph("Packaging", style_table_cell),
         Paragraph("Capacitor Wrapper", style_table_cell),
         Paragraph("Cross-platform native compilation (iOS & Android)", style_table_cell)],
    ]
    tech_table = Table(tech_data, colWidths=[25*mm, 42*mm, 90*mm])
    tech_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), DEEP_NAVY),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('BACKGROUND', (0, 1), (-1, -1), LIGHT_BG),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [LIGHT_BG, WHITE]),
        ('GRID', (0, 0), (-1, -1), 0.5, SLATE_200),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(tech_table)

    story.append(Spacer(1, 4*mm))
    story.append(Paragraph("Stakeholder Value Propositions", style_subsection))
    
    stakeholder_data = [
        ("For Travelers", "Visualized itineraries, AR/VR planning previews, safety alerts, and seamless, localized translation."),
        ("For Insurers", "Automated, risk-adjusted travel policies verified via secure sandboxed assurance gateways."),
        ("For Investors", "Addressing B2C premium travel and spatial AR/VR consumer markets, driven by transactional commissions and premium Aetheria+ tier renewals."),
    ]
    for role, value in stakeholder_data:
        story.append(Paragraph(f"<b>{role}:</b> {value}", style_body))

    story.append(Spacer(1, 4*mm))
    story.append(thin_divider())
    story.append(Paragraph(
        "Aetheria Explorer — Redefining exploration through cognitive AI mapping.",
        style_highlight_box
    ))
    story.append(Spacer(1, 2*mm))
    story.append(Paragraph(
        "© 2026 Aetheria Explorer. All rights reserved. Confidential document. For partnerships contact: partners@aetheria-explorer.com",
        style_footer_note
    ))

    # ═══════════════════════════════════════════
    # BUILD
    # ═══════════════════════════════════════════
    def first_page(canvas_obj, doc):
        draw_cover_page(canvas_obj, doc)

    def later_pages(canvas_obj, doc):
        draw_page_background(canvas_obj, doc)

    doc.build(story, onFirstPage=first_page, onLaterPages=later_pages)
    print(f"✅ Aetheria Brochure generated successfully: {OUTPUT_PATH}")


if __name__ == "__main__":
    build_brochure()
