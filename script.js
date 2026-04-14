// Apslock Web Initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log("ApslockWeb Initialized");
    
    // Initialize the smooth scroll stretch effect
    initScrollStretch();
    
    // Initialize the concave peeling arch lifting the dark section back out
    initBottomStretch();

    // Initialize the auto-advancing What We Do section
    initWhatWeDoSlider();

    // Initialize custom physics-based trailing cursor natively
    initMagicCursor();

    // Initialize 3D Interactive FAQ Grid 
    initFAQCards();
});

// =========================================
// BOTTOM SCROLL ARCH PHYSICS LIFT
// =========================================
// BOTTOM SCROLL ARCH PHYSICS LIFT
// =========================================
function initBottomStretch() {
    const bottomStretchSection = document.getElementById('bottom-stretch-section');
    const bottomStretchPath = document.getElementById('bottom-stretch-path');
    
    if (!bottomStretchSection || !bottomStretchPath) return;

    // Anchor exactly at the bottom-most structural boundary natively (Y=120 block deep)
    let currentCornerY = 120;
    let targetCornerY = 120;

    function renderBottomStretch() {
        const rect = bottomStretchSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // How deeply the section has pushed upwards into viewing bounds natively
        let progress = (windowHeight - rect.top) / windowHeight;
        
        // Clamp bounds safely
        progress = Math.max(0, Math.min(1.2, progress));

        const maxStretchUp = 120; 
        
        // Smooth scaling ease: Pull targetCornerY UP towards zero continuously
        const easeProgress = Math.pow(progress, 1.4);
        targetCornerY = Math.max(0, 120 - (easeProgress * maxStretchUp));

        // Linear interpolation (Lerp) for identical elasticity
        currentCornerY += (targetCornerY - currentCornerY) * 0.08;

        // Algebraic constraint rigorously forcing the true lowest mathematical physical vertex  
        // of the quadratic completely to perpetually kiss the 120 y-floor at all translation offsets!
        const cpY = 240 - currentCornerY;

        // Path maps a solid box perfectly slicing UP vertically on the far edges 
        // to form extremely organic "horns" that lift to peel back the layout
        const pathData = `M 0 0 L 1000 0 L 1000 ${currentCornerY} Q 500 ${cpY}, 0 ${currentCornerY} Z`;
        bottomStretchPath.setAttribute("d", pathData);

        requestAnimationFrame(renderBottomStretch);
    }
    
    requestAnimationFrame(renderBottomStretch);
}

function initScrollStretch() {
    const stretchSection = document.getElementById('stretch-section');
    const stretchPath = document.getElementById('stretch-path');
    
    if (!stretchSection || !stretchPath) return;

    // Flip logic: we now anchor to the bottom of the SVG bounding box (y=400)
    // The curve rests completely flat at y=398 when compressed
    let currentHeight = 398;
    let targetHeight = 398;

    function renderStretch() {
        const rect = stretchSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Progress calculates how far the element has scrolled UP the screen
        let progress = (windowHeight - rect.top) / windowHeight;
        
        // Clamp progress
        progress = Math.max(0, Math.min(1.3, progress));

        // Reduced maximum pixel depth heavily by 50% per request to create a tighter shape
        const maxStretchUp = 115; 
        
        // Easing function for elastic scrolling physics
        const easeProgress = Math.pow(progress, 1.8);
        
        // Target height retracts UP from 398 smoothly
        targetHeight = 398 - (easeProgress * maxStretchUp);

        // Linear interpolation (Lerp)
        currentHeight += (targetHeight - currentHeight) * 0.08;

        // Apply mathematical vector path rendering for an UPWARD hump
        // Starts at bottom L 0 400, hugs the side up to L 0 398
        // Flat on edges to 50x, gracefully swoops UP to currentHeight, then back down
        const pathData = `M 0 400 L 0 398 L 50 398 C 250 398, 350 ${currentHeight}, 500 ${currentHeight} C 650 ${currentHeight}, 750 398, 950 398 L 1000 398 L 1000 400 Z`;
        stretchPath.setAttribute("d", pathData);

        // Request next frame recursively
        requestAnimationFrame(renderStretch);
    }
    
    // Kickstart the render loop
    requestAnimationFrame(renderStretch);
}

// =========================================
// WHAT WE DO: Auto-Slider Logic
// =========================================
let currentWwdTab = 0;
let wwdTimer = null;

function initWhatWeDoSlider() {
    const tabs = document.querySelectorAll('.wwd-tab');
    if (!tabs.length) return;
    startWwdTimer();
}

function startWwdTimer() {
    clearInterval(wwdTimer);
    // Auto advance every 5 seconds strictly tracking CSS animation
    wwdTimer = setInterval(() => {
        let nextTab = (currentWwdTab + 1) % 3;
        goToTab(nextTab);
    }, 5000);
}

