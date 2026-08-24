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

def get_certificates():
    if not os.path.exists(CER_DIR):
        return []
    certs = []
    for f in os.listdir(CER_DIR):
        if os.path.isfile(os.path.join(CER_DIR, f)):
            certs.append({
                "name": f,
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
        # Commit will fail if no changes, so we ignore error
        subprocess.run(["git", "commit", "-m", "Automated iteration update"], cwd=PORTFOLIO_DIR, check=False)
        subprocess.run(["git", "push", "-u", "origin", "master"], cwd=PORTFOLIO_DIR, check=False)
        print("Git sync complete.")
    except Exception as e:
        print(f"Git sync failed: {e}")

if __name__ == "__main__":
    main()
