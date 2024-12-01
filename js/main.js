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

// Projects data
const projects = [
    {
        title: "3-Tier Web Application Architecture",
        description: "Designed and implemented a scalable 3-tier web application using React frontend, Node.js backend, and PostgreSQL database. Containerized each tier with Docker and orchestrated using Docker Compose. Implemented Redis for session management and caching.",
        technologies: ["Docker", "Node.js", "React", "PostgreSQL", "Redis"],
        link: "https://github.com/nived2/3tier-webapp"
    },
    {
        title: "CI/CD Pipeline for 3-Tier App",
        description: "Set up automated CI/CD pipeline using Jenkins and GitLab for the 3-tier application. Implemented automated testing, containerized builds, and staged deployments with proper environment segregation.",
        technologies: ["Jenkins", "GitLab CI", "Docker", "Shell Script"],
        link: "https://github.com/nived2/3tier-cicd"
    },
    {
        title: "Infrastructure Automation",
        description: "Developed infrastructure as code using Terraform to provision and manage the complete infrastructure for the 3-tier application. Includes network configuration, security groups, and automated scaling policies.",
        technologies: ["Terraform", "Docker", "AWS", "GitLab"],
        link: "https://github.com/nived2/3tier-infrastructure"
    },
    {
        title: "Application Monitoring Stack",
        description: "Implemented comprehensive monitoring for the 3-tier application using Prometheus and Grafana. Set up Redis monitoring, database performance tracking, and application metrics collection with custom dashboards.",
        technologies: ["Prometheus", "Grafana", "Redis", "Docker"],
        link: "https://github.com/nived2/3tier-monitoring"
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
