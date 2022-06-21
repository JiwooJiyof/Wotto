import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import { FaRegArrowAltCircleRight } from "react-icons/fa";

// firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCB1omIp2ZyNOkbTE5S6LA27ZoTEuilJcw",
  authDomain: "wotto-d26be.firebaseapp.com",
  projectId: "wotto-d26be",
  storageBucket: "wotto-d26be.appspot.com",
  messagingSenderId: "195811865823",
  appId: "1:195811865823:web:c31992074ae457ef87a56a",
  measurementId: "G-R7CS15R5S3"
};
// firebase
// Import the functions you need from the SDKs you need
// import firebase from "firebase/compat/app";
// import db from "firebase";
// import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Initialize Firebase
// const db = firebase.firestore()

const propTypes = {
  ...SectionProps.types,
  split: PropTypes.bool
}

const defaultProps = {
  ...SectionProps.defaults,
  split: false
}

const Cta = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  split,
  ...props
}) => {

  const outerClasses = classNames(
    'cta section center-content-mobile reveal-from-bottom',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'cta-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider',
    split && 'cta-split'
  );

  const [email, setEmail] = useState("");

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);

  // add new email
  async function onSubscribe() {
    console.log(email)
    const data = {
      email: email
    };
    addDoc(collection(db, 'subscribers'), data)
    alert("your email has been added");
    setEmail("");
  };

  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      onSubscribe();
    }
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div
          className={innerClasses}
        >
          <div className="cta-slogan">
            <h3 className="m-0">
              Join the Waitlist
            </h3>
          </div>
          <div className="cta-action">
            <form onSubmit={e => {
              e.preventDefault();
              onSubscribe();
            }}>
              <label >Enter your E-mail:
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeypress}
                />
              </label>
            </form>
            <button onClick={onSubscribe}>
              <FaRegArrowAltCircleRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

Cta.propTypes = propTypes;
Cta.defaultProps = defaultProps;

export default Cta;