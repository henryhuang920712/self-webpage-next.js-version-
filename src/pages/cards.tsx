import React, { EventHandler } from 'react';

const varToString = (varObj: Object) => Object.keys(varObj)[0]
const mySkills = {
    Language: {
        Chinese: 90, English: 85, Japanese: 45, German: 20
    },
    Programming: {
        Python: 90, CPlusPlus: 40, HTMLandCSS: 45
    },
    Others: { Accounting: 65, Caculus: 60 }
}
const skillsRef = {
    Language: () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-translate"
                viewBox="0 0 16 16" key="L">
                <path
                    d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z" />
                <path
                    d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z" />
            </svg>
        )
    },
    Programming: () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                className="bi bi-pc-display-horizontal" viewBox="0 0 16 16" key="P">
                <path
                    d="M1.5 0A1.5 1.5 0 0 0 0 1.5v7A1.5 1.5 0 0 0 1.5 10H6v1H1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5v-1h4.5A1.5 1.5 0 0 0 16 8.5v-7A1.5 1.5 0 0 0 14.5 0h-13Zm0 1h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5ZM12 12.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Zm2 0a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0ZM1.5 12h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1ZM1 14.25a.25.25 0 0 1 .25-.25h5.5a.25.25 0 1 1 0 .5h-5.5a.25.25 0 0 1-.25-.25Z" />
            </svg>
        )
    },
    Others: () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-bookmarks"
                viewBox="0 0 16 16" key="O">
                <path
                    d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4zm2-1a1 1 0 0 0-1 1v10.566l3.723-2.482a.5.5 0 0 1 .554 0L11 14.566V4a1 1 0 0 0-1-1H4z" />
                <path
                    d="M4.268 1H12a1 1 0 0 1 1 1v11.768l.223.148A.5.5 0 0 0 14 13.5V2a2 2 0 0 0-2-2H6a2 2 0 0 0-1.732 1z" />
            </svg>
        )
    }
}

function Card() {
    const CardBack = (skill: string, score: number) => {
        return (
            <div className="row progress-wrap pb-2 ps-2" key={skill}>
                <p className="col-9 lead text-uppercase">
                    {skill}
                </p>
                <span className="col-3">{score}%</span>
                <div className="progress bg-white d-flex">
                    <div className="progress-bar" role="progressbar" style={{ width: `${score}%`}} aria-valuenow={score} aria-valuemin={0}
                        aria-valuemax={100}>
                    </div>
                </div>
            </div>)
    }
    const CardFront = (thisCat: keyof typeof mySkills) => {
        return (
            <div className="card-face card-front d-flex flex-column align-items-center" key={`${thisCat}-front`}>
                {skillsRef[thisCat]()}
                <div className="card-body">
                    <h5 className="card-title">{thisCat}</h5>
                </div>
            </div>)
    }

    const MyCard = (thisCat: keyof typeof mySkills): React.ReactNode => {
        // for (let cat in mySkills) {
        //     for (const skill in mySkills[cat as keyof typeof mySkills]) {
        //     }
        // }
        let cardBacks = [] as React.ReactNode[];
        const allSkills = Object.entries(mySkills[thisCat]);
        allSkills.forEach(([thisSkill, thisScore]) => {
            cardBacks.push(CardBack(thisSkill, thisScore))
        })

        const [isActive, setIsActive] = React.useState(false);

        const handleClick = () => {
            setIsActive(!isActive);
        };
        return (
            <div className={`card mb-3 ${isActive ? 'is-flipped' : ''}`} key={thisCat} onClick={handleClick}>
                {CardFront(thisCat)}
                <div className="card-face card-back bg-white pt-4 d-flex flex-column justify-content-start">
                    {cardBacks}
                </div>
            </div>
        )
    }

    const allCats = Object.keys(mySkills);
    return (
        <div className="row d-flex align-items-center justify-content-around" id="card-loc">
            {
                allCats.map((thisCat, Indx) => {
                    return (
                        MyCard(thisCat as keyof typeof mySkills)
                    )
                })
            }
        </div>
    )
}

export default Card
