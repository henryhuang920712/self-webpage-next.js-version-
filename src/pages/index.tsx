import React from 'react';
import Image from 'next/image'
import Selfie from '../pages/asset/selfie.jpg'
import Cards from './cards'
import Carousel from './carousel'
import Calendar from './calendar'
import Contact from './contact'
import clientPromise from "../lib/mongodb";


const Fader = (sections: NodeListOf<HTMLElement>) => {
  sections.forEach((section) => {
    var elementPosition = section.offsetTop;
    // Get the position of the element relative to the top of the page
    // If the element is within the viewport, add the "fade-in" class
    if (elementPosition - window.scrollY < window.innerHeight) {
      section.classList.add('show');
    }
  })
}

// async function getCourse(s: string) {
//   let response = await fetch(`http://localhost:3000/api/posts?sem=${s}`);
//   let posts = await response.json();
//   //console.log(posts);
//   return posts;
// }

export async function getServerSideProps() {
  try {
    let everyCourse = {} as Record<string, any>;
    let semes = ['110-2', '111-1', '111-2'];

    await Promise.all(  // 複數個api要用這個
      semes.map(async (s) => {
        let response = await fetch(`http://localhost:3000/api/posts?sem=${s}`);
        let posts = await response.json();
        everyCourse[s] = JSON.parse(JSON.stringify(posts));
      }
      )
    )
    return {
      props: { 'everyCourse': everyCourse },
    };
  } catch (e) {
    console.error(e);
  }
}

