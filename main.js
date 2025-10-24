document.addEventListener("DOMContentLoaded", () => {

    /*  Carousel  */
    const slides = document.querySelectorAll(".carousel-slide"); 
    const prevBtn = document.querySelector(".left-btn"); 
    const nextBtn = document.querySelector(".right-btn"); 
    let currentIndex = 0; 

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });
    }

    if (slides.length && prevBtn && nextBtn) {
        nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        });
        prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        });
        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }, 5000);
    }

    /*  فلترة الفعاليات بالفئات */
    const categoryButtons = document.querySelectorAll(".badge-category");
    const eventCards = document.querySelectorAll(".event-card");

    if(categoryButtons.length && eventCards.length){
        categoryButtons.forEach(button => {
            button.addEventListener("click", () => {
                const selectedCategory = button.dataset.value;
                eventCards.forEach(card => {
                    const cardCategory = card.dataset.category;
                    card.style.display = (cardCategory === selectedCategory || selectedCategory === "all") ? "block" : "none";
                });
            });
        });
    }

    /*  تمرير للفعالية عند وجود id في الرابط  */
    const params = new URLSearchParams(window.location.search);
    const eventId = params.get("id");
    if(eventId){
        const targetCard = document.getElementById(eventId);
        if(targetCard){
            targetCard.scrollIntoView({ behavior: "smooth", block: "start" });
            targetCard.style.border = "2px solid #007bff";
            targetCard.style.padding = "5px";
            targetCard.style.borderRadius = "10px";
        }
    }

    /*  عرض موقع الفعالية  */
    document.querySelectorAll('.show-location-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const imageDiv = btn.nextElementSibling;
            if(imageDiv) {
                imageDiv.style.display = (imageDiv.style.display === 'none' || imageDiv.style.display === '') ? 'block' : 'none';
            }
        });
    });

    /*  فتح المودال للتسجيل  */
    const modalForm = document.getElementById('modalForm');
    const modalElement = document.getElementById('dynamicModal');
    if(modalForm && modalElement){
        document.querySelectorAll(".open-modal-btn").forEach(button => {
            button.addEventListener("click", () => {
                document.getElementById('modalTitle').textContent = button.dataset.title;
                document.getElementById('modalCategory').textContent = button.dataset.category;
                document.getElementById('modalDate').textContent = button.dataset.date;
                document.getElementById('modalLocation').textContent = button.dataset.location;
                document.getElementById('modalTime').textContent = button.dataset.time;
                document.getElementById('modalImage').src = button.dataset.image;
            });
        });

        modalForm.addEventListener('submit', function(e){
            e.preventDefault();
            const title = document.getElementById('modalTitle').textContent;
            const category = document.getElementById('modalCategory').textContent;
            const date = document.getElementById('modalDate').textContent;
            const location = document.getElementById('modalLocation').textContent;
            const time = document.getElementById('modalTime').textContent;

            const name = document.getElementById('modalName').value.trim();
            const email = document.getElementById('modalEmail').value.trim();

            if(name === "" || email === ""){
                alert("⚠️ يرجى تعبئة جميع الحقول");
                return;
            }
            alert(`✅ تم التسجيل بنجاح!
الفعالية: ${title}
الفئة: ${category}
التاريخ: ${date}
المكان: ${location}
الوقت: ${time}
الاسم: ${name}
البريد الإلكتروني: ${email}`);

            modalForm.reset();
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance.hide();
        });
    }

    /*  نموذج الاتصال  */
    const contactForm = document.getElementById("contactForm");
    if(contactForm){
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");

        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            [nameInput, emailInput, messageInput].forEach(input => input.classList.remove("is-invalid"));
            let valid = true;

            if(nameInput.value.trim() === "") { nameInput.classList.add("is-invalid"); valid=false; }
            if(emailInput.value.trim() === "") { emailInput.classList.add("is-invalid"); valid=false; }
            if(messageInput.value.trim() === "") { messageInput.classList.add("is-invalid"); valid=false; }

            if(valid){
                alert("✅ تم إرسال الرسالة بنجاح!");
                contactForm.reset();
            }
        });
    }

    /*  فلترة حسب البحث  */
    const searchInput = document.getElementById("search");
    const categorySelect = document.getElementById("category");
    const locationSelect = document.getElementById("location");
    const dateInput = document.getElementById("date");
    const filterBtn = document.getElementById("filterBtn");

    if(filterBtn){
        filterBtn.addEventListener("click", () => {
            const searchText = searchInput.value.trim().toLowerCase();
            const selectedCategory = categorySelect.value.trim();
            const selectedLocation = locationSelect.value.trim();
            const selectedDate = dateInput.value.trim();

            document.querySelectorAll(".event-card").forEach(card => {
                const title = card.querySelector("h2").textContent.toLowerCase();
                const description = card.querySelector("p").textContent.toLowerCase();
                const category = card.dataset.category.trim();
                const location = card.dataset.location.trim();
                const date = card.dataset.date.trim();

                const matchesSearch = title.includes(searchText) || description.includes(searchText);
                const matchesCategory = selectedCategory === "" || category === selectedCategory;
                const matchesLocation = selectedLocation === "" || location === selectedLocation;
                const matchesDate = selectedDate === "" || date === selectedDate;

                if(matchesSearch && matchesCategory && matchesLocation && matchesDate){
                    card.parentElement.style.display = "block";
                } else {
                    card.parentElement.style.display = "none";
                }
            });
        });
    }

    /*تبديل اللغة*/
    const langAr = document.getElementById("lang-ar");
    const langEn = document.getElementById("lang-en");

    function setLanguage(lang){
        localStorage.setItem("language", lang);
        applyLanguage(lang);
    }

    function applyLanguage(lang){
        document.querySelectorAll("[data-ar]").forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });

        if(lang === "ar"){
            document.documentElement.dir = "rtl";
            document.documentElement.lang = "ar";
            document.body.style.textAlign = "right";
        } else {
            document.documentElement.dir = "ltr";
            document.documentElement.lang = "en";
            document.body.style.textAlign = "left";
        }
    }

    if(langAr) langAr.addEventListener("click", () => setLanguage("ar"));
    if(langEn) langEn.addEventListener("click", () => setLanguage("en"));

    const savedLang = localStorage.getItem("language") || "ar";
    applyLanguage(savedLang);

    /*Scroll-to-top button*/
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if(scrollTopBtn){
        window.onscroll = function(){
            if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
                scrollTopBtn.style.display = "block";
            } else {
                scrollTopBtn.style.display = "none";
            }
        };

        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /*Dark Mode*/
    const toggleBtn = document.querySelector('.dark-mode-btn');
    if(toggleBtn){
        const body = document.body;

        if(localStorage.getItem('darkMode') === 'enabled'){
            body.classList.add('dark-mode');
            toggleBtn.textContent = '☀️';
        } else {
            toggleBtn.textContent = '🌙';
        }

        toggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');

            if(body.classList.contains('dark-mode')){
                localStorage.setItem('darkMode', 'enabled');
                toggleBtn.textContent = '☀️';
            } else {
                localStorage.setItem('darkMode', 'disabled');
                toggleBtn.textContent = '🌙';
            }
        });
    }

    /*قائمة أعضاء الفريق   */
    const teamBtn = document.getElementById('teamBtn');
    const teamList = document.getElementById('teamList');

    if(teamBtn && teamList){
        teamBtn.addEventListener('click', () => {
            teamList.style.display = (teamList.style.display === 'block') ? 'none' : 'block';
            teamBtn.classList.toggle('active');
        });

        window.addEventListener('click', function(e){
            if(!teamBtn.contains(e.target) && !teamList.contains(e.target)){
                teamList.style.display = 'none';
                teamBtn.classList.remove('active');
            }
        });
    }

});
