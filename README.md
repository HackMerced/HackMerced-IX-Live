# HackMerced-IX-Live
## Tech Stack
Frontend Tech Stack:
- HTML, CSS, JS

Backend Tech Stack:
- Python / Flask, Jinja
# Frontend
## File Structure
All .HTML pages should go inside `code/templates/` and any components such as the navbar can go inside `code/templates/components`. 
All CSS files should be placed inside `code/static/css`.
All images should be placed inside `code/static/images`.
## Pages
The Frontend of the HM-IX Live page should contain the following:
- Login Page (No registration page)
- Dashboard/Landing Page
- Prizes Page
- Schedule Page
- Livestream Page
## Components
There will be one component that will be inserted into pages using Jinja:
- Navbar
## Template
Please reference the `fabled-template.html` and `fabled-template.css` for referencing CSS classes created for the convenience of styling some general elements.
---
Please refer to the figma at [Live Page](https://www.figma.com/file/BL2BJZ0EzKiqzcg5Edo2v7/HackMerced-Live-Page?type=design&mode=design&t=IsQik3AzlhBLkRTd-1)
---
## First-Time Running instructions

For the first time running: 
- make a virtual environment by running python -m venv venv into the terminal
- then activate it with the following ways:
windows: `.\venv\Scripts\activate`
mac/linux: `source venv/bin/activate`
- Once that is running you should see something like this 
`(venv) C:[path to folder]>`

Once that is active, run `pip install -r requirements.txt`
 
## General running instructions
When the venv is made and libraries installed, you run these same commands as above:
windows: `./venv/Scripts/activate`
mac/linux: `source venv/bin/activate`
You do not need to activate the venv if its already active
then in terminal run `python(version if needed) code/run.py`
LocalHost URL to access it is
http://127.0.0.1:5000/home
