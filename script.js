document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the main page or dashboard
    const hamburger = document.querySelector('.hamburger');
    
    if (hamburger) {
        // Main Site Logic
        const navLinks = document.querySelector('.nav-links');
        const links = document.querySelectorAll('.nav-links li');
        const header = document.querySelector('header');

        // Toggle Mobile Menu
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            header.classList.toggle('menu-open');
            
            // Hamburger Animation
            hamburger.classList.toggle('toggle');
        });

        // Close menu when clicking a link
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                header.classList.remove('menu-open');
                hamburger.classList.remove('toggle');
            });
        });

        // Navigation Scroll Behavior
        let lastScrollTop = 0;
        const headerHeight = header.offsetHeight;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Handle Header Background
            if (scrollTop > 0) {
                header.classList.add('header-white');
            } else {
                header.classList.remove('header-white');
            }

            // Handle Header Hide/Show
            if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
                // Scrolling Down
                header.classList.add('header-hidden');
            } else {
                // Scrolling Up
                header.classList.remove('header-hidden');
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
        });

        // Intersection Observer for Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in-up').forEach(el => {
            observer.observe(el);
        });

        // Smooth Scrolling for Anchor Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            });
        });

        // Curriculum Tabs
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // Add active class to clicked button
                btn.classList.add('active');

                // Show corresponding content
                const target = btn.getAttribute('data-target');
                document.getElementById(target).classList.add('active');
            });
        });
    }

    // MyEEDU Dashboard Logic
    const ssoBtn = document.getElementById('sso-btn');
    if (ssoBtn) {
        ssoBtn.addEventListener('click', () => {
            const loginScreen = document.getElementById('sso-login');
            const dashboardUI = document.getElementById('dashboard-ui');
            
            // Simulate loading
            ssoBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Authenticating...';
            
            setTimeout(() => {
                loginScreen.style.opacity = '0';
                loginScreen.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    loginScreen.style.display = 'none';
                    dashboardUI.style.display = 'grid';
                }, 500);
            }, 1500);
        });

        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                location.reload(); // Simple reload to reset to login screen
            });
        }

        // Main Navigation Logic
        const navDashboard = document.getElementById('nav-dashboard');
        const navSchedule = document.getElementById('nav-schedule');
        const navGrades = document.getElementById('nav-grades');
        
        const mainDashboard = document.getElementById('main-dashboard');
        const scheduleView = document.getElementById('schedule-view');
        const gradesView = document.getElementById('grades-view');
        const courseView = document.getElementById('course-view');

        function hideAllViews() {
            if(mainDashboard) mainDashboard.style.display = 'none';
            if(scheduleView) scheduleView.style.display = 'none';
            if(gradesView) gradesView.style.display = 'none';
            if(courseView) courseView.style.display = 'none';
            
            // Reset active states
            document.querySelectorAll('.main-nav-list li').forEach(li => li.classList.remove('active'));
            document.querySelectorAll('.course-nav-list li').forEach(li => li.classList.remove('active'));
        }

        if (navDashboard) {
            navDashboard.addEventListener('click', (e) => {
                e.preventDefault();
                hideAllViews();
                mainDashboard.style.display = ''; // Revert to CSS (grid or flex)
                navDashboard.parentElement.classList.add('active');
            });
        }

        if (navSchedule) {
            navSchedule.addEventListener('click', (e) => {
                e.preventDefault();
                hideAllViews();
                scheduleView.style.display = ''; // Revert to CSS
                navSchedule.parentElement.classList.add('active');
            });
        }

        if (navGrades) {
            navGrades.addEventListener('click', (e) => {
                e.preventDefault();
                hideAllViews();
                gradesView.style.display = ''; // Revert to CSS
                navGrades.parentElement.classList.add('active');
            });
        }

        // Course View Logic
        const courseLinks = document.querySelectorAll('.course-nav-list a, .progress-item, .schedule-item');
        // const mainDashboard = document.getElementById('main-dashboard'); // Already defined above
        // const courseView = document.getElementById('course-view'); // Already defined above
        const backToDashBtn = document.getElementById('back-to-dash');
        const courseTitleElement = document.querySelector('.course-header-card h2');

        if (courseLinks.length > 0 && mainDashboard && courseView) {
            courseLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    // Get Course Name (Simple logic)
                    let courseName = "Introduction to Computer Science"; // Default
                    if (link.tagName === 'A') {
                        courseName = link.textContent.trim();
                        // Highlight sidebar item
                        hideAllViews(); // Clear main nav active states
                        link.parentElement.classList.add('active');
                    } else if (link.classList.contains('progress-item')) {
                        courseName = link.querySelector('.p-info span:first-child').textContent.trim();
                        hideAllViews();
                    } else if (link.classList.contains('schedule-item')) {
                        courseName = link.querySelector('.subject').textContent.trim();
                        hideAllViews();
                    }

                    // Update Title
                    if (courseTitleElement) {
                        courseTitleElement.textContent = courseName;
                    }

                    // Switch Views
                    // mainDashboard.style.display = 'none'; // Handled by hideAllViews
                    courseView.style.display = 'block';
                    
                    // Scroll to top
                    window.scrollTo(0, 0);
                });
            });
        }

        if (backToDashBtn) {
            backToDashBtn.addEventListener('click', () => {
                hideAllViews();
                mainDashboard.style.display = ''; // Revert to CSS
                if(navDashboard) navDashboard.parentElement.classList.add('active');
            });
        }

        // Logo Click Logic
        const dashLogo = document.getElementById('dash-logo');
        if (dashLogo) {
            dashLogo.addEventListener('click', (e) => {
                e.preventDefault();
                hideAllViews();
                mainDashboard.style.display = ''; // Revert to CSS
                if(navDashboard) navDashboard.parentElement.classList.add('active');
                
                // Close mobile sidebar if open
                const dashSidebar = document.querySelector('.dash-sidebar');
                if (window.innerWidth <= 992 && dashSidebar) {
                    dashSidebar.classList.remove('active');
                }
            });
        }

        // Course Sidebar Navigation Logic
        const courseSidebarLinks = document.querySelectorAll('.course-sidebar ul li a');
        const courseTabContents = document.querySelectorAll('.course-tab-content');

        if (courseSidebarLinks.length > 0) {
            courseSidebarLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    // Remove active class from all links
                    document.querySelectorAll('.course-sidebar ul li').forEach(li => li.classList.remove('active'));
                    // Add active class to parent li
                    link.parentElement.classList.add('active');

                    // Hide all tab contents
                    courseTabContents.forEach(content => {
                        content.style.display = 'none';
                        content.classList.remove('active');
                    });

                    // Show target content
                    const targetId = link.getAttribute('data-target');
                    const targetContent = document.getElementById(targetId);
                    if (targetContent) {
                        targetContent.style.display = 'block';
                        targetContent.classList.add('active');
                    }
                });
            });
        }

        // Mobile Sidebar Toggle
        const dashMenuBtn = document.getElementById('dash-menu-btn');
        const dashSidebar = document.querySelector('.dash-sidebar');

        if (dashMenuBtn && dashSidebar) {
            dashMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent closing immediately
                dashSidebar.classList.toggle('active');
            });

            // Close sidebar when clicking outside
            document.addEventListener('click', (e) => {
                if (dashSidebar.classList.contains('active') && 
                    !dashSidebar.contains(e.target) && 
                    e.target !== dashMenuBtn) {
                    dashSidebar.classList.remove('active');
                }
            });

            // Close sidebar when clicking a link inside it
            const sidebarLinks = dashSidebar.querySelectorAll('a');
            sidebarLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 992) {
                        dashSidebar.classList.remove('active');
                    }
                });
            });
        }

        // D3 Charts Rendering
        renderCharts();
    }
});

