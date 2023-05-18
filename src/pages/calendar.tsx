import React from 'react';
import { JsxElement, idText } from 'typescript';



interface DataRef {
    status: string;
    course: string;
    classroom: string;
    inputLoc1: React.MutableRefObject<any>;
    inputLoc2: React.MutableRefObject<any>;
}

const bgImgThemes = ["sports", "learning", "friends"];
const semesters = ['110-2', '111-1', '111-2'];
let initCalendar = {} as any;
let nowCalendar = {} as any;
semesters.map((nowSem) => {
    let nowArr = new Array;
    for (let i = 0; i < 11; i++) {
        let tempArr = new Array(5);
        nowArr.push(tempArr);
    }
    nowCalendar[nowSem] = nowArr;
})


const weeks = { 'Mon': 0, "Tue": 1, "Wed": 2, "Thu": 3, "Fri": 4 };
const weeks_ = Object.keys(weeks);

const ContentInit = (allSchedules: any) => {
    semesters.map((nowSem) => {
        let nowCal = new Array;
        for (let i = 0; i < 11; i++) {
            let tempArray = new Array(5);
            for (let j = 0; j < 5; j++) {
                tempArray[j] = {
                    'course': '',
                    "classroom": '',
                };
            }
            nowCal.push(tempArray);
        }

        (allSchedules[nowSem]).forEach((sche: any) => {
            //console.log(sche['time']);
            let weekday;
            let numS: any;
            for ([weekday, numS] of Object.entries(sche['time'])) {
                numS.map((nowNum: any) => {
                    let nowWeek = parseInt(weeks[weekday], 10);
                    let num = parseInt(nowNum, 10);
                    nowCal[num][nowWeek]['course'] = sche['course'];
                    nowCal[num][nowWeek]['classroom'] = sche['classroom'];

                })
            }
        })
        //console.log(nowCal);

        initCalendar[nowSem] = nowCal;
    })
    //initCalendar['111-2'][0][3] = Object.create(ref);
}

let TableEle = ({ indx }: Record<string, string>) => {
    //nowSchedule = React.useContext(userContext);
    let temp = indx.split("-");
    let nowSem = `${temp[0]}-${temp[1]}`;
    let nowN = parseInt(temp[2], 10);
    let nowW = parseInt(temp[3], 10);
    // hooks could only be used inside function components 

    //console.log(initCalendar[nowSem][nowN][nowW]['course']);

    //React.useContext(mySchedules)


    let [isClicked, setIsClicked] = React.useState({
        status: 'init',
        classroom: initCalendar[nowSem][nowN][nowW]['classroom'],
        course: initCalendar[nowSem][nowN][nowW]['course'],
        inputLoc1: React.useRef(null),
        inputLoc2: React.useRef(null)
    });
    nowCalendar[nowSem][nowN][nowW] = [isClicked, setIsClicked];

    //console.log(isClicked);
    let [inputChange1, setInputChange1] = React.useState('');
    let [inputChange2, setInputChange2] = React.useState('');

    let handleIsClicked = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (isClicked.status === "clicked") {
            return;
        }
        isClicked.status = "clicked";
        setIsClicked({ ...isClicked });
    }

    let ContentChange = () => {
        let nowState = isClicked.status;
        let nowCourse = isClicked.course;
        let nowClassroom = isClicked.classroom;
        let nowInput1 = isClicked.inputLoc1;
        let nowInput2 = isClicked.inputLoc2;

        switch (nowState) {
            case ('none'): {
                return (
                    <React.Fragment key={`${indx}-content-none`}>
                    </React.Fragment>)
            }
            case ('init'): {
                //console.log(nowCourse);
                return (
                    <React.Fragment key={`${indx}-content-init`}>
                        <div className="table-text course-text">{nowCourse}</div>
                        <div className="table-text classroom-text">{nowClassroom}</div>
                    </React.Fragment>
                )
            }
            case ('clicked'): {
                return (<React.Fragment key={`${indx}-content-clicked`}>
                    <div className="input-group input-group-sm mb-3 mw-100 d-flex flex-column align-items-center"><button className="btn btn-outline-secondary dropdown-toggle table-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">courses</button>
                        <ul className="dropdown-menu">
                            <li>
                                <a className="dropdown-item">Add items</a>
                            </li>
                        </ul>
                        <input type="text" className="form-control w-100 course-input" aria-label="Text input with dropdown button" defaultValue={inputChange1} ref={nowInput1} />
                    </div >
                    <div className="input-group input-group-sm mb-3 mw-100 d-flex flex-column align-items-center"><button className="btn btn-outline-secondary dropdown-toggle table-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">classrooms</button>
                        <ul className="dropdown-menu"><li><a className="dropdown-item">Add items</a></li>
                        </ul>
                        <input type="text" className="form-control w-100 classroom-input" aria-label="Text input with dropdown button" defaultValue={inputChange2} ref={nowInput2} />
                    </div>
                </React.Fragment>)
            }
            case ('haveClicked'): {
                if (isClicked.inputLoc1.current != null) {
                    isClicked.course = isClicked.inputLoc1.current.value;
                    React.useEffect(() => { setInputChange1(isClicked.course) });
                }
                if (isClicked.inputLoc2.current != null) {
                    isClicked.classroom = isClicked.inputLoc2.current.value;
                    React.useEffect(() => { setInputChange2(isClicked.classroom) });
                }
                return (
                    <React.Fragment key={`${indx}-content-haveclicked`}>
                        <div className="table-text course-text">{isClicked.course}</div>
                        <div className="table-text classroom-text">{isClicked.classroom}</div>
                    </React.Fragment>
                )
            }
        }
        return (
            <React.Fragment key={`${indx}-final-content`}>
            </React.Fragment>
        )
    }
    return (
        <td className="mw-20" onClick={handleIsClicked} key={`${indx}-td`} id={`${indx}-td`}>
            <ContentChange />
        </td>
    )
}

