/**
* Template Name: Arsha - v4.10.0
* Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

// Drag and drop - single or multiple image files
// https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
// https://codepen.io/joezimjs/pen/yPWQbd?editors=1000


  function addDocumentx () {
    // count the child nodes
    parent = document.getElementById("document-uploader")
    const thisID = document.getElementById("document-uploader").childElementCount + 1;
    console.log('prior count' + thisID.toString())
    // create fieldset
    fieldSet = document.createElement('fieldset')
    fieldSet.id = 'fieldSet_' + thisID.toString()
    fieldSet.setAttribute('class',"upload_dropZone text-center mb-3 p-4")

    // create legend
    legend = document.createElement('fieldset')
    legend.setAttribute('class',"visually-hidden")
    legend.innerHTML = 'Document Uploader'
    fieldSet.appendChild(legend)

    // create svg

    svg = document.createElement('svg')
    svg.setAttribute('class',"upload_svg")
    svg.setAttribute('width',"60")
    svg.setAttribute('height',"60")
    svg.setAttribute('aria-hidden',"true")

    // create use
    useEl = document.createElement('use')
    useEl.setAttribute('href', '#icon-imageUpload')

    svg.appendChild(useEl)
    fieldSet.appendChild(svg)

    // create div drag and drop
    dnd = document.createElement('div')
    dnd.setAttribute('class',"small my-2")
    dnd.innerHTML = 'Drag &amp; Drop document inside dashed region<br><i>or</i>'

    fieldSet.appendChild(dnd)

    // create input
    uploadinput = document.createElement('input')
    uploadinput.id = 'upload_document_' + thisID.toString()
    uploadinput.setAttribute('data-post-name', "image_logo")
    //uploadinput.setAttribute('data-post-url', "https://harvesting.ninja/smart_agent_file_drop")
    uploadinput.setAttribute('class', "position-absolute invisible")
    uploadinput.setAttribute('type', "file")
    uploadinput.setAttribute('accept', "image/jpeg, image/png, image/svg+xml")
    fieldSet.appendChild(uploadinput)
    // create label
    uploadLabel = uploadinput = document.createElement('label')
    uploadLabel.setAttribute('class', "btn btn-upload mb-3")
    uploadLabel.setAttribute('for', 'upload_document_' + thisID.toString())
    uploadLabel.innerHTML = 'Choose file(s)'
    fieldSet.appendChild(uploadLabel)

    // create upload line
    wrapper = document.createElement('div')
    wrapper.setAttribute('class', "upload_gallery d-flex flex-wrap justify-content-center gap-3 mb-0")
    fieldSet.appendChild(wrapper)

    delbutt = document.createElement('button')
    delbutt.id = 'delete_button_' + thisID.toString()
    delbutt.setAttribute('class', "col-sm btn btn-secondary")
    delbutt.type = 'button'
    delbutt.setAttribute('onclick', "deleteDocument("+thisID.toString()+")")
    delbutt.innerHTML = 'Delete Document'
    fieldSet.appendChild(delbutt)

    parent.appendChild(fieldSet)

    /*
    <fieldset class="upload_dropZone text-center mb-3 p-4">

      <legend class="visually-hidden">Document Uploader</legend>

      <svg class="upload_svg" width="60" height="60" aria-hidden="true">
        <use href="#icon-imageUpload"></use>
      </svg>

      <div class="small my-2">Drag &amp; Drop document #2 inside dashed region<br><i>or</i></div>

      <input id="upload_document_1" data-post-name="image_logo" data-post-url="https://someplace.com/image/uploads/logos/" class="position-absolute invisible" type="file" multiple accept="image/jpeg, image/png, image/svg+xml" />
      <label class="btn btn-upload mb-3" for="upload_image_logo">Choose file(s)</label>

      <div class="upload_gallery d-flex flex-wrap justify-content-center gap-3 mb-0"></div>
      <button id="delete_button_1" type="button" class="col-sm btn btn-secondary" onclick="deleteButton(1)">Delete</button>

    </fieldset>
    */

  }

  function deleteDocument(thisID){
    console.log(thisID)
    // delete the element
    thisEl = document.getElementById('fieldSet_' + thisID.toString())
    thisEl.remove()
    // check if it's document #1
    // then delete and recreate
    if (thisID.toString() === '1') {
      addDocument()
    }
  }

