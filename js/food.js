window.addEventListener('DOMContentLoaded', () => {


    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');


    function hideTabContent() {
       tabsContent.forEach(item => {
           item.classList.add('hide');
           item.classList.remove('show', 'fade');
 
       });
          tabs.forEach( item => {
              item.classList.remove('tabheader__item_active');
               
          });

       } 
       function showTabContent(i=0) {
           tabsContent[i].classList.add('show','fade');
           tabsContent[i].classList.remove('hide');
           tabs[i].classList.add('tabheader__item_active'); 
       } 
            
        hideTabContent();
        showTabContent()

        tabsParent.addEventListener ('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains ('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);

                }            
        
        });
    }

    });
//timer 

const deadline = '2021-09-07';
function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),

          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor(t / (1000 * 60 * 60) % 24),
          minutes = Math.floor(t / (1000 / 60) % 60),
          seconds = Math.floor((t / 1000) % 60);

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}
function getZero(num) {
    if (num>=0 && num < 10) {
        return `0${num}`;
    } else {
        return num
    } ;
}
     
    function setClock(selector, endtime) {
        const timer = document.querySelector('.timer'),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),  
              seconds = timer.querySelector('#seconds'), 
              timeInterval = setInterval(updateClock, 1000); 

            updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);
 
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds); 


            if (t.total <= 0) {
                clearInterval(timeInterval);
            }


        }
    
}
        setClock('timer', deadline);

        // Modal

        const modalTrigger = document.querySelectorAll('[data-modal]'),
              modal = document.querySelector('.modal');
              
        function openModal() {
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
            clearInterval(modalTimerId);
        };

        modalTrigger.forEach(btn => {

            btn.addEventListener('click', openModal)
                
    });
        
        function  closeModal() {
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
        
        
        

        modal.addEventListener('click', (e) => {  
        if(e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();

        }

        });

        document.addEventListener( 'keydown', (e) =>
        {
            if(e.code === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });

        const modalTimerId = setTimeout(openModal, 50000);

        function showModalByScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                openModal();
                window.removeEventListener('scroll', showModalByScroll);
           }
        }
        window.addEventListener('scroll', showModalByScroll);

    //  используем классы для карточек
    
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 73;
            this.changeToRub();
        }
        changeToRub() {
            this.price = this.price * this.transfer
        }
        render() {
            const element = document.createElement('div');
            if (this.classes.length===0) {
                this.classes = 'menu__item'; // изменения
                element.classList.add(this.classes); // изменения
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}></div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total">${this.price}</span> руб/день</div>
                        </div>
                    </div>
                    `;
                    this.parent.append(element);
        }
    }
    // getResource(' http://localhost:3000/menu')
    // .then(data => 
    //     { data.forEach(({img, altimg, title, descr, price}) =>{
    // new MenuCard(img, altimg, title, descr, price, ".menu .container").render();

// });
axios.get('http://localhost:3000/menu')
.then(data=> 
    { data.data.forEach(({img, altimg, title, descr, price}) =>{
     new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
    });
});
        async function getResource ( url) {
        let res =  await fetch(url);
         if (!res.ok) {
             throw new Error(`Could not fetch ${url}, status: ${res.status}`);

         }
        return await res.json();

    };   
    

    // слайдер

    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;


        // if (slides.length < 10) {
        //     total.textContent = `0${slides.length}`;

        // } else {
        //     total.textContent = slides.length; 
        // }

    
    let slideIndex = 1;
    let offset = 0;

    if (slides.length > 10) {
           total.textContent = `0${slides.length}`;
           current.textContent = `0${slideIndex}`;
    } else {
        

            total.textContent = slides.length;
            current.textContent = `0${slideIndex}`;
    };



    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach( slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';
  
    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');
    dots = [];

    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    
`;
slider.append(indicators);

for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent; 
        opacity: .5;
        transition: opacity .6s ease;
    `;

    if (i == 0) {
        dot.style.opacity = 1
    };
    indicators.append(dot);
    dots.push(dot);

    
};

  function deleteNotDigits(str) {
      return +str.replace(/\D/g, '')
  };


    next.addEventListener('click', () => {
        if  (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else { 

            offset += deleteNotDigits(width);

        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        }
        else {
            slideIndex++; 
        }
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
          
        } else 
        {
            current.textContent = slideIndex;
        }
       dots.forEach(dot => dot.style.opacity = '.5');
       dots[slideIndex - 1].style.opacity = 1;
      });

    prev.addEventListener('click', () => {
         if  (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        }
            else {
                offset -= deleteNotDigits(width);
            }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        }
        else {
            slideIndex --;
        }
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
          
        } else 
        {
            current.textContent = slideIndex;
        }
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
      });
      
      dots.forEach(dot => {
          dot.addEventListener('click', (e) => {
              const slideTo = e.target.getAttribute('data-slide-to');

              slideIndex = slideTo;
              offset = deleteNotDigits(width) * (slideTo - 1);
              slidesField.style.transform = `translateX(-${offset}px)`;
               
              if (slides.length < 10) {
                current.textContent = `0${slideIndex}`; 
              
            } else 
            {
                current.textContent = slideIndex;
            }
              dots.forEach(dot => dot.style.opacity = '.5');
              dots[slideIndex - 1].style.opacity = 1;
          });
      });
      

    // showSlides(slideIndex);

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1
    //     }
    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => item.style.display = 'none');
    //     slides[slideIndex - 1].style.display = 'block';
        
    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
 
    //     } else {
    //         current.textContent = slideIndex; 
    //     }

    //     };


    //    function plusSlides(n) {
    //        showSlides(slideIndex += n);
    //     }

    //     prev.addEventListener('click', () => {
    //     plusSlides(-1);
    
    //     });
       
    //     next.addEventListener('click', () => {
    //         plusSlides(1);
    //     });
       
    

    
         // Forms

            const forms = document.querySelectorAll('form');
            
            const message = {
                loading: 'img/forms/spinner.svg',
                success: 'Спасибо! это успех',
                failure: 'Попробуй снова',
            };
            forms.forEach(item => {
                bindPostData(item);

            });
             
            const postData =  async (url, data) => {
                let res =  await fetch(url, {
                method: 'POST', 
                headers: { 'Content-type' : 'application/json' },
                body: data
                });
                return await res.json();
            };


            function bindPostData(form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();

                    let statusMessage = document.createElement('img');
                    statusMessage.src = message.loading;
                    statusMessage.style.cssText = `
                    display: block; 
                    margin: 0 auto;
                    `
                 

                    const formData = new FormData(form);
                     
                    const json = JSON.stringify(Object.fromEntries(formData.entries()));
                    
                    form.insertAdjacentElement('afterend', statusMessage); 


                        postData('http://localhost:3000/requests', json)
                    .then(data=> {
                        console.log(data);
                        showThanksModal(message.success);
                        statusMessage.remove();
                        
                    }).catch(() => {
                        showThanksModal(message.failure);
                    }).finally(()=> {
                        form.reset();
                    });

        

            function showThanksModal(message)
         {
                const prevModalDialog = document.querySelector('.modal__dialog');
                prevModalDialog.classList.add('hide');
                openModal();
                 
                const thanksModal = document.createElement('div');
                thanksModal.classList.add('modal__dialog');
                thanksModal.innerHTML = `
                <div class = "modal__content">
                <div class = "modal__close" data-close>×</div>
                <div class = "modal__title">${message}</div>
                </div>`;

            document.querySelector('.modal').append(thanksModal);
            setTimeout(() => 
            { thanksModal.remove();
                prevModalDialog.classList.add('show');
                prevModalDialog.classList.remove('hide');
                closeModal();
                
            }, 4000);
        }
        }); 
    }
    
});
