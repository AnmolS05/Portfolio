import os
import json
import glob

PORTFOLIO_DIR = r"C:\Users\Anmol\Documents\portfolio"
CER_DIR = os.path.join(PORTFOLIO_DIR, "cer")
PROJECTS = [
    r"C:\Users\Anmol\Documents\business-crm-and-advisor",
    r"C:\Users\Anmol\Documents\ai resume screening",
    r"C:\Users\Anmol\Documents\trendpulse",
    r"C:\Users\Anmol\Downloads\scriberx",
    r"C:\Users\Anmol\Documents\InviMan",
    r"C:\Users\Anmol\Documents\BiSign3D",
    r"C:\Users\Anmol\Documents\Orbits",
    r"C:\Users\Anmol\Documents\fake-news-detection"
]

def clean_cert_name(filename):
    mapping = {
        "anmol-du.pdf": "Delhi University Certification",
        "CertificatewithDescription20260822-8-94icbk.pdf": "Google Cloud Certificate",
        "DevelopAI-PoweredPrototypesinGoogleAIStudio_Badge20260820-21-7d0hbs.pdf": "Develop AI-Powered Prototypes in Google AI Studio",
        "WhatsApp Image 2026-08-19 at 10.57.59 (1).jpeg": "Technical Achievement Certificate 1",
        "WhatsApp Image 2026-08-19 at 10.57.59 (2).jpeg": "Technical Achievement Certificate 2",
        "WhatsApp Image 2026-08-19 at 10.57.59.jpeg": "Technical Achievement Certificate 3",
        "WhatsApp Image 2026-08-19 at 11.34.22.jpeg": "Technical Achievement Certificate 4",
        "create-your-first-gemini-enterprise-application.png": "Create Your First Gemini Enterprise Application",
        "explore-generative-ai-with-the-vertex-ai-gemini-api.pdf": "Explore Generative AI with Vertex AI Gemini API",
        "explore-generative-ai-with-the-vertex-ai-gemini-api.png": "Explore Generative AI with Vertex AI Gemini API (Badge)",
        "first gemini enterprise application.pdf": "Create Your First Gemini Enterprise Application (PDF)"
    }
    if filename in mapping:
        return mapping[filename]
    
    # Fallback cleaner
    name = os.path.splitext(filename)[0]
    name = name.replace('-', ' ').replace('_', ' ')
    # Add space before capitals if missing (camelCase/PascalCase to spaces)
    import re
    name = re.sub(r'(?<=[a-z])(?=[A-Z])', ' ', name)
    return name.title()

def get_certificates():
    if not os.path.exists(CER_DIR):
        return []
    certs = []
    for f in os.listdir(CER_DIR):
        if os.path.isfile(os.path.join(CER_DIR, f)):
            certs.append({
                "name": clean_cert_name(f),
                "filename": f,
                "path": f"cer/{f}",
                "type": f.split('.')[-1].lower()
            })
    return certs

def get_projects():
    projects_data = []
    for p in PROJECTS:
        name = os.path.basename(p)
        desc = "A great project"
        # Try to read package.json or README.md if they exist
        pkg_path = os.path.join(p, "package.json")
        readme_path = os.path.join(p, "README.md")
        
        if os.path.exists(pkg_path):
            try:
                with open(pkg_path, 'r', encoding='utf-8') as f:
                    pkg = json.load(f)
                    if 'description' in pkg:
                        desc = pkg['description']
            except Exception:
                pass
        
        projects_data.append({
            "name": name,
            "description": desc,
            "path": p
        })
    return projects_data

def main():
    data = {
        "certificates": get_certificates(),
        "projects": get_projects()
    }
    
    js_content = f"const portfolioData = {json.dumps(data, indent=4)};"
    with open(os.path.join(PORTFOLIO_DIR, "data.js"), "w", encoding='utf-8') as f:
        f.write(js_content)
    print("Successfully generated data.js")

    # Git Sync
    try:
        import subprocess
        print("Syncing with GitHub...")
        
        # Initialize if not already
        if not os.path.exists(os.path.join(PORTFOLIO_DIR, ".git")):
            subprocess.run(["git", "init"], cwd=PORTFOLIO_DIR, check=True)
            subprocess.run(["git", "remote", "add", "origin", "https://github.com/AnmolS05/Portfolio.git"], cwd=PORTFOLIO_DIR, check=False)
            
        subprocess.run(["git", "add", "."], cwd=PORTFOLIO_DIR, check=True)
        subprocess.run(["git", "commit", "-m", "Automated iteration update"], cwd=PORTFOLIO_DIR, check=False)
        subprocess.run(["git", "branch", "-M", "main"], cwd=PORTFOLIO_DIR, check=False)
        subprocess.run(["git", "push", "-u", "origin", "main"], cwd=PORTFOLIO_DIR, check=False)
        print("Git sync complete.")
    except Exception as e:
        print(f"Git sync failed: {e}")

if __name__ == "__main__":
    main()