(function() {
  "use strict";

  // Four objects of interest: drop zones, input elements, gallery elements, and the files.
  // dataRefs = {files: [image files], input: element ref, gallery: element ref}


  const preventDefaults = event => {
    event.preventDefault();
    event.stopPropagation();

  };

  const highlight = event =>
    event.target.classList.add('highlight');

  const unhighlight = event =>
    event.target.classList.remove('highlight');

  const getInputAndGalleryRefs = element => {
    const zone = element.closest('.upload_dropZone') || false;
    const gallery = zone.querySelector('.upload_gallery') || false;
    const input = zone.querySelector('input[type="file"]') || false;
    return {input: input, gallery: gallery};
  }

  const handleDrop = event => {
    const dataRefs = getInputAndGalleryRefs(event.target);
    console.log('handle drop: ' + dataRefs.input.getAttribute('data-post-url'))
    dataRefs.files = event.dataTransfer.files;
    handleFiles(dataRefs);
  }


  const eventHandlers = zone => {

    const dataRefs = getInputAndGalleryRefs(zone);
    if (!dataRefs.input) return;

    // Prevent default drag behaviors
    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
      zone.addEventListener(event, preventDefaults, false);
      document.body.addEventListener(event, preventDefaults, false);
    });

    // Highlighting drop area when item is dragged over it
    ;['dragenter', 'dragover'].forEach(event => {
      zone.addEventListener(event, highlight, false);
    });
    ;['dragleave', 'drop'].forEach(event => {
      zone.addEventListener(event, unhighlight, false);
    });

    // Handle dropped files
    zone.addEventListener('drop', handleDrop, false);

    // Handle browse selected files
    dataRefs.input.addEventListener('change', event => {
      dataRefs.files = event.target.files;
      handleFiles(dataRefs);
    }, false);

  }


  // Initialise ALL dropzones
  const dropZones = document.querySelectorAll('.upload_dropZone');
  for (const zone of dropZones) {
    eventHandlers(zone);
  }


  // No 'image/gif' or PDF or webp allowed here, but it's up to your use case.
  // Double checks the input "accept" attribute
  const isImageFile = file =>
    ['image/jpeg', 'image/png', 'image/svg+xml',
    'application/pdf', 'text/plain'].includes(file.type);


  function previewFiles(dataRefs) {
    if (!dataRefs.gallery) return;
    for (const file of dataRefs.files) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function() {
        let img = document.createElement('img');
        img.className = 'upload_img mt-2';
        img.setAttribute('alt', file.name);
        img.src = reader.result;
        dataRefs.gallery.appendChild(img);
      }
    }
  }

  // Based on: https://flaviocopes.com/how-to-upload-files-fetch/
  const imageUpload = dataRefs => {

    // Multiple source routes, so double check validity
    if (!dataRefs.files || !dataRefs.input) return;

    const url = dataRefs.input.getAttribute('data-post-url');
    if (!url) return;
    console.log(url)
    const name = dataRefs.input.getAttribute('data-post-name');
    if (!name) return;

    const formData = new FormData();
    //formData.append(name, dataRefs.files);

    fetch(url, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log('posted: ', data);
      if (data.success === true) {
        previewFiles(dataRefs);
      } else {
        console.log('URL: '+ url + '  name: ' + name)
      }
    })
    .catch(error => {

      console.log(error);
    });
  }


  // Handle both selected and dropped files
  const handleFiles = dataRefs => {

    let files = [...dataRefs.files];

    // Remove unaccepted file types
    files = files.filter(item => {
      if (!isImageFile(item)) {
        console.log('Not an image, ', item.type);
      }
      return isImageFile(item) ? item : null;
    });

    if (!files.length) return;
    dataRefs.files = files;

    previewFiles(dataRefs);
    imageUpload(dataRefs);
  }


  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate  glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });


})()
