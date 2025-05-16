# Kevin McSharry Portfolio Website

## Overview
This repository contains the source code for Kevin McSharry's personal portfolio website. The site showcases Kevin's professional work, skills, and services as a Project Manager, Business Analyst, Producer, and Designer.

## Features
- Responsive design that works on all devices
- Project showcase with filterable categories
- Interactive resume with embedded PDF and credentials
- Contact information and consulting services details

## Structure
The website is organized into the following files:

- **index.html** - Home page with introduction and navigation to other sections
- **projects.html** - Showcase of professional work with filterable categories
- **resume.html** - Professional resume and credentials
- **contact.html** - Contact information and consulting services
- **style.css** - Main stylesheet for the entire website
- **scripts.js** - JavaScript functionality for filtering and interactivity
- **Images/** - Directory containing all website images

## Technologies Used
- HTML5
- CSS3
- JavaScript (vanilla/no frameworks)
- Google Drive (for resume embedding)
- Credly (for certification badges)

## Setup Instructions
1. Clone this repository to your local machine or web server
2. Ensure all files maintain their relative structure
3. Replace images in the `Images` folder with your actual images
4. Update the resume Google Drive link in resume.html with your own document ID
5. Test the website locally before deploying

## Adding New Projects
To add a new project to the projects page:
1. Copy an existing project card in projects.html
2. Update the image, title, description, and link information
3. Update the project tags with relevant categories
4. The filtering system will automatically include any new tags

Example project card structure:
```html
<div class="project-card">
    <div class="project-image">
        <img src="Images/your-image.png" alt="Project Title">
    </div>
    <div class="project-content">
        <h3>Project Title</h3>
        <p>Project description goes here...</p>
        <div class="project-tags" data-tags="Tag1,Tag2">
            <span class="tag" data-tag="Tag1">Tag1</span>
            <span class="tag" data-tag="Tag2">Tag2</span>
        </div>
        <a href="https://your-link.com" class="project-link" target="_blank">Link Text →</a>
    </div>
</div>
```

## Customization
- Colors can be changed by editing the CSS variables at the top of style.css
- Content can be updated by editing the HTML files
- Additional pages can be added by following the same structure and linking them in the navigation

## Browser Compatibility
This website is designed to work on all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## License
All rights reserved. This code is not open-source and is intended for personal use only.

## Contact
For questions or issues regarding this website, please contact:
- Email: Kevin@KevinMcSharry.com
- Phone: (508) 259-5862