function renderCharts() {
    // 1. Achievement Rate (Donut Chart)
    createDonutChart("#chart-achievement", 85, "85%");

    // 2. Overall Progress (Donut Chart)
    createDonutChart("#chart-progress", 72, "72%");

    // 3. Assignments Due (Bar Chart)
    createBarChart("#chart-assignments", [
        { label: "Today", value: 1 },
        { label: "Tmrw", value: 1 },
        { label: "Week", value: 2 }
    ]);
}

function createDonutChart(selector, percent, text) {
    const width = 100;
    const height = 100;
    const margin = 5;
    const radius = Math.min(width, height) / 2 - margin;

    // Clear existing
    d3.select(selector).innerHTML = "";

    const svg = d3.select(selector)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal()
        .domain(["value", "rest"])
        .range(["#000", "#eee"]);

    const data = { value: percent, rest: 100 - percent };
    const pie = d3.pie().value(d => d[1]).sort(null);
    const data_ready = pie(Object.entries(data));

    const arc = d3.arc()
        .innerRadius(radius * 0.7) // Donut hole size
        .outerRadius(radius);

    svg.selectAll('allSlices')
        .data(data_ready)
        .join('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data[0]))
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 1);

    // Add Text
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em") // Vertical center
        .text(text)
        .attr("class", "chart-text");
}

function createBarChart(selector, data) {
    const width = 100;
    const height = 100;
    const margin = { top: 10, right: 5, bottom: 20, left: 5 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Clear existing
    d3.select(selector).innerHTML = "";

    const svg = d3.select(selector)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // X Axis
    const x = d3.scaleBand()
        .range([0, innerWidth])
        .domain(data.map(d => d.label))
        .padding(0.2);
    
    svg.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x).tickSize(0))
        .selectAll("text")
        .attr("transform", "translate(0,5)")
        .style("text-anchor", "middle")
        .style("font-size", "9px")
        .style("font-family", "sans-serif")
        .style("fill", "#666");
        
    svg.select(".domain").remove(); // Remove axis line

    // Y Axis
    const y = d3.scaleLinear()
        .domain([0, 3]) // Max value slightly higher than data
        .range([innerHeight, 0]);

    // Bars
    svg.selectAll("mybar")
        .data(data)
        .join("rect")
        .attr("x", d => x(d.label))
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => innerHeight - y(d.value))
        .attr("fill", "#000")
        .attr("rx", 2); // Rounded corners

    // Value Labels on top of bars
    svg.selectAll(".bar-label")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "bar-label")
        .attr("x", d => x(d.label) + x.bandwidth() / 2)
        .attr("y", d => y(d.value) - 3)
        .attr("text-anchor", "middle")
        .text(d => d.value);
}
