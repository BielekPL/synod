import React from "react";
import {OutlineBtn} from "../components/Buttons"

const logError = console.log;

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) { 
    logError(error, { info });
  }

  render() {
    const rst = ()=>{
        this.state.hasError = false;
        setTimeout(()=>window.location.reload(), 500);
    }
    if (this.state.hasError) {
        return <div id="error-prompt" className={"alert active" }>
            <span>Pojawił się nieoczekiwany problem, ale spokojnie. Nasi technicy zostali poinformowani.
                Przepraszamy za utrudnienia.
            </span>
            <OutlineBtn href="/" txt={"Przejdź do strony głównej"} onClick={rst}/>
        </div>
}
    return this.props.children
  }
}
