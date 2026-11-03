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
    c.setFont("Helvetica", 9.5)
    c.setFillColor(MUTED)
    y -= 6 * mm
    c.drawString(
        M, y,
        "Full-Stack Developer & AI Enthusiast  ·  its.akash.k7217@gmail.com  ·  Meerut, India",
    )
    y -= 4.8 * mm
    c.setFillColor(ACCENT)
    c.drawString(M, y, "github.com/itsakash7217-gif")
    c.setFillColor(MUTED)
    c.drawString(58 * mm, y, "·")
    c.drawString(63 * mm, y, "linkedin.com/in/akash-kushwaha-2a11b6323")
    return y - 4 * mm

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
y = para("Resume Analyzer  |  React, TypeScript, Tailwind CSS, Python, Gemini 2.5 API", y, bold=True)
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
y -= 1.2 * mm
y = para("Sales Performance Analysis Dashboard  |  Python, Streamlit, Pandas, Plotly", y, bold=True)
y = para(
    "Interactive dashboard for analyzing sales data, tracking business performance and\n"
    "visualizing insights.",
    y,
)
y -= 1.2 * mm
y = para("Voice Emotion Detection  |  Python, TensorFlow, Librosa, LSTM", y, bold=True)
y = para(
    "Deep learning project that detects human emotions from voice signals using audio\n"
    "processing and neural networks.",
    y,
)

y = section("Skills", y)
y = para(
    "Languages:  Java, Python, JavaScript, TypeScript\n"
    "Frontend:  React.js, Next.js, Tailwind CSS, HTML/CSS\n"
    "Backend & Data:  Node.js, Express.js, MongoDB, REST APIs\n"
    "AI & Tools:  TensorFlow, LSTM, Librosa, Pandas, Plotly, Streamlit, Gemini API, Git & GitHub\n"
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
