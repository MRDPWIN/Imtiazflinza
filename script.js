document.addEventListener("DOMContentLoaded", () => {
  // Moving background with particles
  const canvas = document.getElementById("background-canvas")
  const ctx = canvas.getContext("2d")

  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 2 + 0.5
      this.speedX = Math.random() * 0.5 - 0.25
      this.speedY = Math.random() * 0.5 - 0.25
      this.color = `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 255)}, ${Math.random() * 0.5 + 0.2})`
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY

      // Wrap around edges
      if (this.x < 0) this.x = canvas.width
      if (this.x > canvas.width) this.x = 0
      if (this.y < 0) this.y = canvas.height
      if (this.y > canvas.height) this.y = 0
    }

    draw() {
      ctx.fillStyle = this.color
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Create particles
  const particles = []
  const particleCount = 150

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw particles
    particles.forEach((particle) => {
      particle.update()
      particle.draw()
    })

    // Connect particles with lines if they're close enough
    connectParticles()

    requestAnimationFrame(animate)
  }

  function connectParticles() {
    const maxDistance = 100

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance) {
          // Calculate opacity based on distance
          const opacity = 1 - distance / maxDistance

          ctx.strokeStyle = `rgba(100, 150, 255, ${opacity * 0.2})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }
  }

  animate()

  // FAQ accordion functionality
  const faqQuestions = document.querySelectorAll(".faq-question")

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling
      const isActive = answer.classList.contains("active")

      // Close all answers
      document.querySelectorAll(".faq-answer").forEach((item) => {
        item.classList.remove("active")
      })

      // Toggle current answer
      if (!isActive) {
        answer.classList.add("active")
      }
    })
  })

  // Contact form submission
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
      // Here you would typically send the form data to a server
      alert("Thank you for your message! We'll get back to you soon.")
      contactForm.reset()
    })
  }
})

