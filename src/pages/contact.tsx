import React from "react";

let isActive: Record<string, boolean>, setIsActive: Function;
function Contact() {
    [isActive, setIsActive] = React.useState({
        "First-name": false,
        "Last-name": false,
        "Email": false,
        "Message-subject": false,
        "message": false
    });
    const refOfInputs = {
        "First-name": React.useRef(null),
        "Last-name": React.useRef(null),
        "Email": React.useRef(null),
        "Message-subject": React.useRef(null),
        "message": React.useRef(null)      
    }

    const effectHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const thisName = (e.target as HTMLElement).getAttribute('name');
        if (thisName != null) {
            isActive[thisName] = true;
            setIsActive({...isActive})
        }
        else {
            let listToChange = Object.entries(refOfInputs);
            listToChange.map(([keys, values], Indx) => {
                //console.log(keys, typeof (values.current! as HTMLInputElement).value)
                if ((values.current! as HTMLInputElement).value === "") {
                    isActive[keys] = false;
                }
            })
            setIsActive({...isActive})
        }
    }
    return (
        <section id="contact-me" className="min-vh-100 pb-4 fading-in" onClick={(e)=>{effectHandler(e)}}>
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
                                <input type="text" className="form-control" name="First-name" ref={refOfInputs["First-name"]}/>
                                <label htmlFor="" className={isActive["First-name"] ? 'form-input-new' : 'form-input'}>First Name</label>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="input-block text-start">
                                <input type="text" className="form-control" name="Last-name" ref={refOfInputs["Last-name"]}/>
                                <label htmlFor="" className={isActive["Last-name"] ? 'form-input-new' : 'form-input'}>Last Name</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="input-block text-start">
                            <input type="text" className="form-control" name="Email"  ref={refOfInputs["Email"]}/>
                            <label htmlFor="" className={isActive["Email"] ? 'form-input-new' : 'form-input'}>Email</label>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="input-block text-start">
                            <input type="text" className="form-control" name="Message-subject" ref={refOfInputs["Message-subject"]}/>
                            <label htmlFor="" className={isActive["Message-subject"] ? 'form-input-new' : 'form-input'}>Message Subject</label>
                        </div>
                    </div>
                    <div className="col-sm-12 h-auto">
                        <div className="input-block textarea h-auto text-start" id="textarea">
                            <textarea rows={3} className="form-control" name="message"  ref={refOfInputs["message"]}></textarea>
                            <label htmlFor="" className={isActive["message"] ? 'form-input-new' : 'form-input'}>Drop your message here</label>
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

export default Contact