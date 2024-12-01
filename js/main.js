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
        title: "AWS Infrastructure Automation",
        description: "Developed comprehensive IaC solutions using Terraform to manage AWS infrastructure, including VPC, EC2, RDS, and EKS clusters. Implemented auto-scaling and high availability patterns.",
        technologies: ["Terraform", "AWS", "Python", "CloudWatch"],
        link: "https://github.com/nived2/aws-infrastructure"
    },
    {
        title: "CI/CD Pipeline Optimization",
        description: "Designed and implemented efficient CI/CD pipelines using Jenkins and GitHub Actions. Reduced deployment time by 60% and implemented automated testing and security scanning.",
        technologies: ["Jenkins", "GitHub Actions", "Docker", "SonarQube"],
        link: "https://github.com/nived2/cicd-pipeline"
    },
    {
        title: "Kubernetes Cluster Management",
        description: "Set up and managed production-grade Kubernetes clusters, implemented microservices architecture, and established monitoring using Prometheus and Grafana.",
        technologies: ["Kubernetes", "Docker", "Helm", "Prometheus"],
        link: "https://github.com/nived2/k8s-cluster"
    },
    {
        title: "Log Analytics Platform",
        description: "Built a centralized logging solution using ELK Stack, enabling real-time monitoring and alerting for distributed systems.",
        technologies: ["Elasticsearch", "Logstash", "Kibana", "Beats"],
        link: "https://github.com/nived2/log-analytics"
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