function goToTab(index) {
    const tabs = document.querySelectorAll('.wwd-tab');
    const visuals = document.querySelectorAll('.wwd-visual-pane');
    if (!tabs.length || !visuals.length) return;

    // Reset all tabs structurally
    tabs.forEach(t => {
        t.classList.remove('active');
        // Force reflow to brutally reset the CSS animation timeline for the progress bar
        void t.offsetWidth;
    });
    visuals.forEach(v => v.classList.remove('active'));

    currentWwdTab = index;

    // Re-apply active which inherently restarts the 5s width transition
    tabs[currentWwdTab].classList.add('active');
    visuals[currentWwdTab].classList.add('active');

    // Reset interval timer safely
    startWwdTimer();
}

// =========================================
// MAGIC CURSOR PHYSICS
// =========================================
function initMagicCursor() {
    const cursor = document.querySelector('.magic-cursor');
    // Enforce mobile touch exclusions natively
    let isMobile = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.matchMedia("(pointer: coarse)").matches);

    if (!isMobile && cursor) {
        // Base coordinate vectors safely centered natively
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let cursorX = window.innerWidth / 2;
        let cursorY = window.innerHeight / 2;
        
        let velX = 0;
        let velY = 0;
        
        // Critically damped parameters explicitly mapping to 0 overshoot (bounce removed entirely)
        const stiffness = 0.35; 
        const damping = 0.45;   

        // Smooth rotation angle parameters natively mapped
        let currentAngle = 0;
        let targetAngle = 0;

        // Safely map native raw unthrottled coordinate bounds strictly
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        window.addEventListener('mousedown', () => cursor.classList.add('clicking'));
        window.addEventListener('mouseup', () => cursor.classList.remove('clicking'));

        function renderCursor() {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            
            velX += dx * stiffness;
            velY += dy * stiffness;

            velX *= damping;
            velY *= damping;

            cursorX += velX;
            cursorY += velY;

            // Absolute mathematical trajectory calculations dynamically rotating the layout vector
            const speed = Math.sqrt(velX * velX + velY * velY);
            if (speed > 0.5) {
                // Determine absolute required directional angle natively
                targetAngle = Math.atan2(velY, velX) * (180 / Math.PI) + 135;
            }

            // Shortest Path Angular Interpolation Logic preventing violent spinning near bounds
            let delta = targetAngle - currentAngle;
            // Native normalize mapping forcing the vector translation consistently into shortest physical direction continuously
            delta = ((delta % 360) + 540) % 360 - 180;
            
            // Linear geometric lerping ensuring gentle sweeping rotation completely natively without CSS
            currentAngle += delta * 0.15;

            // Dynamic translation injection heavily hardware accelerated strictly bypassing DOM reflow
            cursor.style.transform = `translate3d(${cursorX - 12}px, ${cursorY - 12}px, 0) rotate(${currentAngle}deg)`;

            requestAnimationFrame(renderCursor);
        }
        
        requestAnimationFrame(renderCursor);
    }
}

// =========================================
// INTERACTIVE 3D FAQ GRID
// =========================================
function initFAQCards() {
    const cards = document.querySelectorAll('.faq-card');
    
    cards.forEach(card => {
        const inner = card.querySelector('.faq-card-inner');
        let hoverActive = false;
        
        card.addEventListener('mouseenter', () => {
            if (card.classList.contains('flipped')) return;
            // Snaps interaction lock securely disabling flip-transition easing allowing high-speed native cursor mapping
            inner.style.transition = `transform 0.1s ease-out`;
            hoverActive = true;
        });

        card.addEventListener('mousemove', (e) => {
            if (!hoverActive || card.classList.contains('flipped')) return;

            const rect = card.getBoundingClientRect();
            
            // Map cursor boundary origin geometric vector purely natively
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Extrapolate bounding tilt depths cleanly securing exactly 12deg strict hardware bounds
            const rotateX = ((y - centerY) / centerY) * -12; 
            const rotateY = ((x - centerX) / centerX) * 12;

            inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            hoverActive = false;
            if (!card.classList.contains('flipped')) {
                // Restores core massive native transition executing purely back to strictly unmapped rest
                inner.style.transition = `transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)`;
                inner.style.transform = `rotateX(0deg) rotateY(0deg)`;
            }
        });

        card.addEventListener('click', () => {
            const isFlippingOpen = !card.classList.contains('flipped');
            
            if (isFlippingOpen) {
                // EXCLUSIVITY LOGIC: Forcefully un-flip all other active cards natively ensuring single continuous view
                cards.forEach(otherCard => {
                    if (otherCard !== card && otherCard.classList.contains('flipped')) {
                        otherCard.classList.remove('flipped');
                        const otherInner = otherCard.querySelector('.faq-card-inner');
                        otherInner.style.transition = `transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)`;
                        otherInner.style.transform = `rotateY(0deg) rotateX(0deg)`;
                    }
                });
            }

            // Restore absolute core smoothing exclusively overriding explicit layout maps for the primary heavy 180deg visual swap
            hoverActive = false;
            inner.style.transition = `transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)`;
            card.classList.toggle('flipped');
            
            if (card.classList.contains('flipped')) {
                inner.style.transform = `rotateY(180deg) rotateX(0deg)`;
            } else {
                inner.style.transform = `rotateY(0deg) rotateX(0deg)`;
            }
        });
    });
}

