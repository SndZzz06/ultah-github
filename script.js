document.addEventListener('DOMContentLoaded', () => {

    // =========================
    // ELEMENT
    // =========================
    const scrollBtn = document.getElementById('scroll-down');
    const dateSection = document.getElementById('date-calculator');
    const bgm = document.getElementById('bgm');

    const calcDateBtn = document.getElementById('calc-date-btn');
    const dateInput = document.getElementById('anniversary-date');
    const dateResult = document.getElementById('date-result');
    const daysCount = document.getElementById('days-count');

    const surpriseBtn = document.getElementById('surprise-btn');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close-modal');

    // =========================
    // TOMBOL LIHAT KEJUTAN
    // =========================
    scrollBtn.addEventListener('click', () => {

        dateSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        bgm.volume = 0.4;

        bgm.play().catch(() => {});

    });

    // =========================
    // ANIMASI CARD
    // =========================
    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll('.gallery-card,.message-box,.surprise-box,.date-container')
        .forEach(card => {

            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'all .8s ease-out';

            observer.observe(card);

        });

    // =========================
    // CONFETTI
    // =========================
    function fireConfetti() {

        confetti({
            particleCount:180,
            spread:120,
            origin:{y:0.6}
        });

        setTimeout(()=>{

            confetti({
                particleCount:120,
                angle:60,
                spread:70,
                origin:{x:0}
            });

            confetti({
                particleCount:120,
                angle:120,
                spread:70,
                origin:{x:1}
            });

        },400);

    }

    // =========================
    // FLOWER EFFECT
    // =========================
    function showFlowers(){

        const flowers=["🌸","🌹","🌺","🌷","💐"];

        for(let i=0;i<12;i++){

            const flower=document.createElement("div");

            flower.className="flower";

            flower.innerHTML=flowers[Math.floor(Math.random()*flowers.length)];

            if(i<6){

                flower.style.left=(20+Math.random()*160)+"px";

            }else{

                flower.style.right=(20+Math.random()*160)+"px";

            }

            flower.style.top=(80+Math.random()*(window.innerHeight-180))+"px";

            document.body.appendChild(flower);

            setTimeout(()=>{

                flower.remove();

            },3000);

        }

    }

    // =========================
    // HITUNG HARI
    // =========================
    calcDateBtn.addEventListener('click',()=>{

        if(!dateInput.value){

            alert("Pilih tanggal lahirmu dulu ya sayang ❤️");
            return;

        }

        const startDate=new Date(dateInput.value);
        const today=new Date();

        const daysDiff=Math.floor(
            (today-startDate)/(1000*60*60*24)
        );

        if(daysDiff<0){

            alert("Tanggalnya tidak boleh di masa depan dong 🤭");
            return;

        }

        dateResult.classList.remove("hidden");
        dateResult.style.height="auto";

        let currentCount=0;

        const duration=2000;

        const increment=Math.max(
            1,
            Math.floor(daysDiff/(duration/16))
        );

        const counter=setInterval(()=>{

            currentCount+=increment;

            if(currentCount>=daysDiff){

                currentCount=daysDiff;

                clearInterval(counter);

                const clap=new Audio("audio/clap.mp3");

                clap.play().catch(()=>{});

                fireConfetti();

            }

            daysCount.textContent=currentCount.toLocaleString("id-ID");

        },16);

    });

    // =========================
    // MODAL
    // =========================
    surpriseBtn.addEventListener('click',()=>{

        modal.classList.add("show");

        fireConfetti();

        showFlowers();

    });
    surpriseBtn.addEventListener("click",()=>{

    modal.classList.add("show");

    fireConfetti();

    createPetals();

});

    function createPetals(){

    const petals=["🌸","🌺","🌹"];

    for(let i=0;i<50;i++){

        const petal=document.createElement("div");

        petal.className="petal";

        petal.innerHTML=petals[Math.floor(Math.random()*petals.length)];

        petal.style.left=Math.random()*100+"vw";

        petal.style.animationDuration=
        (4+Math.random()*4)+"s";

        petal.style.fontSize=
        (18+Math.random()*18)+"px";

        document.body.appendChild(petal);

        setTimeout(()=>{
            petal.remove();
        },8000);

    }

}

    closeModal.addEventListener('click',()=>{

        modal.classList.remove("show");

    });

    window.addEventListener('click',(e)=>{

        if(e.target===modal){

            modal.classList.remove("show");

        }

    });

});