"""
pdf_generator.py

PDF Report Generation for OFFO Risk Scores

Generates professional PDF risk assessment reports with:
- Business information and score
- Trend chart (30-day history)
- Risk drivers breakdown
- Recommended actions
- Timestamp
"""

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, PageBreak, Image
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.graphics.shapes import Drawing
from reportlab.graphics.charts.linecharts import HorizontalLineChart
from reportlab.graphics.charts.legends import Legend
from io import BytesIO
from datetime import datetime
from typing import Dict, Any, List
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')  # Non-interactive backend
import os

# Path to OFFO logo
LOGO_PATH = os.path.join(os.path.dirname(__file__), '..', 'Logo', 'OFFO_logo.png')

# Business name mapping for professional display
BUSINESS_NAMES = {
    'biz_excellent': 'Business A - Excellence Operations',
    'biz_healthy': 'Business B - Healthy Compliance',
    'biz_mixed': 'Business C - Mixed Performance',
    'biz_risky': 'Business D - Risk Management Focus',
    'biz_critical': 'Business E - Critical Improvement Needed'
}


def get_category_color(category: str) -> tuple:
    """Get RGB color for risk category."""
    colors_map = {
        "LOW": (0.3, 0.69, 0.31),      # #4CAF50 green
        "MODERATE": (0.94, 0.71, 0.16),  # #F0B429 amber
        "HIGH": (0.90, 0.22, 0.27),     # #E63946 red
    }
    return colors_map.get(category, (0.5, 0.5, 0.5))


def create_section_divider() -> Table:
    """Create a subtle section divider line."""
    divider_data = [[""]]
    divider_table = Table(divider_data, colWidths=[6.5*inch])
    divider_table.setStyle(TableStyle([
        ('LINEABOVE', (0, 0), (-1, 0), 2, colors.HexColor('#e5e7eb')),
        ('TOPPADDING', (0, 0), (-1, -1), 12),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
    ]))
    return divider_table


def create_trend_chart(trend_data: List[Dict[str, Any]], buffer: BytesIO) -> str:
    """
    Create matplotlib trend chart and return as bytes.

    Args:
        trend_data: List of {date, score} dicts
        buffer: BytesIO buffer to write image

    Returns:
        BytesIO buffer with PNG image
    """
    # Extract data
    dates = [item['date'] for item in trend_data]
    scores = [item['score'] for item in trend_data]

    # Create figure
    fig, ax = plt.subplots(figsize=(8, 3))

    # Plot line
    ax.plot(dates, scores, marker='o', linewidth=2, markersize=4, color='#3b82f6')

    # Add threshold lines
    ax.axhline(y=80, color='#4CAF50', linestyle='--', linewidth=1, alpha=0.5, label='Low Risk (80+)')
    ax.axhline(y=50, color='#F0B429', linestyle='--', linewidth=1, alpha=0.5, label='Moderate Risk (50-79)')

    # Professional styling with labeled axes
    ax.set_xlabel('Date', fontsize=10, fontweight='semibold')
    ax.set_ylabel('Risk Score (0-100)', fontsize=10, fontweight='semibold')
    ax.grid(True, alpha=0.3, linewidth=0.5)
    ax.set_ylim(0, 105)

    # Set explicit y-axis ticks
    ax.set_yticks([0, 25, 50, 75, 100])

    # Add background color zones for risk levels (subtle shading)
    ax.axhspan(80, 105, alpha=0.08, color='#4CAF50', label='Low Risk Zone')
    ax.axhspan(50, 80, alpha=0.08, color='#F0B429', label='Moderate Risk Zone')
    ax.axhspan(0, 50, alpha=0.08, color='#E63946', label='High Risk Zone')

    # Rotate x-axis labels for readability
    plt.xticks(rotation=45, ha='right', fontsize=8)
    plt.yticks(fontsize=9)

    # Show only every 5th date label
    ax.set_xticks(ax.get_xticks()[::5])

    # Legend with frame and shadow
    ax.legend(fontsize=8, loc='upper left', frameon=True, shadow=True, ncol=2)

    # Tight layout
    plt.tight_layout()

    # Save to buffer at higher DPI for better quality
    plt.savefig(buffer, format='png', dpi=300, bbox_inches='tight')
    plt.close()

    return buffer


