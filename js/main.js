// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class to navigation links on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Sample projects data - Replace with your actual projects
const projects = [
    {
        title: "CI/CD Pipeline Automation",
        description: "Implemented automated deployment pipeline using Jenkins, Docker, and AWS",
        technologies: ["Jenkins", "Docker", "AWS", "Git"],
        link: "#"
    },
    {
        title: "Infrastructure as Code",
        description: "Developed Terraform scripts for managing cloud infrastructure",
        technologies: ["Terraform", "AWS", "Python"],
        link: "#"
    },
    {
        title: "Kubernetes Cluster Management",
        description: "Set up and managed Kubernetes clusters for microservices architecture",
        technologies: ["Kubernetes", "Docker", "Helm"],
        link: "#"
    }
];

// Populate projects section
const projectsGrid = document.querySelector('.projects-grid');
projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="technologies">
            ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
        </div>
        <a href="${project.link}" class="btn primary">View Project</a>
    `;
    projectsGrid.appendChild(projectCard);
});

// Add scroll reveal animations
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.skill-category, .project-card, .contact-item');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
});
