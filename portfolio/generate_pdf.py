import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def build_pdf():
    pdf_path = os.path.join("public", "Faiqa_Rashid_Resume.pdf")
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        rightMargin=54,
        leftMargin=54,
        topMargin=40,
        bottomMargin=40
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'HeaderTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#121413'),
        alignment=1, # Center
        spaceAfter=4
    )

    contact_style = ParagraphStyle(
        'HeaderContact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#121413'),
        alignment=1, # Center
        spaceAfter=12
    )

    section_heading_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#121413'),
        spaceBefore=10,
        spaceAfter=4
    )

    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#222222'),
        spaceAfter=6
    )

    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        leftIndent=15,
        firstLineIndent=-10,
        textColor=colors.HexColor('#222222'),
        spaceAfter=3
    )

    project_title_style = ParagraphStyle(
        'ProjectTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#121413'),
        spaceBefore=6,
        spaceAfter=2
    )

    story = []

    # Title & Contact
    story.append(Paragraph("<b>FAIQA RASHID</b>", title_style))
    story.append(Paragraph("Faisalabad, Pakistan | 0325-0062083 | <a href='mailto:faiqarashid06@gmail.com' color='#14532D'>faiqarashid06@gmail.com</a>", contact_style))
    
    # Divider
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#121413'), spaceBefore=0, spaceAfter=8))

    # Professional Summary
    story.append(Paragraph("<b>PROFESSIONAL SUMMARY</b>", section_heading_style))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#888888'), spaceBefore=1, spaceAfter=6))
    summary_text = (
        "Computer Science student specializing in Full-Stack Web Development and Machine Learning, "
        "with hands-on experience building production-quality applications. Proficient in end-to-end development "
        "using Python, JavaScript, PHP, and SQL. Demonstrated ability to integrate AI/ML solutions into scalable "
        "web applications. Active participant in competitive hackathons (IBM Developer Day, AMD Developer Hackathon) "
        "and passionate about clean code, user-centric design, and continuous learning. Seeking internship opportunities "
        "to contribute technical expertise in full-stack development and AI-driven solutions."
    )
    story.append(Paragraph(summary_text, body_style))

    # Technical Skills
    story.append(Paragraph("<b>TECHNICAL SKILLS</b>", section_heading_style))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#888888'), spaceBefore=1, spaceAfter=6))
    
    skills = [
        "<b>Programming & Databases:</b> Python, C++, Java, SQL (MySQL).",
        "<b>Web Engineering:</b> PHP, HTML5, CSS3, Streamlit (Data-driven Web Apps).",
        "<b>AI & Data Science:</b> Machine Learning (Scikit-Learn), Basic Data Analysis, Prompt Engineering.",
        "<b>Systems & Networking:</b> Cisco Packet Tracer (Network Topology), Logisim (Logic Circuit Design).",
        "<b>Development Tools:</b> VS Code, Jupyter Notebook, Git / GitHub, Canva.",
        "<b>Professional Competencies:</b> Advanced Debugging, Problem Solving, Technical Documentation (SDLC), Efficient Time Management."
    ]
    for sk in skills:
        story.append(Paragraph(f"• {sk}", bullet_style))

    # Projects
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>PROJECTS</b>", section_heading_style))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#888888'), spaceBefore=1, spaceAfter=6))

    # Project 1: Pakfreelance
    story.append(Paragraph("<b>Pakfreelance - Freelance Marketplace Platform</b> | Python, JavaScript, MySQL, Full Stack", project_title_style))
    story.append(Paragraph("AMD Developer Hackathon Participant | Live Demo: <a href='https://huggingface.co/spaces/lablab-ai-amd-developer-hackathon/pakfreelance-ai-agent' color='#14532D'><u>HuggingFace Live Demo</u></a>", body_style))
    p1_bullets = [
        "Designed and built complete full-stack platform connecting Pakistani talent with global clients",
        "Implemented user authentication system, project management features, and secure backend architecture",
        "Currently deployed and live for real user interactions on Hugging Face"
    ]
    for b in p1_bullets:
        story.append(Paragraph(f"• {b}", bullet_style))

    # Project 2: Scrollix
    story.append(Paragraph("<b>Scrollix: Manhwa Catalog Platform</b> | HTML5, CSS3, PHP, MySQL", project_title_style))
    p2_bullets = [
        "Designed a high-fidelity, responsive catalog interface inspired by modern streaming platforms, utilizing a minimalist layout and interactive hover effects.",
        "Developed a \"mobile-first\" user experience, ensuring the catalog and navigation remain seamless across various screen sizes.",
        "Integrated a PHP/MySQL backend specifically for User Authentication, implementing secure registration and login workflows to manage user access."
    ]
    for b in p2_bullets:
        story.append(Paragraph(f"• {b}", bullet_style))

    # Project 3: Scriptclean A11y Guard
    story.append(Paragraph("<b>Scriptclean A11y Guard</b> | Python, Flask, Machine Learning", project_title_style))
    story.append(Paragraph("IBM Developer Day Hackathon Participant", body_style))
    p3_bullets = [
        "Developed intelligent web accessibility auditing tool addressing WCAG 2.1 compliance gaps",
        "Implemented automated accessibility scanning with real-time code suggestions using AI/ML",
        "Engineered end-to-end solution: Python/Flask backend, interactive frontend interface, deployment pipeline."
    ]
    for b in p3_bullets:
        story.append(Paragraph(f"• {b}", bullet_style))

    # Project 4: Travelle
    story.append(Paragraph("<b>Travelle: UI/UX Discovery Prototype</b> | Canva, Double Diamond Framework", project_title_style))
    p4_bullets = [
        "Designed a high-fidelity discovery prototype for a travel platform, focusing on user-centric navigation and clean information architecture.",
        "Applied the Double Diamond design methodology to identify user pain points and create a streamlined \"Explore\" page layout.",
        "Focused on visual hierarchy and minimalist design principles to reduce user friction during the travel planning process."
    ]
    for b in p4_bullets:
        story.append(Paragraph(f"• {b}", bullet_style))

    # Education
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>EDUCATION</b>", section_heading_style))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#888888'), spaceBefore=1, spaceAfter=6))
    story.append(Paragraph("<b>Bachelor of Science in Computer Science</b>", ParagraphStyle('EduTitle', parent=body_style, fontName='Helvetica-Bold')))
    story.append(Paragraph("Government College Women University Faisalabad, Pakistan | Expected Graduation: 2027", body_style))
    
    edu_bullets = [
        "Active participation in technical projects and hackathon competitions",
        "Continuous learning through professional certifications and online courses",
        "Hands-on experience with full-stack development in real-world scenarios"
    ]
    for b in edu_bullets:
        story.append(Paragraph(f"• {b}", bullet_style))

    # Certifications
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>CERTIFICATIONS</b>", section_heading_style))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#888888'), spaceBefore=1, spaceAfter=6))
    
    certs = [
        "<b>Front-End Developer Professional Specialization</b> – Meta | 2025",
        "<b>Prompt Engineering Specialization</b> – Vanderbilt University | 2025",
        "<b>Python for Everybody Specialization</b> – University of Michigan | 2025"
    ]
    for c in certs:
        story.append(Paragraph(f"• {c}", bullet_style))

    doc.build(story)
    print("PDF generated successfully at:", pdf_path)

if __name__ == "__main__":
    build_pdf()
