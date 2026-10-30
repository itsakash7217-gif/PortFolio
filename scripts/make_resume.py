"""Generate a clean one-page resume PDF for the portfolio's Download CV button."""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas

OUT = "/home/z/my-project/public/resume.pdf"

INK = HexColor("#18181b")
MUTED = HexColor("#52525b")
ACCENT = HexColor("#7c3aed")
LIGHT = HexColor("#f4f2fb")

W, H = A4
M = 16 * mm

c = canvas.Canvas(OUT, pagesize=A4)
c.setTitle("Alex Carter - Resume")

y = H - M

def heading(text, y):
    c.setFont("Helvetica-Bold", 21)
    c.setFillColor(INK)
    c.drawString(M, y, text)
    c.setFont("Helvetica", 10.5)
    c.setFillColor(MUTED)
    y -= 6 * mm
    c.drawString(M, y, "Full-Stack Developer  ·  alex.carter@example.com  ·  github.com/alexcarter  · linkedin.com/in/alexcarter")
    return y - 4 * mm

def section(title, y):
    y -= 6 * mm
    c.setFillColor(ACCENT)
    c.rect(M, y - 1.2 * mm, 34 * mm, 1.1 * mm, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 12.5)
    c.setFillColor(INK)
    c.drawString(M, y - 7 * mm, title.upper())
    return y - 10.5 * mm

def para(text, y, size=9.8, leading=4.6, bold=False):
    c.setFont("Helvetica-Bold" if bold else "Helvetica", size)
    c.setFillColor(INK if bold else MUTED)
    for line in text.split("\n"):
        c.drawString(M, y, line)
        y -= leading * mm
    return y

y = heading("Alex Carter", y)

y = section("Profile", y)
y = para(
    "Full-stack developer with 5+ years of experience shipping web products end to end.\n"
    "I care about clean architecture, delightful interfaces and measurable impact.",
    y,
)

y = section("Experience", y)
y = para("Senior Full-Stack Developer  ·  Nova Labs  ·  2023 - Present", y, bold=True)
y = para(
    "Led the rebuild of the core SaaS dashboard (React, Next.js, PostgreSQL), cutting\n"
    "page load times by 58% and lifting weekly active usage by 23%. Mentor to 3 juniors.",
    y,
)
y -= 1.5 * mm
y = para("Full-Stack Developer  ·  Brightline Studio  ·  2021 - 2023", y, bold=True)
y = para(
    "Delivered 12 client projects (e-commerce, fintech, education) with TypeScript,\n"
    "Node.js and cloud-native deployments on AWS.",
    y,
)
y -= 1.5 * mm
y = para("Frontend Developer  ·  PixelForge  ·  2019 - 2021", y, bold=True)
y = para("Built accessible, responsive UIs and a shared component library used by 4 teams.", y)

y = section("Projects", y)
y = para(
    "DevPulse - real-time team analytics platform (2.1k GitHub stars)\n"
    "PathFinder - AI study planner used by 8k students  ·  ChartCraft - open-source SVG chart kit",
    y,
)

y = section("Skills", y)
y = para(
    "TypeScript  ·  React / Next.js  ·  Node.js  ·  PostgreSQL / Prisma  ·  Tailwind CSS\n"
    "Python  ·  Docker  ·  AWS  ·  CI/CD  ·  Testing (Vitest, Playwright)",
    y,
)

y = section("Education", y)
y = para("B.Sc. Computer Science  ·  University of Technology  ·  2015 - 2019", y, bold=True)
y = para("AWS Certified Developer - Associate  ·  Google UX Design Certificate", y)

c.save()
print("saved", OUT)