function Navbar() {
  return (
    <header>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" id="nav1">
          <div className="container-fluid">
            <a className="navbar-brand js-scroll-trigger ms-3" href="#page-top">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                className="bi bi-moon-stars-fill" viewBox="0 0 16 16">
                <path
                  d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
                <path
                  d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
              </svg>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item text-uppercase">
                  <a className="nav-link js-scroll-trigger active" aria-current="page" href="#intro">Home</a>
                </li>
                <li className="nav-item text-uppercase">
                  <a className="nav-link js-scroll-trigger" href="#about">About</a>
                </li>
                <li className="nav-item text-uppercase">
                  <a className="nav-link js-scroll-trigger" href="#skills">Skills</a>
                </li>
                <li className="nav-item text-uppercase">
                  <a className="nav-link js-scroll-trigger" href="#carousel">Gallery</a>
                </li>
                <li className="nav-item text-uppercase">
                  <a className="nav-link js-scroll-trigger" href="#calendar">Calendar</a>
                </li>
                <li className="nav-item text-uppercase">
                  <a className="nav-link js-scroll-trigger" href="#contact-me">Contact</a>
                </li>
              </ul>

              <a href="https://www.facebook.com/profile.php?id=100010810968963" target="_blank"
                className="fa fa-facebook ms-5 me-4"></a>
              <a href="https://www.instagram.com/professor.henry.huang/" target="_blank" className="fa fa-instagram me-5"></a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

function Intro() {
  return (
    <section id="intro" className="min-vh-100 pt-5 fading-in" >
      <div className="container d-flex align-items-center pt-5 mt-5">
        <div className="row">
          <div className="col-lg-8" id="intro-text">
            <h6 className="text-uppercase">NTU-Accounting</h6>
            <h1>I'm Henry Huang</h1>
            <p className="lead">Welcome to my personal webpage.</p>
            <a className="btn text-uppercase" href="#contact-me">
              contact me
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                <path fillRule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                <path fillRule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="min-vh-100 pt-5 pb-5 fading-in" >
      <div className='container pt-3 pb-3'>
        <div className='row'>
          <div className='col-md-4 text-center' id="profile">
            <Image src={Selfie} className="img-thumbnail h-90 me-5" alt="Selfie" />
          </div>
          <div className='col-md-8 text-start'>
            <h6 className="font-weight-bold text-uppercase">ABOUT ME</h6>
            <h3>An NTU student with accounting major.</h3>
            <p>My name is Henry Huang, and I’m now a sophomore in National
              Taiwan University (NTU) with a major in Accounting. Scoring A
              and A plus with massive interest in accounting courses, I also
              cultivate another specialty in programming while receiving the
              same training with students from the Department of Information
              Management.</p>

            <p>Possessing a liberal mind, I integrate myself into different
              cultures by learning Japanese and German. Also with the enthusiasm
              of enhancing my communication skills, I’ve given lectures in
              front of junior high students in either language schools or
              volunteer programs from NPOs. In conclusion, my open-mindedness
              and dedication to learning new languages and improving my
              communication skills have allowed me to fully immerse myself
              in different cultures and engage with diverse communities.</p>

            <div id="about-info">
              <div className="row pb-3">
                <div className="col-md-2 lead text-wrap">Name:</div>
                <div className="col-md-4 text-wrap">Henry Huang</div>
                <div className="col-md-2 lead text-wrap">Date of Birth:</div>
                <div className="col-md-4 text-wrap">Jul 12, 2003</div>
              </div>
              <div className="row pb-3">
                <div className="col-md-2 lead text-wrap">From:</div>
                <div className="col-md-4 text-wrap">Taichung, Taiwan</div>
                <div className="col-md-2 lead text-wrap">Age:</div>
                <div className="col-md-4 text-wrap">19</div>
              </div>
              <div className="row pb-3">
                <div className="col-md-2 lead text-wrap">E-mail:</div>
                <div className="col-md-4 text-wrap text-break">henryhuang920712@gmail.com</div>
                <div className="col-md-2 lead text-wrap">Phone:</div>
                <div className="col-md-4 text-wrap">0900-787-563</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="bg-light min-vh-100 pb-5 fading-in" >
      <div className="container pt-5">
        <div className="row text-center pt-3 pb-5">
          <h6 className="font-weight-bold text-uppercase">skills</h6>
          <h3 className="text-center">My skills</h3>
        </div>
        <Cards />
      </div>
    </section>
  )
}


function ContactMe() {
  return (
    <section id="contact-me" className="min-vh-100 pb-4 fading-in" >
      <div className="container-fluid ps-0 pe-0">
        <div className="bg-white pt-5">
          <div className="row font-weight-bold text-uppercase text-center">
            <h6>Contact me</h6>
          </div>

          <div className="row text-center">
            <h3>Make a Contact</h3>
          </div>
        </div>
        <form action="" method="POST" className="contact-form">
          <div className="row">
            <div className="col-sm-6">
              <div className="input-block text-start">
                <input type="text" className="form-control" name="First-name" />
                <label htmlFor="" className="form-input">First Name</label>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="input-block text-start">
                <input type="text" className="form-control" name="Last-name" />
                <label htmlFor="" className="form-input">Last Name</label>
              </div>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="input-block text-start">
              <input type="text" className="form-control" name="Email" />
              <label htmlFor="" className="form-input">Email</label>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="input-block text-start">
              <input type="text" className="form-control" name="Message-subject" />
              <label htmlFor="" className="form-input">Message Subject</label>
            </div>
          </div>
          <div className="col-sm-12 h-auto">
            <div className="input-block textarea h-auto text-start" id="textarea">
              <textarea rows={3} className="form-control" name="message"></textarea>
              <label htmlFor="" className="form-input">Drop your message here</label>
            </div>
          </div>
          <div className="col-sm-12">
            <button className="square-button" data-bs-toggle="modal" data-bs-target="#alerting-modal">
              <h3 className="pb-0 mb-0">Send</h3>
            </button>
          </div>
        </form>


        {/* modal body */}
        <div className="modal fade" id="alerting-modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Check it again</h5>
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
              </div>
              <div className="modal-footer text-uppercase">
                <button type="button" className="btn btn-sm" data-bs-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-sm" onClick={() => { window.location.reload }}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Output({ everyCourse }) {
  React.useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('.fading-in');
    window.addEventListener('scroll', () => {
      Fader(sections);
    })
  }, [])
  return (
    <>
      <Navbar />
      <div data-bs-spy="scroll" data-bs-target="#nav1">
        <Intro />
        <About />
        <Skills />
        <Carousel />
        <Calendar schedules={everyCourse} />
        <Contact />
      </div>
    </>
  )
}