let TableEles = ({ num, subnum }: Record<string, string>) => {
    let tableEleContainer = [];
    for (let i = 0; i < 5; i++) {
        tableEleContainer.push(<TableEle indx={`${num}-${subnum}-${i}`} key={`${num}-${i}-table-ele`} />);
    }
    return (
        <React.Fragment key={`table-eles-of-${num}`}>
            {tableEleContainer}
        </React.Fragment>
    );
};

let MyTable = ({ semester }: any) => {
    const weekDays = ['#', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    let bodyPart = [];

    for (let i = 0; i <= 10; i++) {
        bodyPart.push(
            <tr className="mw-100" key={`tr-${semester}-${i}`}>
                <th scope="row">{i}</th>
                <TableEles num={semester} subnum={`${i}`} />
            </tr>
        )
    }
    return (
        <table className="table text-center" id={`table-${semester}`} style={{ tableLayout: `fixed`, width: `100%` }} key={`table-${semester}`}>
            <thead>
                <tr>
                    {weekDays.map((w, Indx) => {
                        return (
                            <th scope="col" key={`th-${semester}-${Indx}`}>{w}</th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {bodyPart}
            </tbody>
        </table>
    )
}

interface DataOutside {
    status: boolean;
    repos: any;
}

let ModelBody = ({ semester }: any) => {
    let clickOnChange = () => {
        // let outCalendar = [];
        nowCalendar[semester].map((nowRow, nowN) => {
            nowRow.map((nowCell, nowW) => {
                if (nowCell[0].status === "clicked") {
                    nowCell[0].status = 'haveClicked';
                    nowCell[1]({ ...nowCell[0] });
                }


                // const found = outCalendar.find((ele) => {
                //     ele['course'] === nowCell[0].course;
                // })

                // const nowWeek = weeks_[nowW];
                // if (found === undefined) {
                //     outCalendar.push({
                //         'course': nowCell[0].course,
                //         'classroom': nowCell[0].classroom,
                //     })
                // } else {
                //     if (nowWeek in found['time']) {
                //         found['time'][nowWeek].push(nowN);
                //     } else {
                //         found['time'][nowWeek] = [nowN];
                //     }
                // }
            })
        })
        //const parsedContent = JSON.parse(outCalendar);

        // Send a POST request to the API with the collection name and new content
        // const response = await fetch(`http://localhost:3000/api/editPost?sem=${semester}`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ semester, content: parsedContent }),
        // });

        // // Get the response data
        // const data = await response.json();

        // // Display the response message
        // alert(data.message);

    }

    let init: DataOutside = {
        status: true,
        repos: null
    }
    let [isLoading, setIsLoading] = React.useState() as [DataOutside, React.Dispatch<React.SetStateAction<DataOutside>>];

    return (
        <div className="modal fade bd-example-modal-xl" id={`schedule-${semester}`} tabIndex={-1} role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true" key={`schedule-${semester}`}>
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-uppercase" id={`${semester}-model-header`}>{`Semester ${semester}`}</h5>
                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row fst-6 fst-italic">Click on the table to edit &darr;</div>
                            {/* <MyTable semester={semester} /> */}
                            <MyTable semester={semester}></MyTable>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-sm close-modal" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-sm save-changes" onClick={clickOnChange}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

let Model = ({ semester, imgTheme }: any) => {
    return (
        <div className="col-md-4 col-sm-6 col-lg-4 mb-5" key={`model-${semester}`}>
            <figure className="snip1401 position-relative">
                <img className="position-absolute" src={`https://source.unsplash.com/random?${imgTheme}`} alt="" />
                <div className="img-back position-absolute">
                    <div className="triangle-left position-absolute">
                    </div>
                    <div className=" rectangle position-absolute text-center pt-5 ps-3">
                        <p className="lead text-wrap mt-5 mb-1 text-uppercase">Semester</p>
                        <h5>{semester}</h5>

                        <button type="button" className="btn btn-sm text-uppercase mt-3 ps-2 check-btn" data-bs-toggle="modal"
                            data-bs-target={`#schedule-${semester}`}>
                            check
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                className="bi bi-box-arrow-right ms-1" viewBox="0 0 16 16">
                                <path fillRule="evenodd"
                                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                <path fillRule="evenodd"
                                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <a href="#"></a>
            </figure>
            <ModelBody semester={semester} />
        </div>
    )
}

export default function Calendar({ schedules }: any) {
    const mySchedules = React.createContext(null);
    //console.log(schedules);
    ContentInit(schedules);

    return (
        <section id="calendar" className="fading-in bg-light min-vh-100">
            <div className="container pt-5">
                <div className="row text-center pt-3 pb-5">
                    <h6 className="font-weight-bold text-uppercase">calendar</h6>
                    <h3 className="text-center">My calender</h3>
                </div>
                <div id="calendar-content" className="row d-flex align-items-center h-60">
                    <mySchedules.Provider value={schedules}>
                        {semesters.map((s, indx) => {
                            return (
                                <Model semester={s} imgTheme={bgImgThemes[indx]} key={`${indx}-model`} />
                            )
                        })}
                    </mySchedules.Provider>
                </div>
            </div>
        </section>
    )
}