// =========================================
// MAGNETIC DOTTED RIPPLE GRID
// =========================================
class MagneticGrid {
    constructor() {
        this.canvas = document.getElementById('magneticGrid');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d', { alpha: true });
        this.box = document.querySelector('.journey-box');
        
        // Physics logic identically mapping referenced density offsets natively
        this.spacing = 28; // Spacing between individual dot coordinate geometries
        this.dotRadius = 1; // Extremely fine geometric bounds
        this.magneticRadius = 250; // The spherical radius sweep calculating displacement
        this.color = '#3b82f6'; // Deep corporate blue explicitly replacing lime reference
        
        this.nodes = [];
        this.mouse = { x: -1000, y: -1000, hover: false };
        
        this.init();
        this.bindEvents();
        this.animate();
    }
    
    init() {
        this.resize();
        // Hardware scale resize listening natively avoiding DOM reflow loop traps
        window.addEventListener('resize', () => {
            // Tiny throttle mapping resizing to save engine bounds
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => this.resize(), 100);
        });
    }
    
    resize() {
        const rect = this.box.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
        this.createNodes();
    }
    
    createNodes() {
        this.nodes = [];
        const cols = Math.floor(this.width / this.spacing) + 1;
        const rows = Math.floor(this.height / this.spacing) + 1;
        
        // Exact geometric centering pushing boundary limits flawlessly
        const offsetX = (this.width - ((cols - 1) * this.spacing)) / 2;
        const offsetY = (this.height - ((rows - 1) * this.spacing)) / 2;

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                this.nodes.push({
                    x: offsetX + i * this.spacing,
                    y: offsetY + j * this.spacing,
                    baseX: offsetX + i * this.spacing,
                    baseY: offsetY + j * this.spacing
                });
            }
        }
    }
    
    bindEvents() {
        this.box.addEventListener('mousemove', (e) => {
            const rect = this.box.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
            this.mouse.hover = true;
        });
        
        this.box.addEventListener('mouseleave', () => {
            this.mouse.hover = false;
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        this.ctx.fillStyle = this.color;
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = 1.2; 
        
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            
            if (this.mouse.hover) {
                const dx = this.mouse.x - node.baseX;
                const dy = this.mouse.y - node.baseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.magneticRadius) {
                    // Exponential push-off force mimicking native physical stretch
                    const force = (this.magneticRadius - distance) / this.magneticRadius;
                    const pullFactor = 12 * force; // Scaled down displacement depth explicitly
                    
                    const angle = Math.atan2(dy, dx);
                    
                    // Linear interpolate natively tracking absolute targeting strictly
                    const targetX = node.baseX + Math.cos(angle) * pullFactor;
                    const targetY = node.baseY + Math.sin(angle) * pullFactor;
                    
                    node.x += (targetX - node.x) * 0.2; // Easing structural velocity
                    node.y += (targetY - node.y) * 0.2;
                } else {
                    node.x += (node.baseX - node.x) * 0.1;
                    node.y += (node.baseY - node.y) * 0.1;
                }
            } else {
                node.x += (node.baseX - node.x) * 0.1;
                node.y += (node.baseY - node.y) * 0.1;
            }
            
            const dxDraw = node.x - node.baseX;
            const dyDraw = node.y - node.baseY;
            const displacement = Math.sqrt(dxDraw * dxDraw + dyDraw * dyDraw);
            
            // If displacement triggers physical structural length rendering morph explicitly
            if (displacement > 0.5) {
                this.ctx.beginPath();
                this.ctx.moveTo(node.baseX, node.baseY);
                this.ctx.lineTo(node.x, node.y);
                this.ctx.stroke();
            }

            // Draw displacement sphere firmly mounted specifically to the stretched tip offset natively
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, this.dotRadius + 0.5, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initializer execution locally
if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new MagneticGrid());
} else {
    new MagneticGrid();
}
