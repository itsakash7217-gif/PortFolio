"""Generate a one-page resume PDF for Akash Kushwaha (portfolio Download CV button)."""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas

OUT = "/home/z/my-project/public/resume.pdf"

INK = HexColor("#18181b")
MUTED = HexColor("#52525b")
ACCENT = HexColor("#7c3aed")

W, H = A4
M = 16 * mm

c = canvas.Canvas(OUT, pagesize=A4)
c.setTitle("Akash Kushwaha - Resume")

y = H - M

def heading(text, y):
    c.setFont("Helvetica-Bold", 21)
    c.setFillColor(INK)
    c.drawString(M, y, text)

    def row(items_y, parts, gap=5):
        """Draw parts left-to-right, alternating muted/accent, measured widths."""
        x = M
        for i, (txt, accent) in enumerate(parts):
            c.setFont("Helvetica", 9.2)
            c.setFillColor(ACCENT if accent else MUTED)
            c.drawString(x, items_y, txt)
            x += c.stringWidth(txt, "Helvetica", 9.2)
            if i < len(parts) - 1:
                x += gap * mm
        return items_y

    c.setFont("Helvetica", 9.2)
    c.setFillColor(MUTED)
    y -= 6 * mm
    y = row(y, [
        ("Full-Stack Developer & AI Enthusiast", False),
        ("its.akash.k7217@gmail.com", False),
        ("+91 96900 94788", False),
    ], gap=7)
    y -= 4.6 * mm
    c.setFillColor(MUTED)
    c.drawString(M, y, "Sasni, Hathras, Uttar Pradesh 204216, India")
    y -= 4.6 * mm
    y = row(y, [
        ("github.com/itsakash7217-gif", True),
        ("linkedin.com/in/akash_kushwaha-498a23376", True),
        ("leetcode.com/u/Akash_Kushwhaha", True),
    ], gap=8)
    return y - 3 * mm

def section(title, y):
    y -= 5.5 * mm
    c.setFillColor(ACCENT)
    c.rect(M, y - 1.2 * mm, 34 * mm, 1.1 * mm, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 12.5)
    c.setFillColor(INK)
    c.drawString(M, y - 6.8 * mm, title.upper())
    return y - 10.2 * mm

def para(text, y, size=9.6, leading=4.5, bold=False, color=None):
    c.setFont("Helvetica-Bold" if bold else "Helvetica", size)
    c.setFillColor(color if color else (INK if bold else MUTED))
    for line in text.split("\n"):
        c.drawString(M, y, line)
        y -= leading * mm
    return y

y = heading("Akash Kushwaha", y)

y = section("Profile", y)
y = para(
    "Enthusiastic Computer Science student specializing in Artificial Intelligence, with strong\n"
    "problem-solving skills, 400+ LeetCode problems solved, and hands-on experience in Java, DSA\n"
    "and full-stack development. Eager to learn and contribute to organizational growth.",
    y,
)

y = section("Education", y)
y = para("B.Tech - Computer Science and Engineering (Artificial Intelligence)", y, bold=True)
y = para(
    "Noida Institute of Engineering and Technology (NIET), Greater Noida\n"
    "Expected graduation: 2027",
    y,
)

y = section("Projects", y)
y = para("Resume Analyzer  |  React, Tailwind CSS, Node.js, Express.js, MongoDB, Gemini API", y, bold=True)
y = para(
    "AI-powered application that analyzes resumes, generates ATS scores, identifies skill gaps,\n"
    "recommends suitable jobs and provides improvement suggestions.",
    y,
)
y -= 1.2 * mm
y = para("Bike Rental Management System  |  React, Tailwind CSS, Node.js, Express.js, MongoDB", y, bold=True)
y = para(
    "Full-stack application for managing bike bookings, inventory, customer records and\n"
    "rental operations.",
    y,
)

y = section("Skills", y)
y = para(
    "Languages:  Java, JavaScript, TypeScript, SQL\n"
    "Frontend:  React.js, Next.js, Tailwind CSS, HTML/CSS\n"
    "Backend & Data:  Node.js, Express.js, MongoDB, REST APIs\n"
    "AI & Tools:  Gemini API / Generative AI, Git & GitHub\n"
    "Core:  Data Structures & Algorithms, OOP, Problem Solving",
    y,
)

y = section("Achievements", y)
y = para(
    "- Solved 400+ problems on LeetCode using Java, with a strong DSA foundation\n"
    "- Participated in Smart India Hackathon (SIH) project activities\n"
    "- Completed technical certifications in relevant areas",
    y,
)

y = section("Currently Learning", y)
y = para(
    "Advanced Java & DSA  ·  React.js & Next.js  ·  Node.js & Express.js  ·  MongoDB & Full-Stack\n"
    "AI/ML & Generative AI",
    y,
)

c.save()
print("saved", OUT)
