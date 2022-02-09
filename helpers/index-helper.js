let toggle = document.querySelector('#header .toggle-button')
let collapse = document.querySelectorAll('#header .collapse')
let grid = document.querySelector('#posts .grid')



toggle.addEventListener('click',function(){
  console.log(collapse)
  collapse.forEach(col =>col.classList.toggle('collapse-toggle'))
})
// console.log(toggle)
// console.log(collapse)
// console.log(document)


// with masonry
new Masonry(grid,{
  itemSelector: '.grid-item', //Specifies which child elements will be used as item elements in the layout.
  gutter:20  //Adds horizontal space between item elements.
})


//swiper library initialization
const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  slidesPerView:5,
  autoplay:{
    delay:3000
  },
  //responsive brakepoints
  breakpoints:{
    '@0':{
      slidesPerView:2
    },
    //888px
    '@1.00':{
      slidesPerView:3
    },
    //1110px
    '@1.25':{
      slidesPerView:4
    },
     //1330px
    '@1.50':{
      slidesPerView:5
    }
  }
  // // If we need pagination
  // pagination: {
  //   el: '.swiper-pagination',
  // },

  // // Navigation arrows
  // navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // },

  // // And if we need scrollbar
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  // },
});


//Sticky Navigation

window.onscroll = function(){
  myFunction()
}

//get the current value
let navbar = document.querySelector("#header")

//get the navbar position
let sticky = navbar.offsetTop

//sticky function
function myFunction(){
  if(window.pageYOffset >= sticky){
    navbar.classList.add("sticky")
  }else{
    navbar.classList.remove("sticky")
  }
}