def generate_risk_report_pdf(data: Dict[str, Any]) -> BytesIO:
    """
    Generate a comprehensive PDF risk report.

    Args:
        data: Complete risk score data from API

    Returns:
        BytesIO buffer containing PDF
    """
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter,
                           rightMargin=72, leftMargin=72,
                           topMargin=72, bottomMargin=18)

    # Container for PDF elements
    story = []

    # Styles
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#1f2937'),
        spaceAfter=12,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )

    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading2'],
        fontSize=18,
        textColor=colors.HexColor('#1f2937'),
        spaceAfter=8,
        spaceBefore=16,
        fontName='Helvetica-Bold',
        leading=22
    )

    subheading_style = ParagraphStyle(
        'CustomSubHeading',
        parent=styles['Heading3'],
        fontSize=11,
        textColor=colors.HexColor('#4b5563'),
        spaceAfter=4,
        spaceBefore=8,
        fontName='Helvetica-Bold'
    )

    body_style = ParagraphStyle(
        'CustomBody',
        parent=styles['Normal'],
        fontSize=12,
        textColor=colors.HexColor('#374151'),
        spaceAfter=8,
        fontName='Helvetica',
        leading=16
    )

    # --- PROFESSIONAL COVER PAGE ---

    # OFFO Logo (top-left)
    if os.path.exists(LOGO_PATH):
        logo = Image(LOGO_PATH, width=2.5*inch, height=0.8*inch)
        story.append(logo)
        story.append(Spacer(1, 0.4 * inch))

    # Report Title - Professional Typography
    cover_title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Heading1'],
        fontSize=28,
        textColor=colors.HexColor('#1f2937'),
        spaceAfter=8,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold',
        leading=34
    )

    cover_subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontSize=14,
        textColor=colors.HexColor('#6b7280'),
        spaceAfter=30,
        alignment=TA_CENTER,
        fontName='Helvetica',
        leading=18
    )

    business_name_style = ParagraphStyle(
        'BusinessName',
        parent=styles['Heading2'],
        fontSize=22,
        textColor=colors.HexColor('#3b82f6'),
        spaceAfter=12,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold',
        leading=26
    )

    date_style = ParagraphStyle(
        'DateStyle',
        parent=styles['Normal'],
        fontSize=12,
        textColor=colors.HexColor('#4b5563'),
        spaceAfter=20,
        alignment=TA_CENTER,
        fontName='Helvetica',
        leading=16
    )

    story.append(Spacer(1, 0.8 * inch))
    story.append(Paragraph("OFFO Risk Assessment Report", cover_title_style))
    story.append(Paragraph("Comprehensive Behavioral Compliance Snapshot", cover_subtitle_style))
    story.append(Spacer(1, 0.6 * inch))

    # Business Name - Prominent Display
    business_id = data.get('business_id', 'N/A')
    business_display_name = BUSINESS_NAMES.get(business_id, business_id)
    story.append(Paragraph(business_display_name, business_name_style))

    # Report Generation Date
    timestamp = datetime.now().strftime("%B %d, %Y")
    story.append(Paragraph(f"Generated: {timestamp}", date_style))

    # Divider Line
    story.append(Spacer(1, 0.4 * inch))

    # Business ID and Report Type in Professional Table
    metadata_data = [
        ["Business ID:", business_id],
        ["Report Type:", "Comprehensive Risk Assessment"],
        ["Data Refresh:", "Every 24 hours"]
    ]

    metadata_table = Table(metadata_data, colWidths=[2.2*inch, 3.8*inch])
    metadata_table.setStyle(TableStyle([
        ('FONT', (0, 0), (0, -1), 'Helvetica-Bold', 10),
        ('FONT', (1, 0), (1, -1), 'Helvetica', 10),
        ('TEXTCOLOR', (0, 0), (-1, -1), colors.HexColor('#4b5563')),
        ('ALIGN', (0, 0), (0, -1), 'RIGHT'),
        ('ALIGN', (1, 0), (1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LINEABOVE', (0, 0), (-1, 0), 1, colors.HexColor('#d1d5db')),
        ('LINEBELOW', (0, -1), (-1, -1), 1, colors.HexColor('#d1d5db')),
    ]))

    story.append(metadata_table)
    story.append(Spacer(1, 1.0 * inch))

    # --- RISK SCORE SUMMARY ---
    story.append(Paragraph("Risk Score Summary", heading_style))

    overall_score = data.get('overall_score', 0)
    category = data.get('category', 'UNKNOWN')
    category_color_rgb = get_category_color(category)
    category_color = colors.Color(category_color_rgb[0], category_color_rgb[1], category_color_rgb[2])

    # Risk indicator icon/badge with color
    risk_indicator = "●" if category == 'LOW' else "▲" if category == 'MODERATE' else "■"

    # Large score display with visual indicators
    score_data = [
        ["Overall Risk Score", f"{overall_score:.1f} / 100"],
        ["Risk Category", f"{risk_indicator}  {category}  RISK"]
    ]

    score_table = Table(score_data, colWidths=[3*inch, 3*inch])
    score_table.setStyle(TableStyle([
        # Header row with light background
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#f3f4f6')),
        # Category row with color-coded background (subtle tint)
        ('BACKGROUND', (0, 1), (-1, 1),
         colors.HexColor('#d1fae5') if category == 'LOW' else
         colors.HexColor('#fef3c7') if category == 'MODERATE' else
         colors.HexColor('#fee2e2')),
        # Fonts
        ('FONT', (0, 0), (0, -1), 'Helvetica-Bold', 11),
        ('FONT', (1, 0), (1, 0), 'Helvetica-Bold', 20),  # Larger score
        ('FONT', (1, 1), (1, 1), 'Helvetica-Bold', 14),
        # Colors
        ('TEXTCOLOR', (1, 0), (1, 0), colors.HexColor('#1f2937')),
        ('TEXTCOLOR', (1, 1), (1, 1), category_color),
        # Alignment
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        # Borders
        ('BOX', (0, 0), (-1, -1), 2, category_color),  # Color-coded border
        ('INNERGRID', (0, 0), (-1, -1), 1, colors.HexColor('#e5e7eb')),
        # Padding
        ('TOPPADDING', (0, 0), (-1, -1), 14),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 14),
    ]))

    story.append(score_table)
    story.append(Spacer(1, 0.2 * inch))

    # --- COMPONENT SCORES ---
    components = data.get('components', {})
    weights = data.get('weights', {})

    story.append(Paragraph("Component Breakdown", heading_style))

    component_data = [
        ["Component", "Score", "Weight", "Contribution"]
    ]

    task_score = components.get('task_adherence_score', 0)
    training_score = components.get('training_score', 0)
    doc_score = components.get('documentation_score', 0)

    task_weight = weights.get('task_adherence', 0.4)
    training_weight = weights.get('training_completion', 0.3)
    doc_weight = weights.get('documentation_accuracy', 0.3)

    component_data.append(["Task Adherence", f"{task_score:.1f}", f"{task_weight*100:.0f}%", f"{task_score * task_weight:.1f}"])
    component_data.append(["Training Completion", f"{training_score:.1f}", f"{training_weight*100:.0f}%", f"{training_score * training_weight:.1f}"])
    component_data.append(["Documentation Accuracy", f"{doc_score:.1f}", f"{doc_weight*100:.0f}%", f"{doc_score * doc_weight:.1f}"])

    component_table = Table(component_data, colWidths=[2.5*inch, 1.2*inch, 1.2*inch, 1.3*inch])
    component_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#3b82f6')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('FONT', (0, 0), (-1, 0), 'Helvetica-Bold', 10),
        ('FONT', (0, 1), (-1, -1), 'Helvetica', 9),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        # Right-align numeric columns (scores, weights, contributions)
        ('ALIGN', (1, 1), (-1, -1), 'RIGHT'),
        # Center-align header row
        ('ALIGN', (1, 0), (-1, 0), 'CENTER'),
        # Left-align component names
        ('ALIGN', (0, 0), (0, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('BOX', (0, 0), (-1, -1), 1.5, colors.HexColor('#93c5fd')),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#bfdbfe')),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))

    story.append(component_table)
    story.append(Spacer(1, 0.3 * inch))
    story.append(create_section_divider())

    # --- TREND CHART ---
    trend_data = data.get('trend_30d', [])
    if trend_data:
        story.append(Paragraph("30-Day Risk Trend", heading_style))

        # Create chart
        chart_buffer = BytesIO()
        create_trend_chart(trend_data, chart_buffer)
        chart_buffer.seek(0)

        # Add to PDF
        img = Image(chart_buffer, width=6.5*inch, height=2.5*inch)
        story.append(img)

        # Add figure caption
        caption_style = ParagraphStyle(
            'Caption',
            parent=styles['Normal'],
            fontSize=9,
            textColor=colors.HexColor('#6b7280'),
            alignment=TA_CENTER,
            fontName='Helvetica-Oblique',
            spaceAfter=6
        )
        story.append(Paragraph("Figure 1: 30-Day Risk Score Trend showing behavioral risk patterns over time with threshold indicators", caption_style))

        story.append(Spacer(1, 0.2 * inch))
        story.append(create_section_divider())

    # --- RISK DRIVERS ---
    drivers = data.get('drivers', [])
    if drivers:
        story.append(Paragraph("Risk Drivers Analysis", heading_style))

        for driver in drivers:
            label = driver.get('label', '')
            impact = driver.get('impact', 'neutral')
            description = driver.get('description', '')

            # Impact color
            impact_colors = {
                'positive': colors.HexColor('#4CAF50'),
                'neutral': colors.HexColor('#F0B429'),
                'negative': colors.HexColor('#E63946')
            }
            impact_color = impact_colors.get(impact, colors.gray)

            # Driver header
            driver_header = f"<b>{label}</b> <font color='{impact_color.hexval()}'>({impact.upper()})</font>"
            story.append(Paragraph(driver_header, body_style))
            story.append(Paragraph(description, body_style))
            story.append(Spacer(1, 0.1 * inch))

        story.append(create_section_divider())

    # --- RECOMMENDED ACTIONS ---
    actions = data.get('recommended_actions', [])
    if actions:
        story.append(Paragraph("Recommended Actions", heading_style))

        for i, action in enumerate(actions, 1):
            bullet = f"{i}. {action}"
            story.append(Paragraph(bullet, body_style))

        story.append(Spacer(1, 0.2 * inch))

    # --- FOOTER ---
    # Note: Page numbers are added via onPage callback during PDF generation

    # Build PDF with custom page template for headers/footers
    def add_page_decorations(canvas_obj, doc_obj):
        """Add headers, footers, and page numbers to each page."""
        canvas_obj.saveState()

        # Footer text - left-aligned
        canvas_obj.setFont('Helvetica-Oblique', 8)
        canvas_obj.setFillColor(colors.HexColor('#6b7280'))
        footer_text = "OFFO Risk Report — For internal use only — Confidential"
        canvas_obj.drawString(72, 30, footer_text)

        # Page numbers - bottom-right
        page_num = canvas_obj.getPageNumber()
        canvas_obj.setFont('Helvetica', 8)
        canvas_obj.drawRightString(doc_obj.pagesize[0] - 72, 30, f"Page {page_num}")

        canvas_obj.restoreState()

    # Build PDF with page decorations
    doc.build(story, onFirstPage=add_page_decorations, onLaterPages=add_page_decorations)

    # Return buffer
    buffer.seek(0)
    return buffer
