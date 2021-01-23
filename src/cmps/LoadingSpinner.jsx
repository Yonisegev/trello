import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";

export function LoadingSpinner(props) {
    // const { promiseInProgress } = usePromiseTracker();

    return (
        // promiseInProgress && (
            <div className="spinner flex justify-center align-center column" style={{width:"100vw",height:"100vh",position:"fixed"  }}>
               {/* <h1>Loading...</h1> */}
                <Loader type="ThreeDots" color="#6c63ff" height="100" width="100" />
            </div>
        // )
    );
};

